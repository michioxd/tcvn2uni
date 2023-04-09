import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { VietnameseConversion } from 'vietnamese-conversion';
import { Link } from "react-router-dom";

const charSupported: string[] = ['tcvn3', 'vni'];

export default function ConvertText() {
    const [inputText, setInputText] = useState<string>('');
    const [selectedChar, setSelectedChar] = React.useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        const value = parseInt(event.target.value);
        setSelectedChar(value);
    };

    const outputText = (new VietnameseConversion(inputText, charSupported[selectedChar])).toCharset('unicode');

    const handleGetFile = async () => {
        // Create temporary input
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";
        input.style.display = "none";
        document.body.appendChild(input);
        input.click();

        const file = await new Promise<File | null>((resolve) => {
            input.oninput = () => {
                if (input.files && input.files.length > 0) {
                    resolve(input.files[0]);
                } else {
                    resolve(null);
                }
            };
        });

        document.body.removeChild(input);

        if (!file) {
            return;
        }

        const data = await new Promise<string | null>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                resolve(null);
            };
            reader.readAsText(file);
        });

        if (data) {
            setInputText(data);
        }
    }

    const handleSaveFile = useCallback(() => {
        const blob = new Blob([outputText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "tcvn2uni-" + Date.now() + ".txt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
    }, [outputText]);

    return (
        <>
            <Typography variant="h5">
                Chuyển đổi văn bản
            </Typography>
            <Typography variant="body2">
                Chuyển đổi văn bản có chứa bảng mã {charSupported[selectedChar].toUpperCase()} qua Unicode
            </Typography>
            <Box sx={{ mt: 2, width: '100%' }}>
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
                </FormControl>
                <TextField
                    id="input"
                    label="Dữ liệu nhập vào"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    multiline
                    fullWidth
                    maxRows={7}
                    variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1, mb: 1 }}>
                    <Button variant="outlined" onClick={handleGetFile}>
                        Nhập vào từ tệp văn bản (.TXT)
                    </Button>
                </Box>
                <Typography variant="body2" color="GrayText" fontSize={12}>
                    Kết quả
                </Typography>
                <TextField
                    id="output"
                    multiline
                    value={outputText}
                    fullWidth
                    disabled
                    maxRows={7}
                    variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1, mb: 1 }}>
                    <Button component={Link} to="/" variant="outlined" sx={{ mr: 1 }}>
                        Trở về trang chủ
                    </Button>
                    <Button onClick={handleSaveFile} variant="contained" disabled={outputText.length < 1}>
                        Lưu lại thành tệp
                    </Button>
                </Box>
            </Box>
        </>
    )
}