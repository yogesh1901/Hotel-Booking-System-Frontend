document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = form.querySelectorAll('input[type="password"]')[1];
    const submitButton = form.querySelector('button[type="submit"]');

    // Create error message elements
    const createErrorElement = (input) => {
        const error = document.createElement('div');
        error.className = 'text-red-500 text-xs mt-1';
        input.parentNode.insertBefore(error, input.nextSibling);
        return error;
    };

    const nameError = createErrorElement(nameInput);
    const emailError = createErrorElement(emailInput);
    const passwordError = createErrorElement(passwordInput);
    const confirmError = createErrorElement(confirmPasswordInput);

    // Validation functions
    const validateName = () => {
        const name = nameInput.value.trim();
        if (name.length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            nameInput.classList.add('border', 'border-red-500');
            return false;
        }
        nameError.textContent = '';
        nameInput.classList.remove('border', 'border-red-500');
        return true;
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('border', 'border-red-500');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('border', 'border-red-500');
        return true;
    };

    const validatePassword = () => {
        const password = passwordInput.value;
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('border', 'border-red-500');
            return false;
        }
        passwordError.textContent = '';
        passwordInput.classList.remove('border', 'border-red-500');
        return true;
    };

    const validateConfirmPassword = () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('border', 'border-red-500');
            return false;
        }
        confirmError.textContent = '';
        confirmPasswordInput.classList.remove('border', 'border-red-500');
        return true;
    };

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Blur validation for more specific feedback
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = 'Creating Account...';
            
            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const username = email.split('@')[0]; // Generate username from email

            // Create user object
            const newUser = {
                name,
                email,
                username,
                password // Note: In a real app, you should NEVER store plain text passwords
            };

            // Get existing users
            const storedUsers = JSON.parse(localStorage.getItem('hotelUsers')) || [];
            
            // Check if email already exists
            if (storedUsers.some(user => user.email === email)) {
                emailError.textContent = 'Email already registered';
                emailInput.classList.add('border', 'border-red-500');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Create Account';
                return;
            }

            // Add new user
            storedUsers.push(newUser);
            localStorage.setItem('hotelUsers', JSON.stringify(storedUsers));

            // Success message and redirect
            setTimeout(() => {
                alert('Account created successfully!');
                window.location.href = "/src/Pages/Authentication/Login.html";
            }, 1000);
        }
    });


    // Password strength indicator (optional enhancement)
    passwordInput.addEventListener('input', function() {
        const strengthMeter = document.createElement('div');
        strengthMeter.className = 'h-1 mt-1 bg-gray-200 rounded-full';
        
        if (!passwordInput.parentNode.querySelector('.strength-meter')) {
            passwordInput.parentNode.appendChild(strengthMeter);
            strengthMeter.classList.add('strength-meter');
        } else {
            strengthMeter = passwordInput.parentNode.querySelector('.strength-meter');
        }

        const strength = calculatePasswordStrength(passwordInput.value);
        strengthMeter.innerHTML = `<div class="h-full rounded-full ${strength.color}" style="width: ${strength.value}%"></div>`;
    });

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        let color = 'bg-red-500';
        if (strength > 50) color = 'bg-yellow-500';
        if (strength > 75) color = 'bg-green-500';

        return { value: strength, color };
    }
});