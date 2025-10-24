// =======================
// 🌸 BeYourself Chatbot 🌸
// =======================

// DOM Elements
const navAuth = document.getElementById('navAuth');
const navUser = document.getElementById('navUser');
const hamburger = document.getElementById('hamburger');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const questionBtns = document.querySelectorAll('.question-btn');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Chatbot responses
const botResponses = {
    'xin chào': 'Chào bạn! Mình là trợ lý của BeYourself. Bạn cần giúp gì hôm nay? 😊',
    'hello': 'Hello! Welcome to BeYourself. How can I help you today? 🌸',
    'chào admin': 'Chào bạn! Mình là Admin đây. Rất vui được hỗ trợ bạn. 👋',

    'đăng bài như thế nào?': 'Để đăng bài:\n1️⃣ Vào trang "Khám phá"\n2️⃣ Nhập nội dung vào ô chia sẻ\n3️⃣ Nhấn "Đăng bài" để hoàn tất 📝',

    'đổi mật khẩu ở đâu?': 'Bạn có thể đổi mật khẩu trong mục "Cài đặt" > "Bảo mật" > "Đổi mật khẩu". 🔒',

    'quên mật khẩu thì làm sao?': 'Không sao! Hãy chọn "Quên mật khẩu?" ở trang đăng nhập và làm theo hướng dẫn để đặt lại nhé. 📧',

    'chỉnh sửa thông tin cá nhân': 'Vào "Cài đặt" > "Hồ sơ cá nhân" để cập nhật tên, ảnh và giới thiệu của bạn. 👤',

    'xóa tài khoản': 'Bạn có thể xóa tài khoản trong phần "Cài đặt" > "Xóa tài khoản". ⚠️ Hãy cẩn thận vì thao tác này không thể hoàn tác!',

    'báo cáo bài viết': 'Để báo cáo nội dung không phù hợp, nhấn vào dấu "..." ở bài viết đó rồi chọn "Báo cáo". 🚨',

    'tạm biệt': 'Tạm biệt nhé! 🌻 Chúc bạn một ngày thật vui và nhiều năng lượng!',

    'mặc định': 'Xin lỗi, mình chưa hiểu câu hỏi của bạn. 😅\nBạn có thể thử diễn đạt lại hoặc liên hệ email: support@beyourself.vn 💌'
    
};

// ===========================
// ⚙️ XỬ LÝ CHATBOT REPLY
// ===========================

// Hàm thêm tin nhắn vào khung chat
function appendMessage(sender, message) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerText = message;
    chatMessages.appendChild(msgDiv);

    // Cuộn xuống cuối khi có tin nhắn mới
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hàm tìm phản hồi phù hợp
function getBotResponse(userMessage) {
    const normalized = userMessage.trim().toLowerCase();
    return botResponses[normalized] || botResponses['mặc định'];
}

// Hàm xử lý khi người dùng gửi tin nhắn
function handleUserMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage === '') return;

    // Hiển thị tin nhắn người dùng
    appendMessage('user', userMessage);

    // Xóa nội dung trong ô nhập
    messageInput.value = '';

    // Bot phản hồi sau 0.6s cho tự nhiên
    setTimeout(() => {
        const botReply = getBotResponse(userMessage);
        appendMessage('bot', botReply);
    }, 600);
}

// Sự kiện click nút Gửi
sendMessage.addEventListener('click', handleUserMessage);

// Sự kiện nhấn Enter để gửi
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleUserMessage();
    }
});

// Xử lý khi nhấn vào các nút câu hỏi nhanh (question-btn)
questionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.innerText.trim();
        appendMessage('user', question);
        setTimeout(() => {
            const reply = getBotResponse(question);
            appendMessage('bot', reply);
        }, 600);
    });
});

// Xử lý khi nhấn vào các nút gợi ý (suggestion-btn)
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const suggestion = btn.innerText.trim();
        messageInput.value = suggestion;
        messageInput.focus();
    });
});

// Xử lý menu hamburger (nếu có trong giao diện)
if (hamburger) {
    hamburger.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });
}
