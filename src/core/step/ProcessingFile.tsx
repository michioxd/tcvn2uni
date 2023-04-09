import { Box, Button, CircularProgress, LinearProgress, Typography } from "@mui/material";
import JSZip from "jszip";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { VietnameseConversion } from "vietnamese-conversion";

const charSupported: string[] = ['tcvn3', 'vni'];



export default function ProcessingFile({ selectedChar, setStep, file, ext, filename, selectedSlide, selectAll, handleBack }: { selectedChar: number, setStep: (st: number) => void, selectAll: boolean, selectedSlide: number[], file: File, ext?: string, filename: string, handleBack?: () => void }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [firstProcessed, setFirstProcessed] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);

    const handleError = (error: string) => {
        handleBack!();
        enqueueSnackbar(error, {
            autoHideDuration: 5000
        });
    }
    useEffect(() => {

        async function processSlideList(slideList: JSZip.JSZipObject[], d: JSZip, selectAll: boolean, selectedSlide: number[]) {
            let i = (selectAll ? 0 : selectedSlide[0] - 1);
            const endIndex = (selectAll ? slideList.length : selectedSlide[1]);
            for await (const currentSlide of slideList) {
                if (i >= endIndex) {
                    break;
                }
                const currentSlideName = currentSlide?.name;
                if (currentSlideName !== null && typeof currentSlideName !== 'undefined') {
                    const output = await d.file(currentSlideName)?.async("uint8array");
                    if (output) {
                        const convertedText = (new VietnameseConversion(
                            (new TextDecoder().decode(output)),
                            charSupported[selectedChar]))
                            .toCharset('unicode');
                        d.file(currentSlideName, convertedText);
                    }
                }
                i++;
                setProgress(i / selectedSlide[1] * 100);
                setStep!(3);
                setCompleted(true);
            }
        }

        const MainProcess = async () => {
            const d = await JSZip.loadAsync(file);
            if (ext === 'pptx') {
                const slideFolder = d.folder('ppt/slides');
                if (slideFolder !== null && typeof slideFolder !== 'undefined') {
                    const slideList: JSZip.JSZipObject[] | null | undefined = slideFolder.file(/^slide/);
                    if (typeof slideList !== 'undefined') {
                        processSlideList(slideList, d, selectAll, selectedSlide).then(async () => {
                            const outputDocFile = await d.generateAsync({ type: 'blob' });

                            saveAs(outputDocFile, 'converted-' + filename);
                        });
                    }
                } else {
                    handleError("Không thể đọc dữ liệu, vui lòng thử lại sau!");
                }

            } else {
                const wordFile = await d.file('word/document.xml')?.async("uint8array");
                const convertedText = (new VietnameseConversion(
                    (new TextDecoder().decode(wordFile)),
                    charSupported[selectedChar]))
                    .toCharset('unicode');

                d.file('word/document.xml', convertedText);
                const outputDocFile = await d.generateAsync({ type: 'blob' });

                saveAs(outputDocFile, 'converted-' + filename);
                setStep(3);
                setCompleted(true);
            }


        }
        console.log(firstProcessed);
        if (firstProcessed) {
            return
        } else {
            setFirstProcessed(true);
            MainProcess();
        }

    }, [firstProcessed]);
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {
                    completed ? (
                        <>
                            <Typography variant="body1">Hoàn tất quá trình chuyển đổi!</Typography>
                            <Button variant="contained" onClick={() => { handleBack!(); setStep(0) }} sx={{ mt: 2 }}>Chuyển đổi file khác</Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="body1">Đang xử lý, vui lòng chờ</Typography>
                            <LinearProgress sx={{ mt: 2, width: '100%' }} variant="determinate" value={progress} />
                        </>
                    )
                }
            </Box>
        </>
    )
}