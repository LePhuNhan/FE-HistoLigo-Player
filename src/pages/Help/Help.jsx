import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Help.styles.css';
import {
    RightOutlined, DownOutlined,
    UpOutlined
} from '@ant-design/icons';

// Định nghĩa đối tượng translations
const translations = {
    'en-US': {
        title: "HISTOLIGO",
        helpCenter: "HELP CENTER",
        home: "HOME",
        faq: "Frequently Asked Questions",
        usingHistoligo: "Using Histoligo",
        question1: "Why does my course change?",
        answer1: "Histoligo continuously updates content for better and more effective courses. You may notice adjustments to existing content or the introduction of entirely new materials.",
        question2: "What is a streak?",
        answer2: "A streak (represented by a flame icon) shows the number of consecutive days you have studied on Histoligo. It helps you stay motivated and practice regularly. Tip: Reminder notifications will help you not forget to study. In the notification settings, you can choose to enable study reminders and select the time that suits you best.",
        question3: "What are the rankings and tournaments?",
        answer3: "Rankings allow you to compete weekly with other Histoligo learners. The more experience points you earn, the higher your position on the leaderboard. Each week, you will meet different opponents. Be sure to check the Rankings section in the app to join the competition!",
        question4: "Does Histoligo use any open libraries?",
        answer4: "Yes. You can view the open-source codes that we are allowed to use and learn more on this page.",
        // Account Management
        accountManagement: "Account Management",
        question5: "How do I change my username or email address?",
        answer5: "If you want to change your username or email address for your Histoligo account, go to the settings section and edit your username or email address. Your username will be displayed on the weekly leaderboard. Remember to click 'Save Changes' after editing. You won't be able to edit if another Histoligo account is already using the username you want to choose. All usernames and email addresses are unique and cannot be duplicated across accounts. Try changing by adding a special character or number and save it. If the email address you want to use is linked to another account, you may have previously used that email to register another account.",
        question6: "How do I search, follow, and block other users on Histoligo?",
        answer6: "You can connect with other learners on Histoligo! When you follow someone, they will appear in your friends list, and you can encourage each other on your language learning journey!",
        question7: "How do I delete or reset a course?",
        answer7: "Deleting a course means deleting all your learning data and experience points in that course; this action cannot be undone. You can still retake that course, but you will have to start from the beginning and take the placement test. Deleting a course will not affect your streak and ranking on the leaderboard.",
        question8: "How do I delete my account and check my data?",
        answer8: "Visit the 'Manage Histoligo Data' page to request a copy of all the personal data Histoligo is storing about you. It may take up to 30 days to process the request.",
        question9: "What to do if my data is leaked?",
        answer9: "You may have received an email alerting you about a data leak outside of Histoligo, including your personal information. This email is real, and we seriously advise you to take actions to protect your data.",
        question10: "I'm having trouble accessing my account.",
        answer10: "If you forget your password and need to set a new one, click 'Forgot Password' on the app's login screen, or visit http://Histoligo.com/forgot_password and enter the email address linked to your Histoligo account. If you initially registered through Google or Facebook, you will need to provide the email associated with that Google or Facebook account. We will send a link to that email address, and you can use this link to create a new password. Be sure to check your spam folder if you don't see the password reset email in your inbox! If you registered with an incorrect email address, you will not be able to change your password.",
        // Subscription & Payment
        subscriptionPayment: "Subscription & Payment",
        question11: "What is Super Histoligo and how do I subscribe?",
        answer11: "Super Histoligo is a premium Histoligo experience. When using Super Histoligo, you will receive the following benefits: No ads: Learn without interruptions; Unlimited hearts: Activate unlimited hearts and no longer worry about pausing due to mistakes; Personalized practice: Made mistakes? No problem, you can comfortably review your mistakes with personalized lessons; Conquer legendary challenges comfortably: Reach the highest level - Legend of each door! By subscribing to Super Histoligo, you are also helping to support our mission to provide free education to millions of people around the world. We provide the same learning content for both free and paid learners because our mission is to develop the best language teaching platform for everyone. When you subscribe and unsubscribe, your learning data and streak will not change.",
        question12: "Family Plan",
        answer12: "You will learn a language more effectively with teammates - and that's the reason for the Family Plan of Super Histoligo! Now you can share all the benefits of the Super Histoligo plan with 5 family members or friends to encourage each other on the journey to conquer languages. Whether you are invited to join, subscribe, or leave the Family Plan, your learning data and streak will not be affected.",
        question13: "How do I cancel my Super Histoligo subscription?",
        answer13: "You can cancel your Super Histoligo subscription at any time. The cancellation method will depend on how you initially subscribed. Deleting the app and/or deleting your account will not affect your subscription.",
        question14: "How do I request a refund?",
        answer14: "In general, all fee activities from in-app purchases are non-refundable and there will be no refunds or deductions when using part of the subscription. Whether the refund request is successful will depend on the decision of the service provider (Google Play or Apple).",
        question15: "How do I use a promo code?",
        answer15: "Visit Histoligo.com/redeem from a web browser (on mobile, tablet, or computer). Enter the promo code and click 'Use Code'. After you are confirmed as a valid user account, select 'Claim Offer'. Log in if you already have a Histoligo account or register if you haven't created an account. Choose the monthly, annual, or family Super Histoligo subscription after the free trial ends. Enter your credit card information (only charged if you continue using Super after the free trial ends). Start learning with Super Histoligo!",
        question16: "What is Histoligo Max?",
        answer16: "Histoligo Max is a new subscription plan that provides a more in-depth learning experience. Histoligo Max will have all the features of Super Histoligo, plus two completely new features using artificial intelligence (AI): Answer explanations and Role-playing. Learn more about the new features here!",
        ticketQuestion: "Do you have any other questions?",
        sendFeedback: "SEND FEEDBACK",
    },
    'vi-VN': {
        title: "HISTOLIGO",
        helpCenter: "TRUNG TÂM TRỢ GIÚP",
        home: "TRANG CHỦ",
        faq: "Câu hỏi thường gặp",
        usingHistoligo: "Sử dụng Histoligo",
        question1: "Tại sao khóa học của tôi thay đổi?",
        answer1: "Histoligo liên tục cập nhật nội dung để các khóa học tốt hơn và hiệu quả hơn. Mỗi khi chúng tôi cập nhật cải thiện, bạn có thể để ý thấy có những điều chỉnh với nội dung hiện có hoặc giới thiệu những tài liệu hoàn toàn mới. Khi điều này xảy ra, chúng tôi cũng sắp đặt vị trí của bạn trên lộ trình học của mình để phù hợp với nội dung và cấu trúc mới. Bạn cứ yên tâm nhé, điều này giúp bạn có những trải nghiệm học tập mới mẻ nhất và hiệu quả nhất có thể.",
        question2: "Streak là gì?",
        answer2: "Streak (biểu tượng ngọn lửa) thể hiện số ngày bạn học liên tục trên Histoligo. Học ngôn ngữ là hành trình dài nhằm dần dần chinh phục các mục tiêu và streak là phương pháp hiệu quả giúp bạn giữ vững động lực học và luyện tập đều đặn mỗi ngày. Mẹo: Nhắc nhở luyện tập sẽ giúp bạn không quên học bài. Trong mục cài đặt thông báo bạn có thể chọn bật nhắc nhở luyện tập và chọn thời gian phù hợp nhất với bản thân.",
        question3: "Bảng xếp hạng và Giải đấu là gì?",
        answer3: "Bảng xếp hạng là nơi bạn có thể vui vẻ thi đua thành tích hằng tuần cùng những người học Histoligo khác. Bạn càng kiếm được nhiều điểm KN (điểm kinh nghiệm) qua mỗi bài học, bạn càng có vị trí cao trên bảng xếp hạng. Mỗi tuần, bạn sẽ gặp những đối thủ khác nhau. Hãy ghé mục Bảng xếp hạng trên ứng dụng để tham gia thi đua nhé!",
        question4: "Histoligo có sử dụng thư viện mở nào không?",
        answer4: "Có. Bạn có thể xem các mã nguồn mở mà chúng tôi được quyền sử dụng và tìm hiểu thêm tại trang này.",
        // Quản lý tài khoản
        accountManagement: "Quản lý tài khoản",
        question5: "Làm cách nào để đổi tên người dùng hoặc địa chỉ email?",
        answer5: "Nếu bạn muốn thay đổi tên người dùng hoặc địa chỉ email của tài khoản Histoligo, hãy tới phần cài đặt và sửa tên người dùng hoặc địa chỉ email. Tên người dùng của bạn sẽ hiển thị trên bảng xếp hạng hằng tuần. Nhớ ấn 'Lưu thay đổi' sau khi chỉnh sửa nhé. Bạn sẽ không thể chỉnh sửa nếu đã có tài khoản Histoligo khác sử dụng tên người dùng mà bạn muốn chọn. Tất cả tên người dùng và địa chỉ email đều độc nhất và không trùng lặp giữa các tài khoản. Hãy thử thay đổi bằng cách thêm một chữ cái đặc biệt hoặc số và lưu lại. Nếu địa chỉ email bạn muốn sử dụng đã liên kết với tài khoản khác, có thể trước đây bạn đã sử dụng email đó để đăng ký một tài khoản khác.",
        question6: "Làm cách nào để tìm kiếm, theo dõi và chặn người dùng khác trên Histoligo?",
        answer6: "Bạn có thể kết nối với những người học khác trên Histoligo! Khi bạn theo dõi ai đó, họ sẽ xuất hiện trong danh sách bạn bè của bạn và các bạn có thể cổ vũ lẫn nhau trên hành trình chinh phục ngoại ngữ!",
        question7: "Làm cách nào để gỡ hoặc đặt lại một khóa học?",
        answer7: "Xóa một khóa học đồng nghĩa xóa toàn bộ dữ liệu học tập và điểm KN của bạn trong khóa học đó, hành động này không thể hoàn tác. Bạn vẫn luôn có thể học lại khóa học đó, nhưng bạn sẽ phải bắt đầu lại từ đầu và làm bài kiểm tra trình độ. Xóa khóa học sẽ không ảnh hưởng tới streak và thứ hạng trên bảng xếp hạng của bạn.",
        question8: "Làm cách nào để xóa tài khoản và kiểm tra dữ liệu của tôi?",
        answer8: "Truy cập trang 'Quản lý dữ liệu Histoligo' để yêu cầu bản sao tất cả các dữ liệu cá nhân Histoligo đang lưu trữ của bạn. Có thể cần tới 30 ngày để xử lý yêu cầu.",
        question9: "Những việc cần làm khi bị rò rỉ dữ liệu",
        answer9: "Bạn có thể đã nhận được một email cảnh báo về việc rò rỉ dữ liệu bên ngoài Histoligo bao gồm cả thông tin cá nhân của bạn. Email này là thật và chúng tôi nghiêm túc khuyên bạn nên thực hiện các hành động để bảo vệ dữ liệu của bản thân.",
        question10: "Tôi gặp vấn đề khi truy cập tài khoản.",
        answer10: "Nếu bạn quên mật khẩu và cần đặt mật khẩu mới, hãy nhấn vào 'Quên mật khẩu' ở màn hình đăng nhập ứng dụng, hoặc truy cập http://Histoligo.com/forgot_password và nhập địa chỉ email liên kết với tài khoản Histoligo của bạn. Nếu ban đầu bạn đăng ký qua Google hoặc Facebook, bạn sẽ cần phải cung cấp email gắn với tài khoản Google hoặc Facebook đó của bạn. Chúng tôi sẽ gửi một đường dẫn tới địa chỉ email đó, bạn có thể sử dụng đường dẫn này để tạo một mật khẩu mới. Hãy nhớ kiểm tra cả hòm thư rác nếu bạn không thấy email đặt lại mật khẩu trong hòm thư đến! Nếu bạn đăng ký bằng một địa chỉ email không chính xác bạn sẽ không thể thay đổi mật khẩu.",
        // Gói đăng ký & Thanh toán
        subscriptionPayment: "Gói đăng ký & Thanh toán",
        question11: "Super Histoligo là gì và làm cách nào để đăng ký?",
        answer11: "Super Histoligo là trải nghiệm Histoligo cao cấp hơn. Khi sử dụng Super Histoligo, bạn sẽ nhận được những quyền lợi sau: Không quảng cáo: Học không gián đoạn; Trái tim vô hạn: Bật Trái tim vô hạn và chẳng còn lo phải tạm dừng vì lỗi sai; Cá nhân hóa luyện tập: Bạn mắc lỗi sai? Không sao hết, bạn sẽ thoải mái ôn luyện các lỗi sai của riêng mình với các bài học cá nhân hóa; Thoải mái chinh phục thử thách Huyền thoại: Vươn tới cấp độ cao nhất - Huyền thoại của mỗi cửa! Đồng thời, khi đăng ký Super Histoligo, bạn đang góp phần hỗ trợ sứ mệnh của chúng tôi, giúp hàng triệu người trên khắp thế giới tiếp cận giáo dục miễn phí. Chúng tôi đem tới những nội dung học giống nhau cho cả người học miễn phí và có trả phí, bởi sứ mệnh của chúng tôi chính là phát triển nền tảng giảng dạy ngôn ngữ tốt nhất cho cả thế giới. Khi bạn đăng ký và hủy đăng ký, dữ liệu học tập và streak của bạn sẽ không thay đổi.",
        question12: "Gói Gia Đình",
        answer12: "Bạn sẽ học ngoại ngữ hiệu quả hơn khi có đồng đội đấy - và đó chính là lý do ra đời Gói gia đình của Super Histoligo! Giờ đây bạn có thể chia sẻ tất cả các quyền lợi của gói Super Histoligo với 5 người thân hoặc bạn bè để cổ vũ lẫn nhau trên hành trình chinh phục ngôn ngữ. Dù bạn được mời tham gia, đăng ký hoặc rời bỏ Gói gia đình, dữ liệu học tập và streak của bạn cũng sẽ không bị ảnh hưởng.",
        question13: "Làm cách nào để hủy gói đăng ký Super Histoligo?",
        answer13: "Bạn có thể hủy gói đăng ký Super Histoligo bất kỳ lúc nào. Cách thức hủy sẽ tùy thuộc theo cách bạn đăng ký ban đầu. Xóa ứng dụng và/hoặc xóa tài khoản sẽ không ảnh hưởng tới gói đăng ký.",
        question14: "Làm cách nào để yêu cầu hoàn tiền?",
        answer14: "Nói chung, tất cả các hoạt động thu phí do mua hàng trong ứng dụng sẽ không được hoàn trả và sẽ không có hoàn tiền hoặc khấu trừ khi sử dụng một phần gói đăng ký. Việc xử lý yêu cầu hoàn tiền có thành công hay không sẽ tùy theo quyết định của bên xử lý dịch vụ (Google Play hoặc Apple).",
        question15: "Làm cách nào để sử dụng mã khuyến mại?",
        answer15: "Hãy truy cập trang Histoligo.com/redeem từ trình duyệt web (trên di động, máy tính bảng hoặc máy tính). Nhập mã khuyến mại và ấn 'Sử dụng mã'. Sau khi bạn được xác nhận là tài khoản người dùng hợp lệ, hãy chọn 'Nhận ưu đãi'. Đăng nhập nếu bạn đã có tài khoản Histoligo hoặc đăng ký nếu bạn chưa tạo tài khoản. Chọn gói đăng ký Super Histoligo hằng tháng, hằng năm hoặc gia đình sau khi hết hạn dùng thử miễn phí. Nhập thông tin thẻ tín dụng của bạn (chỉ tính phí nếu bạn tiếp tục sử dụng Super sau khi hết hạn dùng thử). Bắt đầu học cùng Super Histoligo!",
        question16: "Histoligo Max là gì?",
        answer16: "Histoligo Max là gói đăng ký mới cung cấp trải nghiệm học tập chuyên sâu hơn. Histoligo Max sẽ có tất cả những tính năng của Super Histoligo, và thêm hai tính năng hoàn toàn mới sử dụng trí tuệ nhân tạo (AI): Giải thích đáp án và Nhập vai. Tìm hiểu thêm về những tính năng mới tại đây!",
        ticketQuestion: "Bạn có thắc mắc khác?",
        sendFeedback: "GỬI PHẢN HỒI",
    },
};

const Help = () => {
    const theme = localStorage.getItem('theme') === 'true';
    const locale = localStorage.getItem('locale') || 'en-US';
    const lang = translations[locale] || translations['en-US'];

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
            if (!darkThemeLink) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/DarkMode.css';
                link.id = 'dark-theme-style';
                document.head.appendChild(link);
            }
        } else {
            if (darkThemeLink) {
                darkThemeLink.remove();
            }
        }
    }, [theme]);

    return (
        <div className='wrapHelp'>
            <Link to='/chooseClass'>
                <h1 className="title">{lang.title}</h1>
            </Link>

            <div className='breadCrumb'>
                <span>{lang.helpCenter}</span>
                <RightOutlined />
                <span>{lang.home}</span>
            </div>

            <div className='wrapBoxHelp'>
                <div className='boxHelp'>
                    <h1>{lang.faq}</h1>
                    <div className='headTable'>
                        <p className='heading'>{lang.usingHistoligo}</p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates[0] ? "titleItem active" : "titleItem"}>{lang.question1}</p>
                        {openStates[0] ? <UpOutlined onClick={() => toggleHelp(0)} /> : <DownOutlined onClick={() => toggleHelp(0)} />}
                        <p className={openStates[0] ? 'descItem' : 'descItem none'}>
                            {lang.answer1}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates[1] ? "titleItem active" : "titleItem"}>{lang.question2}</p>
                        {openStates[1] ? <UpOutlined onClick={() => toggleHelp(1)} /> : <DownOutlined onClick={() => toggleHelp(1)} />}
                        <p className={openStates[1] ? 'descItem' : 'descItem none'}>
                            {lang.answer2}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates[2] ? "titleItem active" : "titleItem"}>{lang.question3}</p>
                        {openStates[2] ? <UpOutlined onClick={() => toggleHelp(2)} /> : <DownOutlined onClick={() => toggleHelp(2)} />}
                        <p className={openStates[2] ? 'descItem' : 'descItem none'}>
                            {lang.answer3}
                        </p>
                    </div>

                    <div className="endTable">
                        <p className={openStates[3] ? "titleItem active" : "titleItem"}>{lang.question4}</p>
                        {openStates[3] ? <UpOutlined onClick={() => toggleHelp(3)} /> : <DownOutlined onClick={() => toggleHelp(3)} />}
                        <p className={openStates[3] ? 'descItem' : 'descItem none'}>
                            {lang.answer4}
                        </p>
                    </div>
                </div>
            </div>

            <div className='wrapBoxHelp'>
                <div className='boxHelp'>
                    <div className='headTable'>
                        <p>{lang.accountManagement}</p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[0] ? "titleItem active" : "titleItem"}>{lang.question5}</p>
                        {openStates1[0] ? <UpOutlined onClick={() => toggleHelp1(0)} /> : <DownOutlined onClick={() => toggleHelp1(0)} />}
                        <p className={openStates1[0] ? 'descItem' : 'descItem none'}>
                            {lang.answer5}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[1] ? "titleItem active" : "titleItem"}>{lang.question6}</p>
                        {openStates1[1] ? <UpOutlined onClick={() => toggleHelp1(1)} /> : <DownOutlined onClick={() => toggleHelp1(1)} />}
                        <p className={openStates1[1] ? 'descItem' : 'descItem none'}>
                            {lang.answer6}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[2] ? "titleItem active" : "titleItem"}>{lang.question7}</p>
                        {openStates1[2] ? <UpOutlined onClick={() => toggleHelp1(2)} /> : <DownOutlined onClick={() => toggleHelp1(2)} />}
                        <p className={openStates1[2] ? 'descItem' : 'descItem none'}>
                            {lang.answer7}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[3] ? "titleItem active" : "titleItem"}>{lang.question8}</p>
                        {openStates1[3] ? <UpOutlined onClick={() => toggleHelp1(3)} /> : <DownOutlined onClick={() => toggleHelp1(3)} />}
                        <p className={openStates1[3] ? 'descItem' : 'descItem none'}>
                            {lang.answer8}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates1[4] ? "titleItem active" : "titleItem"}>{lang.question9}</p>
                        {openStates1[4] ? <UpOutlined onClick={() => toggleHelp1(4)} /> : <DownOutlined onClick={() => toggleHelp1(4)} />}
                        <p className={openStates1[4] ? 'descItem' : 'descItem none'}>
                            {lang.answer9}
                        </p>
                    </div>

                    <div className="endTable">
                        <p className={openStates1[5] ? "titleItem active" : "titleItem"}>{lang.question10}</p>
                        {openStates1[5] ? <UpOutlined onClick={() => toggleHelp1(5)} /> : <DownOutlined onClick={() => toggleHelp1(5)} />}
                        <p className={openStates1[5] ? 'descItem' : 'descItem none'}>
                            {lang.answer10}
                        </p>
                    </div>
                </div>
            </div>

            <div className='wrapBoxHelp'>
                <div className='boxHelp'>
                    <div className='headTable'>
                        <p>{lang.subscriptionPayment}</p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[0] ? "titleItem active" : "titleItem"}>{lang.question11}</p>
                        {openStates2[0] ? <UpOutlined onClick={() => toggleHelp2(0)} /> : <DownOutlined onClick={() => toggleHelp2(0)} />}
                        <p className={openStates2[0] ? 'descItem' : 'descItem none'}>
                            {lang.answer11}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[1] ? "titleItem active" : "titleItem"}>{lang.question12}</p>
                        {openStates2[1] ? <UpOutlined onClick={() => toggleHelp2(1)} /> : <DownOutlined onClick={() => toggleHelp2(1)} />}
                        <p className={openStates2[1] ? 'descItem' : 'descItem none'}>
                            {lang.answer12}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[2] ? "titleItem active" : "titleItem"}>{lang.question13}</p>
                        {openStates2[2] ? <UpOutlined onClick={() => toggleHelp2(2)} /> : <DownOutlined onClick={() => toggleHelp2(2)} />}
                        <p className={openStates2[2] ? 'descItem' : 'descItem none'}>
                            {lang.answer13}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[3] ? "titleItem active" : "titleItem"}>{lang.question14}</p>
                        {openStates2[3] ? <UpOutlined onClick={() => toggleHelp2(3)} /> : <DownOutlined onClick={() => toggleHelp2(3)} />}
                        <p className={openStates2[3] ? 'descItem' : 'descItem none'}>
                            {lang.answer14}
                        </p>
                    </div>

                    <div className="itemTable">
                        <p className={openStates2[4] ? "titleItem active" : "titleItem"}>{lang.question15}</p>
                        {openStates2[4] ? <UpOutlined onClick={() => toggleHelp2(4)} /> : <DownOutlined onClick={() => toggleHelp2(4)} />}
                        <p className={openStates2[4] ? 'descItem' : 'descItem none'}>
                            {lang.answer15}
                        </p>
                    </div>

                    <div className="endTable">
                        <p className={openStates2[5] ? "titleItem active" : "titleItem"}>{lang.question16}</p>
                        {openStates2[5] ? <UpOutlined onClick={() => toggleHelp2(5)} /> : <DownOutlined onClick={() => toggleHelp2(5)} />}
                        <p className={openStates2[5] ? 'descItem' : 'descItem none'}>
                            {lang.answer16}
                        </p>
                    </div>
                </div>
            </div>

            <div className='ticketQuestion'>
                <span>{lang.ticketQuestion}</span>
                <br />
                <button>{lang.sendFeedback}</button>
            </div>
        </div>
    );
};

export default Help;