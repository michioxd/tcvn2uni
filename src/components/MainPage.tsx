import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import MainProgram from "../core";
import { Link as LinkRoute } from 'react-router-dom'

export default function MainPage() {
    return (
        <>
            <Typography variant="h4" component="div">
                tcvn2uni (TCVN3 to Unicode)
            </Typography>
            <Typography variant="body1">
                Công cụ trực tuyến miễn phí và <Link href="https://github.com/michioxd/tcvn2uni" target="_blank">mã nguồn mở</Link> giúp <b>chuyển đổi ký tự từ bảng mã TCVN3 (tiêu chuẩn cũ)</b> trong file <b>Microsoft Word (.docx)</b> và <b>Microsoft PowerPoint (.pptx)</b> sang <b>bảng mã Unicode</b>
            </Typography>
            <Typography sx={{ mt: 1 }} variant="h5" component="div">
                Tại sao?
            </Typography>
            <Typography variant="body2">
                Trong các file Word hoặc PowerPoint cũ từ những năm 200x, người ta sẽ chỉ sử dụng chủ yếu là bảng mã TCVN3 vì lúc đấy Unicode chưa hỗ trợ đầy đủ chữ Quốc ngữ, sau dần, Unicode đã hỗ trợ đầy đủ chữ Quốc ngữ (Tiếng Việt), nên TCVN3 đã trở nên lỗi thời. Cùng với đó, các phông chữ hiện đại (Times New Roman) sẽ không hiện thị được các ký tự của bảng mã TCVN3. Công cũ này tạo ra để chuyển đổi các nội dung sử dụng bảng mã TCVN3 sang Unicode trong các file Word hoặc PowerPoint.
                <br />
                Ví dụ: <b><code>Xin chµo tÊt c¶ mäi ng­êi</code></b> =&gt; <b><code>Xin chào tất cả mọi người</code></b>
            </Typography>
            <Typography sx={{ mt: 1 }} variant="h5" component="div">
                Lưu ý!
            </Typography>
            <Typography variant="body2">Vì đây là công cụ được xử lý 100% bằng trình duyệt không thông qua máy chủ, nên các định dạng file Word và PowerPoint cũ như <b>.doc</b> và <b>.ppt</b> đều cần được chuyển đổi qua định dạng <b>.docx cho file Word</b> và <b>.pptx cho file PowerPoint</b>. <Link component={LinkRoute} to="/help">Nhấn vào đây để xem hướng dẫn cách chuyển đổi</Link></Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
                <MainProgram />
            </Box>
        </>
    )
}