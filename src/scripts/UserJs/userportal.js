document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation
    function showPage(pageId) {
        // Hide all pages with fade out effect
        document.querySelectorAll('.page').forEach(page => {
            if (!page.classList.contains('hidden')) {
                page.style.opacity = '0';
                setTimeout(() => {
                    page.classList.add('hidden');
                    page.style.opacity = '1';
                }, 300);
            }
        });
        
        // Show selected page with fade in effect
        const targetPage = document.getElementById(pageId);
        setTimeout(() => {
            targetPage.classList.remove('hidden');
            targetPage.style.opacity = '0';
            setTimeout(() => {
                targetPage.style.opacity = '1';
            }, 10);
        }, 300);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('bg-gray-800', 'border-l-4', 'border-amber-500');
        });
        document.getElementById('nav-' + pageId).classList.add('bg-gray-800', 'border-l-4', 'border-amber-500');
        
        // Scroll to top of the page
        window.scrollTo(0, 0);
    }

    // Profile Edit Functionality
    let originalProfileData = {};

    function toggleEditMode() {
        const isEditing = document.getElementById('editBtn').classList.contains('hidden');
        
        if (isEditing) {
            // Cancel edit mode
            cancelEdit();
        } else {
            // Enter edit mode
            document.getElementById('editBtn').classList.add('hidden');
            document.getElementById('saveBtn').classList.remove('hidden');
            document.getElementById('cancelBtn').classList.remove('hidden');
            
            // Store original values
            originalProfileData = {
                name: document.getElementById('nameDisplay').textContent,
                phone: document.getElementById('phoneDisplay').textContent,
                email: document.getElementById('emailDisplay').textContent,
                address: document.getElementById('addressDisplay').textContent,
                country: document.getElementById('countryDisplay').textContent
            };
            
            // Show input fields with animation
            document.querySelectorAll('[id$="Display"]').forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.classList.add('hidden');
                    el.style.opacity = '1';
                }, 300);
            });
            
            document.querySelectorAll('[id$="Input"]').forEach(el => {
                el.classList.remove('hidden');
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 10);
            });
        }
    }

    function saveProfile() {
        // Validate inputs
        const name = document.getElementById('nameInput').value.trim();
        const phone = document.getElementById('phoneInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const address = document.getElementById('addressInput').value.trim();
        const country = document.getElementById('countryInput').value.trim();
        
        if (!name || !phone || !email || !address || !country) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        if (!/^[a-zA-Z ]+$/.test(name)) {
            showNotification('Name should contain only letters', 'error');
            return;
        }
        
        if (!/^\+?[0-9\s]+$/.test(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const saveBtn = document.getElementById('saveBtn');
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Saving...';
        
        // Simulate API call
        setTimeout(() => {
            // Update display fields
            document.getElementById('nameDisplay').textContent = name;
            document.getElementById('phoneDisplay').textContent = phone;
            document.getElementById('emailDisplay').textContent = email;
            document.getElementById('addressDisplay').textContent = address;
            document.getElementById('countryDisplay').textContent = country;
            
            // Update sidebar
            document.getElementById('sidebar-name').textContent = name.toUpperCase();
            document.getElementById('sidebar-email').textContent = email;
            
            // Exit edit mode
            document.getElementById('editBtn').classList.remove('hidden');
            document.getElementById('saveBtn').classList.add('hidden');
            document.getElementById('cancelBtn').classList.add('hidden');
            
            document.querySelectorAll('[id$="Display"]').forEach(el => {
                el.classList.remove('hidden');
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 10);
            });
            
            document.querySelectorAll('[id$="Input"]').forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.classList.add('hidden');
                    el.style.opacity = '1';
                }, 300);
            });
            
            // Reset button
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
            
            showNotification('Profile updated successfully!', 'success');
        }, 1500);
    }

    function cancelEdit() {
        // Restore original values
        document.getElementById('nameInput').value = originalProfileData.name;
        document.getElementById('phoneInput').value = originalProfileData.phone;
        document.getElementById('emailInput').value = originalProfileData.email;
        document.getElementById('addressInput').value = originalProfileData.address;
        document.getElementById('countryInput').value = originalProfileData.country;
        
        // Exit edit mode
        document.getElementById('editBtn').classList.remove('hidden');
        document.getElementById('saveBtn').classList.add('hidden');
        document.getElementById('cancelBtn').classList.add('hidden');
        
        // Hide inputs and show displays with animation
        document.querySelectorAll('[id$="Input"]').forEach(el => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.classList.add('hidden');
                el.style.opacity = '1';
            }, 300);
        });
        
        document.querySelectorAll('[id$="Display"]').forEach(el => {
            el.classList.remove('hidden');
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.opacity = '1';
            }, 10);
        });
    }

    // Booking Management
    document.querySelectorAll('.booking-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            const action = this.textContent.trim().toLowerCase();
            const bookingCard = this.closest('.booking-card');
            const bookingId = bookingCard.querySelector('.font-medium').textContent;
            
            switch(action) {
                case 'view details':
                    showBookingDetails(bookingId);
                    break;
                case 'modify':
                    modifyBooking(bookingId);
                    break;
                case 'cancel':
                    cancelBooking(bookingId, bookingCard);
                    break;
            }
        });
    });

    function showBookingDetails(bookingId) {
        // In a real app, this would fetch booking details from an API
        showNotification(`Showing details for booking ${bookingId}`, 'info');
        
        // Simulate opening a modal with booking details
        setTimeout(() => {
            // This would show a modal with detailed booking information
            console.log(`Fetching details for booking ${bookingId}`);
        }, 500);
    }

    function modifyBooking(bookingId) {
        showNotification(`Preparing to modify booking ${bookingId}`, 'info');
        
        // Simulate redirect to booking modification page
        setTimeout(() => {
            // window.location.href = `/modify-booking?id=${bookingId}`;
            console.log(`Redirecting to modify booking ${bookingId}`);
        }, 1000);
    }

    function cancelBooking(bookingId, bookingCard) {
        if (confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
            showNotification(`Cancelling booking ${bookingId}...`, 'warning');
            
            // Simulate API call to cancel booking
            setTimeout(() => {
                // Update UI to show cancelled status
                const statusElement = bookingCard.querySelector('.bg-amber-400, .bg-green-500');
                if (statusElement) {
                    statusElement.classList.remove('bg-amber-400', 'text-dark');
                    statusElement.classList.add('bg-red-500', 'text-white');
                    statusElement.textContent = 'Cancelled';
                }
                
                // Disable action buttons
                bookingCard.querySelectorAll('button').forEach(btn => {
                    if (!btn.disabled) {
                        btn.disabled = true;
                        btn.classList.remove('bg-blue-100', 'bg-amber-100', 'bg-red-100');
                        btn.classList.add('bg-gray-100', 'text-gray-400');
                    }
                });
                
                showNotification(`Booking ${bookingId} has been cancelled`, 'success');
            }, 1500);
        }
    }

    // Feedback Form Submission
    const feedbackForm = document.querySelector('#feedback form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookingId = this.querySelector('input[type="text"]').value.trim();
            const rating = this.querySelector('select').value;
            const comments = this.querySelector('textarea').value.trim();
            
            if (!bookingId || !comments) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Submitting...';
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, this would submit to the server
                console.log('Submitting feedback:', { bookingId, rating, comments });
                
                // Reset form
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showNotification('Thank you for your feedback!', 'success');
            }, 1500);
        });
    }

    // Password Change Form
    const passwordForm = document.querySelector('#settings form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = this.querySelector('input[type="password"]').value;
            const newPassword = this.querySelectorAll('input[type="password"]')[1].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[2].value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('Please fill all password fields', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                showNotification('Password must be at least 8 characters', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Updating...';
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, this would submit to the server
                console.log('Changing password:', { currentPassword, newPassword });
                
                // Reset form
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showNotification('Password updated successfully!', 'success');
            }, 1500);
        });
    }

    // Notification Preferences
    const notificationForm = document.querySelectorAll('#settings form')[1];
    if (notificationForm) {
        notificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailNotifications = this.querySelector('#email-notifications').checked;
            const smsNotifications = this.querySelector('#sms-notifications').checked;
            const promoOffers = this.querySelector('#promo-offers').checked;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Saving...';
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, this would submit to the server
                console.log('Updating notification preferences:', { 
                    emailNotifications, 
                    smsNotifications, 
                    promoOffers 
                });
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showNotification('Notification preferences saved!', 'success');
            }, 1000);
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };
        
        const icon = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${colors[type]} flex items-center transform translate-x-full opacity-0 transition-all duration-300 z-50`;
        notification.innerHTML = `
            <i class="fas ${icon[type]} mr-2"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
            notification.classList.add('translate-x-0', 'opacity-100');
        }, 10);
        
        // Auto-dismiss after 3 seconds
        const dismissTimer = setTimeout(() => {
            notification.classList.remove('translate-x-0', 'opacity-100');
            notification.classList.add('translate-x-full', 'opacity-0');
            
            // Remove after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Allow manual dismissal
        notification.addEventListener('click', () => {
            clearTimeout(dismissTimer);
            notification.classList.remove('translate-x-0', 'opacity-100');
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Initialize the dashboard page
    showPage('dashboard');
    
    // Add event listeners to all navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('onclick').match(/showPage\('([^']+)'\)/)[1];
            showPage(pageId);
        });
    });
    
    // Add keyboard accessibility for navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals (would be implemented in a real app)
        }
    });
});
// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');
    document.getElementById(pageId).classList.add('active');
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('bg-gray-800', 'border-l-4', 'border-amber-500');
    });
    document.getElementById('nav-' + pageId).classList.add('bg-gray-800', 'border-l-4', 'border-amber-500');
}

// Profile Edit Functionality
let originalProfileData = {};

function toggleEditMode() {
    const isEditing = document.getElementById('editBtn').classList.contains('hidden');
    
    if (isEditing) {
        // Cancel edit mode
        cancelEdit();
    } else {
        // Enter edit mode
        document.getElementById('editBtn').classList.add('hidden');
        document.getElementById('saveBtn').classList.remove('hidden');
        document.getElementById('cancelBtn').classList.remove('hidden');
        
        // Store original values
        originalProfileData = {
            name: document.getElementById('nameDisplay').textContent,
            phone: document.getElementById('phoneDisplay').textContent,
            email: document.getElementById('emailDisplay').textContent,
            address: document.getElementById('addressDisplay').textContent,
            country: document.getElementById('countryDisplay').textContent
        };
        
        // Show input fields
        document.querySelectorAll('[id$="Display"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id$="Input"]').forEach(el => el.classList.remove('hidden'));
    }
}

function saveProfile() {
    // Update display fields
    document.getElementById('nameDisplay').textContent = document.getElementById('nameInput').value;
    document.getElementById('phoneDisplay').textContent = document.getElementById('phoneInput').value;
    document.getElementById('emailDisplay').textContent = document.getElementById('emailInput').value;
    document.getElementById('addressDisplay').textContent = document.getElementById('addressInput').value;
    document.getElementById('countryDisplay').textContent = document.getElementById('countryInput').value;
    
    // Update sidebar
    document.getElementById('sidebar-name').textContent = document.getElementById('nameInput').value.toUpperCase();
    document.getElementById('sidebar-email').textContent = document.getElementById('emailInput').value;
    
    // Exit edit mode
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');
    
    document.querySelectorAll('[id$="Display"]').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('[id$="Input"]').forEach(el => el.classList.add('hidden'));
    
    alert('Profile updated successfully!');
}

function cancelEdit() {
    
    document.getElementById('nameInput').value = originalProfileData.name;
    document.getElementById('phoneInput').value = originalProfileData.phone;
    document.getElementById('emailInput').value = originalProfileData.email;
    document.getElementById('addressInput').value = originalProfileData.address;
    document.getElementById('countryInput').value = originalProfileData.country;
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');
    
    document.querySelectorAll('[id$="Display"]').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('[id$="Input"]').forEach(el => el.classList.add('hidden'));
}

// Booking History Pagination
document.querySelectorAll('#booking-history button').forEach(button => {
    button.addEventListener('click', function() {
        const pageText = this.textContent.trim();
        if (pageText === '1' || pageText === 'Next' || pageText === 'Previous') {
            showNotification(`Loading page ${pageText}...`, 'info');
            // In a real app, you would fetch paginated data here
        }
    });
});

// Payment History Pagination
document.querySelectorAll('#payment-history button').forEach(button => {
    button.addEventListener('click', function() {
        const pageText = this.textContent.trim();
        if (pageText === '1' || pageText === 'Next' || pageText === 'Previous') {
            showNotification(`Loading page ${pageText}...`, 'info');
            // In a real app, you would fetch paginated data here
        }
    });
});

// Feedback Form Submission
document.getElementById('feedback-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookingId = this.querySelector('input[type="text"]').value.trim();
    const rating = this.querySelector('select').value;
    const comments = this.querySelector('textarea').value.trim();
    
    if (!bookingId || !rating || !comments) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Feedback submitted successfully!', 'success');
        this.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // In a real app, you would update the feedback list here
    }, 1500);
});

// Password Change Form
document.getElementById('password-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentPass = this.querySelectorAll('input[type="password"]')[0].value;
    const newPass = this.querySelectorAll('input[type="password"]')[1].value;
    const confirmPass = this.querySelectorAll('input[type="password"]')[2].value;
    
    if (newPass !== confirmPass) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPass.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Updating...';
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Password updated successfully!', 'success');
        this.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }, 1500);
});

// Notification Preferences Form
document.getElementById('notifications-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailNotifications = this.querySelector('#email-notifications').checked;
    const smsNotifications = this.querySelector('#sms-notifications').checked;
    const promoOffers = this.querySelector('#promo-offers').checked;
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Saving...';
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Notification preferences saved!', 'success');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }, 1000);
});