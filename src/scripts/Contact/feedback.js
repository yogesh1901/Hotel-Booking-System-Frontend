document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality (if needed on this page)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // You would toggle your mobile menu here
            console.log('Mobile menu button clicked');
        });
    }

    // Rating selection functionality
    const ratingButtons = document.querySelectorAll('.flex.space-x-2 button');
    let selectedRating = 0;

    ratingButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            selectedRating = index + 1;
            
            // Update UI to show selected rating
            ratingButtons.forEach((btn, i) => {
                if (i <= index) {
                    btn.classList.add('bg-hotel-gold', 'text-hotel-black');
                    btn.classList.remove('bg-hotel-black', 'text-white');
                } else {
                    btn.classList.add('bg-hotel-black', 'text-white');
                    btn.classList.remove('bg-hotel-gold', 'text-hotel-black');
                }
            });
        });
    });

    // Form submission handling
    const feedbackForm = document.querySelector('.container-div');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.querySelector('input[type="text"]').value.trim();
            const email = document.querySelector('input[type="email"]').value.trim();
            const feedback = document.querySelector('textarea').value.trim();
            
            // Simple validation
            if (!name || !email || !feedback || selectedRating === 0) {
                alert('Please fill in all fields and select a rating.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Feedback submitted:', {
                name,
                email,
                rating: selectedRating,
                feedback
            });
            
            // Show success message
            alert('Thank you for your feedback! We appreciate your time.');
            
            // Reset form
            feedbackForm.reset();
            ratingButtons.forEach(btn => {
                btn.classList.add('bg-hotel-black', 'text-white');
                btn.classList.remove('bg-hotel-gold', 'text-hotel-black');
            });
            selectedRating = 0;
        });
    }

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Make sure the form doesn't actually submit (since we're handling with JS)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
});