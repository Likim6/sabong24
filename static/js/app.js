// static/js/app.js
document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const icon = this.querySelector('i');

    if (password.type === 'password') {
        password.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        password.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

document.querySelectorAll('.flag-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.flag-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const lang = this.dataset.lang;
        updateLanguage(lang);
    });
});

const translations = {
    kh: {
        username: 'ឈ្មោះអ្នកប្រើប្រាស់',
        password: 'ពាក្យសម្ងាត់',
        login: 'ចូលលេង',
        usernamePlaceholder: 'បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់',
        passwordPlaceholder: 'បញ្ចូលពាក្យសម្ងាត់'
    },
    th: {
        username: 'ชื่อผู้ใช้',
        password: 'รหัสผ่าน',
        login: 'เข้าสู่ระบบ (Login)',
        usernamePlaceholder: 'ป้อนชื่อผู้ใช้ของคุณ',
        passwordPlaceholder: 'ป้อนรหัสผ่านของคุณ'
    },
    en: {
        username: 'Username',
        password: 'Password',
        login: 'Login',
        usernamePlaceholder: 'Enter your username',
        passwordPlaceholder: 'Enter your password'
    },
    cn: {
        username: '用户名',
        password: '密码',
        login: '登录 (Login)',
        usernamePlaceholder: '输入您的用户名',
        passwordPlaceholder: '输入您的密码'
    },
    vn: {
        username: 'Tên đăng nhập',
        password: 'Mật khẩu',
        login: 'Đăng nhập (Login)',
        usernamePlaceholder: 'Nhập tên đăng nhập',
        passwordPlaceholder: 'Nhập mật khẩu'
    }
};

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelector('label[for="username"]').textContent = t.username;
    document.querySelector('label[for="password"]').textContent = t.password;
    document.querySelector('.btn-sabong').innerHTML = `<i class="fas fa-sign-in-alt me-2"></i>${t.login}`;
    document.getElementById('username').placeholder = t.usernamePlaceholder;
    document.getElementById('password').placeholder = t.passwordPlaceholder;
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    form.classList.add('was-validated');

    if (username && password) {
        const btn = document.querySelector('.btn-sabong');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Logging in...';
        btn.disabled = true;

        setTimeout(() => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertDiv.innerHTML = `
                        <i class="fas fa-check-circle me-2"></i>
                        Login successful!
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
            form.appendChild(alertDiv);

            btn.innerHTML = originalText;
            btn.disabled = false;
            form.classList.remove('was-validated');
        }, 2000);
    }
});

document.querySelectorAll('.glass-input').forEach(input => {
    input.addEventListener('focus', function () {
        this.closest('.input-group').style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.closest('.input-group').style.transform = 'scale(1)';
    });
});

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});