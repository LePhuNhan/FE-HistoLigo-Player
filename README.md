# Histolingo

Web dạy học lịch sử

## Các bước chạy Project

Làm theo thứ tự sau:

### `npm i`

Tải node_modules thư viện cần thiết

### `npm start`

Chạy web trên localhost:3000

## Link deploy:
https://histolingo-player-fndpfeekbzf6fdbc.eastasia-01.azurewebsites.net/
Mối khi code nhánh main thay đổi sẽ tự động deploy lại code mới.

## Các cú pháp tùy chọn

### `npm test`

Test code xem có lỗi nào không?
Sau khi chạy cú pháp chọn a để test tất cả file
Kết khi test ổn:
![image](https://github.com/user-attachments/assets/269271f9-c5b0-4092-8160-e74a98922120)


### `npm run build`

Xây dựng ứng dụng để sản xuất vào thư mục `build`.\
Nó đóng gói React đúng cách ở chế độ sản xuất và tối ưu hóa bản dựng để có hiệu suất tốt nhất.

Bản dựng được thu nhỏ và tên tệp bao gồm các hàm băm.\
Ứng dụng đã sẵn sàng để triển khai!

Xem phần về [triển khai](https://facebook.github.io/create-react-app/docs/deployment) để biết thêm thông tin.

### `npm run eject`

**Lưu ý: đây là thao tác một chiều. Sau khi bạn `eject`, bạn không thể quay lại!**

Nếu bạn không hài lòng với công cụ xây dựng và các lựa chọn cấu hình, bạn có thể `eject` bất kỳ lúc nào. Lệnh này sẽ xóa phụ thuộc xây dựng đơn lẻ khỏi dự án của bạn.

Thay vào đó, nó sẽ sao chép tất cả các tệp cấu hình và các phụ thuộc chuyển tiếp (webpack, Babel, ESLint, v.v.) ngay vào dự án của bạn để bạn có toàn quyền kiểm soát chúng. Tất cả các lệnh ngoại trừ `eject` vẫn sẽ hoạt động, nhưng chúng sẽ trỏ đến các tập lệnh đã sao chép để bạn có thể điều chỉnh chúng. Lúc này, bạn phải tự mình thực hiện.

Bạn không bao giờ phải sử dụng `eject`. Bộ tính năng được quản lý phù hợp với các triển khai nhỏ và vừa, và bạn không nên cảm thấy bắt buộc phải sử dụng tính năng này. Tuy nhiên, chúng tôi hiểu rằng công cụ này sẽ không hữu ích nếu bạn không thể tùy chỉnh khi bạn đã sẵn sàng.

### `npm run build-electron`

Trong Command Prompt chạy Run as administrator.
CD đến đường dẫn GitHub\FE-HistoLigo-Player trên máy bạn.
Cú pháp sẽ tạo thư mục dist và đóng gói sản phẩm.
Sau khi chạy xong, trong thư mục dist sẽ có file HistoLingo Setup 1.0.0, chạy file HistoLingo Setup 1.0.0 thì tại màn hình chính sẽ hiện app Histolingo.
Sử dụng tương tự như Web.
