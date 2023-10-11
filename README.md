# tcvn2uni

Công cụ trực tuyến miễn phí và mã nguồn mở giúp chuyển đổi ký tự từ bảng mã TCVN3 (tiêu chuẩn cũ) trong file Microsoft Word (.docx), Microsoft PowerPoint (.pptx), Microsoft Excel (.xlsx) sang bảng mã Unicode

## Tại sao?

Trong các file Word hoặc PowerPoint cũ từ những năm 200x, người ta sẽ chỉ sử dụng chủ yếu là bảng mã TCVN3 vì lúc đấy Unicode chưa hỗ trợ đầy đủ chữ Quốc ngữ, sau dần, Unicode đã hỗ trợ đầy đủ chữ Quốc ngữ (Tiếng Việt), nên TCVN3 đã trở nên lỗi thời. Cùng với đó, các phông chữ hiện đại (ví dụ: Times New Roman,...) sẽ không hiện thị được các ký tự của bảng mã TCVN3. Công cũ này tạo ra để chuyển đổi các nội dung sử dụng bảng mã TCVN3 sang Unicode trong các file Word, PowerPoint hoặc Excel.

Ví dụ: `Xin chµo tÊt c¶ mäi ng­êi` => `Xin chào tất cả mọi người`

## Lưu ý

Vì đây là công cụ được xử lý 100% bằng trình duyệt không thông qua máy chủ, nên các định dạng file Word, PowerPoint và Excel cũ như .doc, .ppt, .xls đều cần được chuyển đổi qua định dạng .docx cho file Word, .pptx cho file PowerPoint, .xlsx cho file Excel.

## Cách sử dụng

- Bước 1: Lựa chọn tệp (.docx hoặc .pptx hoặc .xlsx)
- Bước 2: Chọn bảng mã để chuyển qua Unicode
- Bước 3: Chờ và lưu tệp

## Hướng dẫn chạy trong môi trường developer

```bash
# clone repo
git clone https://github.com/michioxd/tcvn2uni

# cài đặt các deps
pnpm install
# tương tự với các trình quản lý gói khác, khuyên dùng pnpm
# npm
npm install
# yarn
yarn add

# chạy
pnpm run dev
```

## Dependency

- [vietnamese-conversion](https://github.com/duydev/vietnamese-conversion)
- [jszip](https://github.com/Stuk/jszip)

## Giấy phép

MIT License ([Nhấn để xem giấy phép](./LICENSE))

&copy; 2023 nekochoko (a.k.a michioxd)
