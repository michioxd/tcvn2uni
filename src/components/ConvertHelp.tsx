import { Button, Typography } from "@mui/material";

import imageStep1 from './../assets/help/s1.png';
import imageStep2 from './../assets/help/s2.png';
import imageStep3 from './../assets/help/s3.png';
import imageStep4 from './../assets/help/s4.png';
import imageStep5 from './../assets/help/s5.png';
import imageStep6 from './../assets/help/s6.png';
import { Link } from "react-router-dom";

export default function ConvertHelp() {
    return (
        <>
            <Typography variant="h5">
                Hướng dẫn cách chuyển từ định dạng .doc hoặc .ppt sang .docx hoặc .pptx
            </Typography>
            <Button sx={{ mt: 3, mb: 3 }} component={Link} to="/" variant="outlined">Quay về trang chủ</Button>
            <Typography variant="body1">
                Bước 1: Khởi động tệp .ppt của bạn lên
                <br />
                Bước 2: Nhấn vào nút File (Tệp)
                <br />
                <img srcSet={imageStep1} />
                <br />
                Bước 3: Nhấn vào nút Save as (Lưu như) (dòng thứ 6)
                <br />
                <img srcSet={imageStep2} />
                <br />
                Bước 4: Nhấn vào nút Browse (Duyệt tìm) (dòng thứ 3 ở phần Other locations)
                <br />
                <img srcSet={imageStep3} />
                <br />
                Bước 5: Nhấn vào nút bên cạnh chữ Save as type (Lưu như loại) (dòng thứ 2)
                <br />
                <img srcSet={imageStep4} />
                <br />
                Bước 6: Chọn "Powerpoint Presentation (.pptx)" (thường ở đầu tiên)
                <br />
                <img srcSet={imageStep5} />
                <br />
                Bước 7: Nhấn "Save" (Lưu)
                <br />
                <img srcSet={imageStep6} />
                <br />
                Bước 8: Sau khi xong rồi, bạn hãy về trang chủ, sau đó chọn vào tệp bạn vừa lưu
                <br />
                <Button component={Link} to="/" variant="outlined">Quay về trang chủ</Button>
            </Typography>
        </>
    )
}