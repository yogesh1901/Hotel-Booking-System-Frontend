document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.querySelector('nav.hidden.md\\:flex');
    const contactForm = document.querySelector('form');
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const subjectSelect = contactForm.querySelector('select');
    const messageTextarea = contactForm.querySelector('textarea');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const backButton = document.querySelector('a[href="index.html"]');

    // Mobile Menu Toggle
    function toggleMobileMenu() {
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
    }

    // Form Validation
    function validateForm() {
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // Subject validation
        if (subjectSelect.value === '') {
            showError(subjectSelect, 'Please select a subject');
            isValid = false;
        } else {
            removeError(subjectSelect);
        }

        // Message validation
        if (messageTextarea.value.trim() === '') {
            showError(messageTextarea, 'Message is required');
            isValid = false;
        } else if (messageTextarea.value.trim().length < 10) {
            showError(messageTextarea, 'Message should be at least 10 characters');
            isValid = false;
        } else {
            removeError(messageTextarea);
        }

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Show error message
    function showError(input, message) {
        const formControl = input.parentElement;
        let errorElement = formControl.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message text-red-500 text-xs mt-1';
            formControl.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('border-red-500');
        input.classList.remove('focus:ring-hotel-black');
        input.classList.add('focus:ring-red-500');
    }

    // Remove error message
    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('border-red-500');
        input.classList.add('focus:ring-hotel-black');
        input.classList.remove('focus:ring-red-500');
    }

    // Form submission handler
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;

        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectSelect.value,
            message: messageTextarea.value.trim()
        };

        try {
            // Simulate API call (replace with actual fetch in production)
            await simulateApiCall(formData);
            
            // Show success message
            showNotification('success', 'Your message has been sent successfully!');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            showNotification('error', 'Failed to send message. Please try again later.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    }

    // Simulate API call
    function simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Randomly fail 10% of the time for demo purposes
                if (Math.random() < 0.1) {
                    reject(new Error('Network error'));
                } else {
                    console.log('Form submitted:', data);
                    resolve();
                }
            }, 1500);
        });
    }

    // Show notification
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                        type === 'success' ? 
                        'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"' : 
                        'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"'
                    }></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Back button hover effect
    if (backButton) {
        backButton.addEventListener('mouseenter', function() {
            const svg = backButton.querySelector('svg');
            svg.classList.add('text-white');
            svg.classList.remove('text-hotel-gold');
        });
        
        backButton.addEventListener('mouseleave', function() {
            const svg = backButton.querySelector('svg');
            svg.classList.add('text-hotel-gold');
            svg.classList.remove('text-white');
        });
    }

    // Real-time validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') {
            removeError(nameInput);
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
            removeError(emailInput);
        }
    });

    subjectSelect.addEventListener('change', () => {
        if (subjectSelect.value !== '') {
            removeError(subjectSelect);
        }
    });

    messageTextarea.addEventListener('input', () => {
        if (messageTextarea.value.trim() !== '' && messageTextarea.value.trim().length >= 10) {
            removeError(messageTextarea);
        }
    });

    // Event Listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', handleSubmit);
});