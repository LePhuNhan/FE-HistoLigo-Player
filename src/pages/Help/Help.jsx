import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Help.styles.css'
import {
    RightOutlined, DownOutlined,
    UpOutlined
} from '@ant-design/icons';

const Help = () => {
    const theme = localStorage.getItem('theme') === 'true';
    const [openStates, setOpenStates] = useState([false, false, false, false]);
    const [openStates1, setOpenStates1] = useState([false, false, false, false, false, false]);
    const [openStates2, setOpenStates2] = useState([false, false, false, false, false, false]);

    const toggleHelp = (index) => {
        setOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const toggleHelp1 = (index) => {
        setOpenStates1((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };
    const toggleHelp2 = (index) => {
        setOpenStates2((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    useEffect(() => {
        const darkThemeLink = document.getElementById('dark-theme-style');

        if (theme) {
            // Nếu theme là dark và file CSS chưa được thêm thì thêm vào
            if (!darkThemeLink) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/DarkMode.css';  // Đảm bảo đường dẫn đúng
                link.id = 'dark-theme-style';
                document.head.appendChild(link);
            }
        } else {
            // Nếu theme không phải là dark thì xóa file CSS dark mode
            if (darkThemeLink) {
                darkThemeLink.remove(); // Xóa hoàn toàn thẻ link
            }
        }
    }, [theme]);

    return (
        <div className='wrapHelp'>
            <Link to='/chooseClass'>
                <h1 className="title">HISTOLIGO</h1>
            </Link>


            <div className='breadCrumb'>
                <span>TRUNG TÂM TRỢ GIÚP</span>
                <RightOutlined />
                <span>TRANG CHỦ</span>
            </div>

            <div className='wrapBoxHelp'>
                <div className='boxHelp'>
                    <h1>
                        Câu hỏi thường gặp
                    </h1>
                    <div className='headTable'>
                        <p className='heading'>Sử dụng Histoligo</p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates[0] ? "titleItem active" : "titleItem"}>Tại sao khóa học của tôi thay đổi?</p>
                        {openStates[0] ? <UpOutlined onClick={() => toggleHelp(0)} /> : <DownOutlined onClick={() => toggleHelp(0)} />}
                        <p className={openStates[0] ? 'descItem' : 'descItem none'}>
                            Histoligo liên tục cập nhật nội dung để các khóa học tốt hơn và hiệu quả hơn. Mỗi khi chúng tôi cập nhận cải thiện, bạn có thể để ý thấy có những điều chỉnh với nội dung hiện có hoặc giới thiệu những tài liệu hoàn toàn mới. Khi điều này xảy ra, chúng tôi cũng sắp đặt vị trí của bạn trên lộ trình học của mình để phù hợp với nội dung và cấu trúc mới. Bạn cứ yên tâm nhé, điều này giúp bạn có những trải nghiệm học tập mới mẻ nhất và hiệu quả nhất có thể.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates[1] ? "titleItem active" : "titleItem"}>Streak là gì?</p>
                        {openStates[1] ? <UpOutlined onClick={() => toggleHelp(1)} /> : <DownOutlined onClick={() => toggleHelp(1)} />}
                        <p className={openStates[1] ? 'descItem' : 'descItem none'}>
                            Streak (biểu tượng ngọn lửa) thể hiện số ngày bạn học liên tục trên Histoligo.
                            Học ngôn ngữ là hành trình dài nhằm dần dần chinh phục các mục tiêu và streak là phương pháp hiệu quả giúp bạn giữ vững động lực học và luyện tập đều đặn mỗi ngày.
                            Mẹo: Nhắc nhở luyện tập sẽ giúp bạn không quên học bài. Trong mục cài đặt thông báo bạn có thể chọn bật nhắc nhở luyện tập và chọn thời gian phù hợp nhất với bản thân.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates[2] ? "titleItem active" : "titleItem"}>Bảng xếp hạng và Giải đấu là gì?</p>
                        {openStates[2] ? <UpOutlined onClick={() => toggleHelp(2)} /> : <DownOutlined onClick={() => toggleHelp(2)} />}
                        <p className={openStates[2] ? 'descItem' : 'descItem none'}>
                            Bảng xếp hạng là nơi bạn có thể vui vẻ thi đua thành tích hằng tuần cùng những người học Histoligo khác. Bạn càng kiếm được nhiều điểm KN (điểm kinh nghiệm) qua mỗi bài học, bạn càng có vị trí cao trên bảng xếp hạng. Mỗi tuần, bạn sẽ gặp những đối thủ khác nhau. Hãy ghé mục Bảng xếp hạng trên ứng dụng để tham gia thi đua nhé!
                        </p>
                    </div>

                    <div className="endTable">
                        <p className={openStates[3] ? "titleItem active" : "titleItem"}>Histoligo có sử dụng thư viện mở nào không?</p>
                        {openStates[3] ? <UpOutlined onClick={() => toggleHelp(3)} /> : <DownOutlined onClick={() => toggleHelp(3)} />}
                        <p className={openStates[3] ? 'descItem' : 'descItem none'}>
                            Có. Bạn có thể xem các mã nguồn mở mà chúng tôi được quyền sử dụng và tìm hiểu thêm tại trang này.
                        </p>
                    </div>
                </div>


            </div>

            <div className='wrapBoxHelp'>
                <div className='boxHelp'>
                    <div className='headTable'>
                        <p>Quản lý tài khoản</p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[0] ? "titleItem active" : "titleItem"}>Làm cách nào để đổi tên người dùng hoặc địa chỉ email?</p>
                        {openStates1[0] ? <UpOutlined onClick={() => toggleHelp1(0)} /> : <DownOutlined onClick={() => toggleHelp1(0)} />}
                        <p className={openStates1[0] ? 'descItem' : 'descItem none'}>
                            Nếu bạn muốn thay đổi tên người dùng hoặc địa chỉ email của tài khoản Histoligo, hãy tới phần cài đặt và sửa tên người dùng hoặc địa chỉ email. Tên người dùng của bạn sẽ hiển thị trên bảng xếp hạng hằng tuần. Nhớ ấn "Lưu thay đổi" sau khi chỉnh sửa nhé.
                            Bạn sẽ không thể chỉnh sửa nếu đã có tài khoản Histoligo khác sử dụng tên người dùng mà bạn muốn chọn. Tất cả tên người dùng và địa chỉ email đều độc nhất và không trùng lặp giữa các tài khoản. Hãy thử thay đổi bằng cách thêm một chữ cái đặc biệt hoặc số và lưu lại. Nếu địa chỉ email bạn muốn sử dụng đã liên kết với tài khoản khác, có thể trước đây bạn đã sử dụng email đó để đăng ký một tài khoản khác.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[1] ? "titleItem active" : "titleItem"}>Làm cách nào để tìm kiếm, theo dõi và chặn người dùng khác trên Histoligo?</p>
                        {openStates1[1] ? <UpOutlined onClick={() => toggleHelp1(1)} /> : <DownOutlined onClick={() => toggleHelp1(1)} />}
                        <p className={openStates1[1] ? 'descItem' : 'descItem none'}>
                            Bạn có thể kết nối với những người học khác trên Histoligo!
                            Khi bạn theo dõi ai đó, họ sẽ xuất hiện trong danh sách bạn bè của bạn và các bạn có thể cổ vũ lẫn nhau trên hành trình chinh phục ngoại ngữ!
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[2] ? "titleItem active" : "titleItem"}>Làm cách nào để gỡ hoặc đặt lại một khóa học?</p>
                        {openStates1[2] ? <UpOutlined onClick={() => toggleHelp1(2)} /> : <DownOutlined onClick={() => toggleHelp1(2)} />}
                        <p className={openStates1[2] ? 'descItem' : 'descItem none'}>
                            Xóa một khóa học đồng nghĩa xóa toàn bộ dữ liệu học tập và điểm KN của bạn trong khóa học đó, hành động này không thể hoàn tác. Bạn vẫn luôn có thể học lại khóa học đó, nhưng bạn sẽ phải bắt đầu lại từ đầu và làm bài kiểm tra trình độ. Xóa khóa học sẽ không ảnh hưởng tới streak và thứ hạng trên bảng xếp hạng của bạn.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[3] ? "titleItem active" : "titleItem"}>Làm cách nào để xóa tài khoản và kiểm tra dữ liệu của tôi?</p>
                        {openStates1[3] ? <UpOutlined onClick={() => toggleHelp1(3)} /> : <DownOutlined onClick={() => toggleHelp1(3)} />}
                        <p className={openStates1[3] ? 'descItem' : 'descItem none'}>
                            Truy cập trang "Quản lý dữ liệu Histoligo" để yêu cầu bản sao tất cả các dữ liệu cá nhân Histoligo đang lưu trữ của bạn. Có thể cần tới 30 ngày để xử lý yêu cầu.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[4] ? "titleItem active" : "titleItem"}>Những việc cần làm khi bị rò rỉ dữ liệu</p>
                        {openStates1[4] ? <UpOutlined onClick={() => toggleHelp1(4)} /> : <DownOutlined onClick={() => toggleHelp1(4)} />}
                        <p className={openStates1[4] ? 'descItem' : 'descItem none'}>
                            Bạn có thể đã nhận được một email cảnh bảo về việc rò rỉ dữ liệu bên ngoài Histoligo bao gồm cả thông tin cá nhân của bạn. Email này là thật và chúng tôi nghiêm túc khuyên bạn nên thực hiện các hành động để bảo vệ dữ liệu của bản thân.
                        </p>
                    </div>

                    <div className="endTable">
                        <p className={openStates1[5] ? "titleItem active" : "titleItem"}>Tôi gặp vấn đề khi truy cập tài khoản.</p>
                        {openStates1[5] ? <UpOutlined onClick={() => toggleHelp1(5)} /> : <DownOutlined onClick={() => toggleHelp1(5)} />}
                        <p className={openStates1[5] ? 'descItem' : 'descItem none'}>
                            Nếu bạn quên mật khẩu và cần đặt mật khẩu mới, hãy nhấn vào "Quên mật khẩu" ở màn hình đăng nhập ứng dụng, hoặc truy cập http://Histoligo.com/forgot_password và nhập địa chỉ email liên kết với tài khoản Histoligo của bạn.
                            Nếu ban đầu bạn đăng ký qua Google hoặc Facebook, bạn sẽ cần phải cung cấp email gắn với tài khoản Google hoặc Facebook đó của bạn.
                            Chúng tôi sẽ gửi một đường dẫn tới địa chỉ email đó, bạn có thể sử dụng đường dẫn này để tạo một mật khẩu mới. Hãy nhớ kiểm tra cả hòm thư rác nếu bạn không thấy email đặt lại mật khẩu trong hòm thư đến!
                            Nếu bạn đăng ký bằng một địa chỉ email không chính xác bạn sẽ không thể thay đổi mật khẩu
                        </p>
                    </div>
                </div>


            </div>

            <div className='wrapBoxHelp'>
                <div className='boxHelp'>
                    <div className='headTable'>
                        <p>Gói đăng ký & Thanh toán</p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[0] ? "titleItem active" : "titleItem"}>Super Histoligo là gì và làm cách nào để đăng ký?</p>
                        {openStates2[0] ? <UpOutlined onClick={() => toggleHelp2(0)} /> : <DownOutlined onClick={() => toggleHelp2(0)} />}
                        <p className={openStates2[0] ? 'descItem' : 'descItem none'}>
                            Super Histoligo" là trải nghiệm Histoligo cao cấp hơn. Khi sử dụng Super Histoligo, bạn sẽ nhận được những quyền lợi sau:
                            <ul style={{ listStyle: 'num', marginTop: '12px' }}>
                                <li><span className='active'>Không quảng cáo:</span> Học không gián đoạn</li>
                                <li> <span className='active'>Trái tim vô hạn: </span> Bật Trái tim vô hạn và chẳng còn lo phải tạm dừng vì lỗi sai</li>
                                <li><span className='active'>Cá nhân hóa luyện tập.</span> Bạn mắc lỗi sai? Không sao hết, bạn sẽ thoải mái ôn luyện các lỗi sai của riêng mình với các bài học cá nhân hóa.</li>
                                <li> <span className='active'>Thoải mái chinh phục thử thách Huyền thoại.</span> Vươn tới cấp độ cao nhất - Huyền thoại của mỗi cửa!</li>
                            </ul>
                            Đồng thời, khi đăng ký Super Histoligo, bạn đang góp phần hỗ trợ sứ mệnh của chúng tôi, giúp hàng triệu người trên khắp thế giới tiếp cận giáo dục miễn phí. Chúng tôi đem tới những nội dung học giống nhau cho cả người học miễn phí và có trả phí, bởi sứ mệnh của chúng tôi chính là phát triển nền tảng giảng dạy ngôn ngữ tốt nhất cho cả thế giới.
                            <br />Khi bạn đăng ký và hủy đăng ký, dữ liệu học tập và streak của bạn sẽ không thay đổi.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[1] ? "titleItem active" : "titleItem"}>Gói Gia Đình</p>
                        {openStates2[1] ? <UpOutlined onClick={() => toggleHelp2(1)} /> : <DownOutlined onClick={() => toggleHelp2(1)} />}
                        <p className={openStates2[1] ? 'descItem' : 'descItem none'}>
                            Bạn sẽ học ngoại ngữ hiệu quả hơn khi có đồng đội đấy - và đó chính là lý do ra đời Gói gia đình của Super Histoligo! Giờ đây bạn có thể chia sẻ tất cả các quyền lợi của gói Super Histoligo với 5 người thân hoặc bạn bè để cổ vũ lẫn nhau trên hành trình chinh phục ngôn ngữ.
                            Dù bạn được mời tham gia, đăng ký hoặc rời bỏ Gói gia đình, dữ liệu học tập và streak của bạn cũng sẽ không bị ảnh hưởng.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[2] ? "titleItem active" : "titleItem"}>Làm cách nào để hủy gói đăng ký Super Histoligo?</p>
                        {openStates2[2] ? <UpOutlined onClick={() => toggleHelp2(2)} /> : <DownOutlined onClick={() => toggleHelp2(2)} />}
                        <p className={openStates2[2] ? 'descItem' : 'descItem none'}>
                            Bạn có thể hủy gói đăng ký Super Histoligo bất kỳ lúc nào.
                            Cách thức hủy sẽ tùy thuộc theo cách bạn đăng ký ban đầu.
                            Xóa ứng dụng và/hoặc xóa tài khoản sẽ không ảnh hưởng tới gói đăng ký.
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[3] ? "titleItem active" : "titleItem"}>Làm cách nào để yêu cầu hoàn tiền?</p>
                        {openStates2[3] ? <UpOutlined onClick={() => toggleHelp2(3)} /> : <DownOutlined onClick={() => toggleHelp2(3)} />}
                        <p className={openStates2[3] ? 'descItem' : 'descItem none'}>
                            Nói chung, tất cả các hoạt động thu phí do mua hàng trong ứng dụng sẽ không được hoàn trả và sẽ không có hoàn tiền hoặc khấu trừ khi sử dụng một phần gói đăng ký. Việc xử lý yêu cầu hoàn tiền có thành công hay không sẽ tùy theo quyết định của bên xử lý dịch vụ (Google Play hoặc Apple).

                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[4] ? "titleItem active" : "titleItem"}>Làm cách nào để sử dụng mã khuyến mại?</p>
                        {openStates2[4] ? <UpOutlined onClick={() => toggleHelp2(4)} /> : <DownOutlined onClick={() => toggleHelp2(4)} />}
                        <p className={openStates2[4] ? 'descItem' : 'descItem none'}>
                            <ul style={{ listStyle: 'num' }}>
                                <li> Hãy truy cập trang Histoligo.com/redeem từ trình duyệt web (trên di động, máy tính bảng hoặc máy tính)</li>
                                <li>Nhập mã khuyến mại và ấn "Sử dụng mã"</li>
                                <li>Sau khi bạn được xác nhận là tài khoản người dùng hợp lệ, hãy chọn "Nhận ưu đãi"</li>
                                <li>Đăng nhập nếu bạn đã có tài khoản Histoligo hoặc đăng ký nếu bạn chưa tạo tài khoản</li>
                                <li> Chọn gói đăng ký Super Histoligo hằng tháng, hằng năm hoặc gia đình sau khi hết hạn dùng thử miễn phí</li>
                                <li>Nhập thông tin thẻ tín dụng của bạn (chỉ tính phí nếu bạn tiếp tục sử dụng Super sau khi hết hạn dùng thử)</li>
                                <li>Bắt đầu học cùng Super Histoligo!</li>
                            </ul>
                        </p>
                    </div>

                    <div className="endTable">
                        <p className={openStates2[5] ? "titleItem active" : "titleItem"}>Histoligo Max là gì?</p>
                        {openStates2[5] ? <UpOutlined onClick={() => toggleHelp2(5)} /> : <DownOutlined onClick={() => toggleHelp2(5)} />}
                        <p className={openStates2[5] ? 'descItem' : 'descItem none'}>
                            Histoligo Max là gói đăng ký mới cung cấp trải nghiệm học tập chuyên sâu hơn. Histoligo Max sẽ có tất cả những tính năng của Super Histoligo, và thêm hai tính năng hoàn toàn mới sử dụng trí tuệ nhân tạo (AI): Giải thích đáp án và Nhập vai. Tìm hiểu thêm về những tính năng mới tại đây!
                        </p>
                    </div>
                </div>


            </div>

            <div className='ticketQuestion'>
                <span>Bạn có thắc mắc khác?
                </span>
                <br />
                <button>GỬI PHẢN HỒI</button>
            </div>

        </div>
    )
};

export default Help;