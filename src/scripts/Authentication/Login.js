document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('remember').checked;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    // Clear previous errors
    usernameError.classList.add('hidden');
    passwordError.classList.add('hidden');
    
    // Validation
    let isValid = true;
    if (username.length < 4) {
        // usernameError.classList.remove('hidden');
        isValid = false;
    }
    if (password.length < 6) {
        // passwordError.classList.remove('hidden');
        isValid = false;
    }
    
    if (isValid) {
        // Check credentials against stored data
        checkCredentials(username, password, rememberMe);
    }
});

// Real-time validation
document.getElementById('username').addEventListener('input', function() {
    const username = this.value.trim();
    const usernameError = document.getElementById('usernameError');
    
    if (username.length > 0 && username.length < 4) {
        usernameError.classList.remove('hidden');
    } else {
        usernameError.classList.add('hidden');
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = this.value.trim();
    const passwordError = document.getElementById('passwordError');
    
    // if (password.length > 0 && password.length < 6) {
    //     passwordError.classList.remove('hidden');
    // } else {
    //     passwordError.classList.add('hidden');
    // }
});

// Check credentials function
function checkCredentials(username, password, rememberMe) {
    // Get stored users and admin from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('hotelUsers')) || [];
    const storedAdmin = JSON.parse(localStorage.getItem('hotelAdmin')) || null;

    // Check if admin
    if (storedAdmin && username === storedAdmin.username && password === storedAdmin.password) {
        // Store admin session
        sessionStorage.setItem('currentUser', JSON.stringify({
            username: storedAdmin.username,
            isAdmin: true
        }));
        
        // Remember admin if checkbox is checked
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({
                username: storedAdmin.username,
                isAdmin: true
            }));
        }
        
        // Redirect to admin portal
        window.location.href = '/src/Pages/Admin/dashboard.html';
        return;
    }

    // Check regular users
    const user = storedUsers.find(u => 
        (u.username === username || u.email === username) && 
        u.password === password
    );

    if (user) {
        // Store user session
        sessionStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email,
            isAdmin: false
        }));
        
        // Remember user if checkbox is checked
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({
                username: user.username,
                email: user.email,
                isAdmin: false
            }));
        }
        
        // Redirect to user portal
        window.location.href = "/index2.html";
    } else {
        alert('Invalid username or password');
    }
}

// Check for remembered user on page load
window.addEventListener('DOMContentLoaded', function() {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser.username || rememberedUser.email;
        document.getElementById('remember').checked = true;
    }
});
// Run this once to set up admin credentials
// const adminCredentials = {
//     username: "admin",
//     password: "admin123" // In real app, use proper hashing!
// };

// localStorage.setItem('hotelAdmin', JSON.stringify(adminCredentials));
// console.log('Admin credentials set up');