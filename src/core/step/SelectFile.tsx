import { Button, Typography } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React from "react";
import Style from './SelectFile.module.scss';

export default function SelectFile({ isLoading, handle }: { isLoading?: boolean, handle?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <>
            {/* <Typography variant="body2">
                Nhấn vào nút dưới đây để chọn tệp
            </Typography>
            <Button
                sx={{ mt: 1, mb: 1 }}
                startIcon={<AttachFileIcon />}
                variant="contained"
                onClick={handle}
                disabled={isLoading}
            >Chọn tệp</Button>
             */}
            <div className={Style.SelectFileArea}>
                <input className={Style.SelectFileInput} onChange={handle} type="file" accept=".docx,.pptx" />
                <div className={Style.TopArea}>
                    <Typography variant="body2">
                        Nhấn vào đây để chọn tệp hoặc kéo thả tệp vào vùng có màu xám này
                    </Typography>
                    <br />
                    <Typography textAlign={'center'} variant="body2" color="GrayText" fontSize={13}>
                        Chỉ chấp nhận file <b>.docx</b> hoặc file <b>.pptx</b>
                        <br />
                        Tệp càng lớn xử lý càng lâu hơn!
                    </Typography>
                </div>
            </div>
        </>
    )
}