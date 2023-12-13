document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('emaillogin');
    const passwordInput = document.getElementById('passwordlogin');
    const loginButton = document.getElementById('loginButton');

    if (emailInput && passwordInput && loginButton) {
        loginButton.addEventListener('click', submitForm);
    }

    function submitForm() {
        const email = emailInput.value;
        const password = passwordInput.value;

        const formData = {
            email,
            password
        };

        sendMessageToServer(formData);
    }

    function sendMessageToServer(data) {
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:10000/login';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Login successful!');
                } else {
                    console.error('Login failed. Server returned:', xhr.status, xhr.statusText);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }
    function displayUserInfo(userInfo) {
        // Hiển thị thông tin người dùng trên giao diện
        const userInfoContainer = document.getElementById('userInfoContainer');
        const userEmail = document.getElementById('userEmail');
        const userFullname = document.getElementById('userFullname');
    
        userEmail.textContent = userInfo.email;
        userFullname.textContent = userInfo.fullname;
    
        userInfoContainer.style.display = 'block';
    
        // Cập nhật giao diện tùy thuộc vào nhu cầu của bạn
    }
});
