document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');

    function submitForm() {
        const username = usernameInput.value;
        const fullname = fullnameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const phone = phoneInput.value;

        const formData = {
            username,
            fullname,
            email,
            password,
            confirmPassword,
            phone,
        };

        if (validation(username, fullname, email, password, confirmPassword, phone)) {
            sendMessageToServer(formData);
        }
    }

    function validation(username, fullname, email, password, confirmPassword, phone) {
        if (!username || !fullname || !email || !password || !confirmPassword || !phone) {
            alert("Vui lòng điền đủ trường");
            return false;
        }

        if (password !== confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Địa chỉ email không hợp lệ.');
            return false;
        }

        return true;
    }

    function sendMessageToServer(data) {
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:10000/register';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Registration successful!');
                } else {
                    console.error('Registration failed. Server returned:', xhr.status, xhr.statusText);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    const registerButton = document.getElementById('registerButton');
    registerButton.addEventListener('click', submitForm);
});
