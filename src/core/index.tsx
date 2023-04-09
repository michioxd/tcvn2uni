import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import SelectFile from "./step/SelectFile";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Option from "./step/Option";


export default function MainProgram() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [waitingForSelectFile, setWaitingForSelectFile] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaitingForSelectFile(true);

        const input = e.target;

        if (input.files && input.files.length > 0) {
            const selectedFileInInput = input.files[0];

            const filename = selectedFileInInput.name;
            const extension = filename.split('.').pop()?.toLowerCase();

            if (extension !== 'pptx' && extension !== 'docx') {
                enqueueSnackbar('Tệp không đúng định dạng. Chỉ hỗ trợ định dạng .docx hoặc .pptx!', {
                    variant: 'error',
                    autoHideDuration: 5000
                });
            } else {
                setSelectedFile(selectedFileInInput);
                setCurrentStep(1);
            }
            setWaitingForSelectFile(false);
        } else {
            setSelectedFile(null);
            enqueueSnackbar('Tệp chưa được chọn!', {
                variant: 'error',
                autoHideDuration: 5000
            });
            setWaitingForSelectFile(false);
        }
    };

    return (
        <>
            <Stepper activeStep={currentStep}>
                <Step>
                    <StepLabel>Lựa chọn tệp</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Cấu hình tuỳ chọn</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Đang xử lý</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Hoàn tất</StepLabel>
                </Step>
            </Stepper>
            <Box sx={{ display: 'flex', mt: 2, mb: 2, flexDirection: 'column' }}>
                {
                    selectedFile !== null ? <Option file={selectedFile} setStep={st => setCurrentStep(st)} handleBack={() => { setSelectedFile(null); setCurrentStep(0) }} /> : <SelectFile isLoading={waitingForSelectFile} handle={handleSelectFile} />
                }
            </Box>
        </>
    )
}