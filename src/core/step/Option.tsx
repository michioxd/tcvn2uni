import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import JSZip from 'jszip';
import { useSnackbar } from "notistack";


const charSupported: string[] = ['tcvn3', 'vni'];

export default function Option({ file, handleBack }: { file: File, handleBack?: () => void }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const filename = file.name;
    const extension = filename.split('.').pop()?.toLowerCase();

    const [slide, setSlide] = React.useState<number[]>([1, 1]);
    const [minMaxSlide, setMinMaxSlide] = useState<number[]>([1, 1]);
    const [loadingFile, setLoadingFile] = useState<boolean>(false);
    const [selectAllSlide, setSelectAllSlide] = useState<boolean>(true);
    const [selectedChar, setSelectedChar] = React.useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        const value = parseInt(event.target.value);
        setSelectedChar(value);
    };

    const handleChangeSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectAllSlide(event.target.checked);
    };

    const handleChangeSlide = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setSlide([Math.min(newValue[0], slide[1] - 1), slide[1]]);
        } else {
            setSlide([slide[0], Math.max(newValue[1], slide[0] + 1)]);
        }
    };

    const handleError = (error: string) => {
        handleBack!();
        enqueueSnackbar(error, {
            autoHideDuration: 5000
        });
    }

    useEffect(() => {
        setLoadingFile(true);
        const mainFile = JSZip.loadAsync(file).then(f => {
            if (!f) {
                handleError("Không thể đọc dữ liệu, vui lòng thử lại sau!");
            } else {
                if (extension === 'pptx') {
                    const slideFile = f.folder("ppt/slides")?.file(/^slide/);
                    setLoadingFile(false);
                    if (typeof slideFile !== 'undefined') {
                        console.log(slideFile);
                        setMinMaxSlide([1, slideFile.length]);
                        setSlide([1, slideFile.length]);
                        console.log(minMaxSlide);
                    } else {
                        handleError("Không thể đọc dữ liệu, vui lòng thử lại sau!");
                    }
                } else {
                    const documentFile = f.file('word/document.xml');
                    setLoadingFile(false);
                    console.log(documentFile);
                }

            }
        });

    }, [file]);

    return (
        <>
            {loadingFile ? (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress sx={{ mr: 2 }} />
                    <Typography variant="body2">Đang đọc dữ liệu tệp, vui lòng chờ</Typography>
                </Box>
            ) : (
                <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="select-char-label">Chọn bảng mã của dữ liệu vào</InputLabel>
                        <Select
                            labelId="select-char-label"
                            id="select-char"
                            value={String(selectedChar)}
                            label="Chọn bảng mã của dữ liệu vào"
                            onChange={handleChange}
                        >
                            {charSupported.map((d, i) => (
                                <MenuItem value={i} key={i}>{d.toUpperCase()}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Nếu bảng mã hiện tại không khớp, vui lòng chuyển qua bảng mã khác!</FormHelperText>
                    </FormControl>
                    {extension === "pptx" && (
                        <>
                            <Typography variant="body1">
                                Vui lòng lựa chọn slide
                            </Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} defaultChecked onChange={handleChangeSelectAll} />} label="Chọn tất cả slide" />
                            </FormGroup>
                            <Box sx={{ width: '100%' }}>
                                <Slider
                                    getAriaLabel={() => 'Chọn slide'}
                                    valueLabelDisplay="auto"
                                    value={slide}
                                    min={minMaxSlide[0]}
                                    max={minMaxSlide[1]}
                                    onChange={handleChangeSlide}
                                    disableSwap
                                    disabled={selectAllSlide}
                                />
                            </Box>
                            <Typography variant="body2" color='GrayText'>
                                {selectAllSlide ? 'Đã chọn tất cả slide' : `Từ slide ${slide[0]} đến slide ${slide[1]}`}
                            </Typography>
                        </>
                    )}
                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleBack} sx={{ mr: 1 }}>Quay trở lại</Button>
                        <Button variant="contained">Tiếp theo</Button>
                    </Box>
                </>
            )}

        </>
    )
}