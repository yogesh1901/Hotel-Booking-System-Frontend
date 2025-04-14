document.addEventListener('DOMContentLoaded', function() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const updateButton = document.getElementById('updateButton');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validatePassword(password) {
        // At least 8 characters
        if (password.length < 8) {
            return { valid: false, message: 'Password must be at least 8 characters' };
        }
        // At least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one uppercase letter' };
        }
        // At least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one lowercase letter' };
        }
        // At least one number
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one number' };
        }
        // At least one special character
        if (!/[^A-Za-z0-9]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one special character' };
        }
        return { valid: true };
    }

    function validateNewPassword() {
        const password = newPasswordInput.value;
        if (password === '') {
            newPasswordError.textContent = 'Password is required';
            newPasswordError.classList.remove('hidden');
            newPasswordInput.classList.add('border', 'border-red-500');
            return false;
        }
        
        const validation = validatePassword(password);
        if (!validation.valid) {
            newPasswordError.textContent = validation.message;
            newPasswordError.classList.remove('hidden');
            newPasswordInput.classList.add('border', 'border-red-500');
            return false;
        }
        
        newPasswordError.textContent = '';
        newPasswordError.classList.add('hidden');
        newPasswordInput.classList.remove('border', 'border-red-500');
        return true;
    }

    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordError.classList.remove('hidden');
            confirmPasswordInput.classList.add('border', 'border-red-500');
            return false;
        }
        
        if (newPasswordInput.value !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.classList.remove('hidden');
            confirmPasswordInput.classList.add('border', 'border-red-500');
            return false;
        }
        
        confirmPasswordError.textContent = '';
        confirmPasswordError.classList.add('hidden');
        confirmPasswordInput.classList.remove('border', 'border-red-500');
        return true;
    }

    newPasswordInput.addEventListener('input', function() {
        validateNewPassword();
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    updateButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isNewPasswordValid = validateNewPassword();
        const isConfirmValid = validateConfirmPassword();
        
        if (isNewPasswordValid && isConfirmValid) {
            updateButton.disabled = true;
            updateButton.textContent = 'Updating...';
            
            // Simulate API call
            setTimeout(function() {
                alert('Password reset successful! You can now login with your new password.');
                window.location.href = "/src/Pages/Authentication/Login.html";
            }, 1000);
        }
    });
});