// 修改后的 main2.js
const form = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');
const emailError = document.getElementById('emailError');
const successMessage = document.getElementById('successMessage');

// 初始化留言数据
let messages = JSON.parse(localStorage.getItem('messages')) || [];
displayMessages();

// 设置今天日期
document.getElementById('date').valueAsDate = new Date();

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 获取表单数据
    const formData = {
        nickname: document.getElementById('nickname').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: document.getElementById('date').value
    };

    // 验证邮箱格式
    if (!validateEmail(formData.email)) {
        emailError.textContent = '请输入有效的电子邮箱地址';
        return;
    }
    emailError.textContent = '';

    try {
        // 使用 Formspree 发送邮件
        const response = await fetch('https://formspree.io/f/meoaeegl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.nickname,
                _replyto: formData.email,
                message: `日期：${formData.date}\n内容：${formData.message}`
            })
        });

        if (!response.ok) throw new Error('发送失败');

        // 保存到本地存储
        messages.push(formData);
        localStorage.setItem('messages', JSON.stringify(messages));

        // 更新留言列表
        displayMessages();

        // 显示成功提示
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);

        // 重置表单
        form.reset();
        document.getElementById('date').valueAsDate = new Date();

    } catch (error) {
        alert('留言提交失败，请稍后重试');
        console.error('Error:', error);
    }
});

// 其余函数保持不变
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// function displayMessages() {
//     messageList.innerHTML = messages.map(msg => `
//         <div class="message-card">
//             <h3>${msg.nickname} <small>${msg.date}</small></h3>
//             <p>${msg.message}</p>
//             <p style="color: #83a4d4;">${msg.email}</p>
//         </div>
//     `).join('');
// }
function displayMessages() {
    // 按时间从最新到最旧排序
    messages.sort((a, b) => new Date(b.date) - new Date(a.date));

    messageList.innerHTML = messages.map(msg => `
        <div class="message-card">
            <h3>${msg.nickname} <small>${msg.date}</small></h3>
            <p>${msg.message}</p>
            <p style="color: #83a4d4;">${msg.email}</p>
        </div>
    `).join('');
}
