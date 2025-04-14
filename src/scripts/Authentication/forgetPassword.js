document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const cancelBtn = document.querySelector('a[href="/src/Pages/Authentication/Login.html"]');
    const submitBtn = document.getElementById('submitBtn');
    const backArrow = document.querySelector('a[href="/src/Pages/Authentication/Login.html"] svg');

    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector('button.md\\:hidden');
    const navMenu = document.querySelector('nav.hidden.md\\:flex');

    // Mobile menu toggle functionality
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            navMenu.classList.toggle('flex-col');
            navMenu.classList.toggle('absolute');
            navMenu.classList.toggle('top-16');
            navMenu.classList.toggle('right-4');
            navMenu.classList.toggle('bg-hotel-black');
            navMenu.classList.toggle('p-4');
            navMenu.classList.toggle('rounded');
            navMenu.classList.toggle('shadow-lg');
        });
    }

    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Show error message
    function showError(input, message) {
        emailError.textContent = message;
        emailError.classList.remove('hidden');
        input.classList.add('border', 'border-red-500');
    }

    // Remove error message
    function removeError(input) {
        emailError.textContent = '';
        emailError.classList.add('hidden');
        input.classList.remove('border', 'border-red-500');
    }

    // Validate form on submit
    function validateForm(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // If form is valid, submit it
        if (isValid) {
            submitResetRequest();
        }
    }

    // Simulate API request to send reset link
    function submitResetRequest() {
        // Show loading state
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;
        
        // Disable buttons during submission
        submitBtn.disabled = true;
        cancelBtn.classList.add('pointer-events-none', 'opacity-75');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset button
            submitBtn.innerHTML = 'Send Link';
            submitBtn.disabled = false;
            cancelBtn.classList.remove('pointer-events-none', 'opacity-75');
        }, 1500);
    }

    // Show success message
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
        successMessage.innerHTML = `
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline">Reset link sent to your email.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-green-500 cursor-pointer" onclick="this.parentElement.parentElement.remove()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
            </span>
        `;
        
        // Insert before the form
        const form = document.querySelector('.container-div');
        form.parentNode.insertBefore(successMessage, form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
                window.location.href = "/src/Pages/Authentication/resetpassword.html";
            }
        }, 1000);
    }

    // Event Listeners
    submitBtn.addEventListener('click', validateForm);
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() === '') {
            removeError(emailInput);
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
        } else {
            removeError(emailInput);
        }
    });
    
    // Back arrow hover effect
    if (backArrow) {
        backArrow.addEventListener('mouseenter', function() {
            backArrow.classList.add('text-hotel-gold');
        });
        
        backArrow.addEventListener('mouseleave', function() {
            backArrow.classList.remove('text-hotel-gold');
        });
    }
});
