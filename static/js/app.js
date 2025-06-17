// static/js/app.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');

    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {
            const icon = this.querySelector('i');

            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    const flagBtns = document.querySelectorAll('.flag-btn');
    if (flagBtns.length > 0) {
        flagBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                flagBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const lang = this.dataset.lang;
                updateLanguage(lang);
            });
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
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

                    console.log('Login successful for user:', username, password);

                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    form.classList.remove('was-validated');
                }, 2000);
            }
        });
    }

    const glassInputs = document.querySelectorAll('.glass-input');
    if (glassInputs.length > 0) {
        glassInputs.forEach(input => {
            input.addEventListener('focus', function () {
                const inputGroup = this.closest('.input-group');
                if (inputGroup) {
                    inputGroup.style.transform = 'scale(1.02)';
                }
            });

            input.addEventListener('blur', function () {
                const inputGroup = this.closest('.input-group');
                if (inputGroup) {
                    inputGroup.style.transform = 'scale(1)';
                }
            });
        });
    }

    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        console.log('Looking for tabs... Found:', tabBtns.length);
        
        if (tabBtns.length > 0) {
            console.log('Initializing tab functionality...');
            
            tabBtns.forEach((btn, index) => {
                console.log(`Tab ${index}:`, btn.textContent.trim(), 'data-tab:', btn.getAttribute('data-tab'));
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('=== TAB CLICKED ===');
                    console.log('Clicked tab:', this.textContent.trim());
                    console.log('Tab data-tab:', this.getAttribute('data-tab'));
                    
                    tabBtns.forEach(tab => {
                        tab.classList.remove('active');
                        console.log('Removed active from:', tab.textContent.trim());
                    });
                    
                    this.classList.add('active');
                    console.log('Added active to:', this.textContent.trim());
                    
                    const tabType = this.getAttribute('data-tab');
                    console.log('Tab type:', tabType);
                    
                    const emptyText = document.querySelector('.empty-text');
                    if (emptyText) {
                        if (tabType === 'live') {
                            emptyText.textContent = 'មិនមានតារាងភ្នាល់នៅឡើយទេ';
                            console.log('Changed to live betting table text');
                        } else if (tabType === 'all') {
                            emptyText.textContent = 'មិនមានរបាយការណ៍នៅឡើយទេ';
                            console.log('Changed to reports text');
                        }
                    } else {
                        console.log('Empty text element not found');
                    }
                    
                    console.log('=== TAB CLICK COMPLETE ===');
                });
            });
        } else {
            console.log('No tab buttons found in DOM');
        }
    }

    function initChips() {
        const chips = document.querySelectorAll('.betting-chip');
        const betInput = document.querySelector('.bet-input');
        
        console.log('Looking for chips... Found:', chips.length);
        console.log('Bet input found:', betInput ? 'yes' : 'no');
        
        if (chips.length > 0 && betInput) {
            console.log('Initializing chip functionality...');
            
            chips.forEach(chip => {
                chip.addEventListener('click', function() {
                    console.log('Chip clicked:', this.textContent.trim());
                    
                    chips.forEach(c => c.classList.remove('active'));
                    
                    this.classList.add('active');
                    
                    const value = this.getAttribute('data-value');
                    if (value) {
                        betInput.value = value;
                        console.log('Set input value to:', value);
                    }
                });
            });
            
            betInput.addEventListener('input', function() {
                chips.forEach(c => c.classList.remove('active'));
                console.log('Input changed, cleared chip selection');
            });
        }
    }

    setTimeout(function() {
        console.log('Initializing tabs and chips...');
        initTabs();
        initChips();
    }, 200);
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
        login: 'เข้าสู่ระบบ',
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
        login: '登录',
        usernamePlaceholder: '输入您的用户名',
        passwordPlaceholder: '输入您的密码'
    },
    vn: {
        username: 'Tên đăng nhập',
        password: 'Mật khẩu',
        login: 'Đăng nhập',
        usernamePlaceholder: 'Nhập tên đăng nhập',
        passwordPlaceholder: 'Nhập mật khẩu'
    }
};

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    const usernameLabel = document.querySelector('label[for="username"]');
    const passwordLabel = document.querySelector('label[for="password"]');
    const loginBtn = document.querySelector('.btn-sabong');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (usernameLabel) usernameLabel.textContent = t.username;
    if (passwordLabel) passwordLabel.textContent = t.password;
    if (loginBtn) loginBtn.innerHTML = `<i class="fas fa-sign-in-alt me-2"></i>${t.login}`;
    if (usernameInput) usernameInput.placeholder = t.usernamePlaceholder;
    if (passwordInput) passwordInput.placeholder = t.passwordPlaceholder;
}