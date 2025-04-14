document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle with animation
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    sidebarToggle.addEventListener('click', function() {
        mobileSidebar.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    });
    
    closeSidebar.addEventListener('click', function() {
        mobileSidebar.classList.add('-translate-x-full');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close sidebar when clicking outside
    mobileSidebar.addEventListener('click', function(e) {
        if (e.target === mobileSidebar) {
            mobileSidebar.classList.add('-translate-x-full');
            document.body.style.overflow = '';
        }
    });

    // Content navigation functionality with smooth transitions
    const contentNavLinks = document.querySelectorAll('.content-nav-link');
    const contentForms = document.querySelectorAll('.content-form');
    
    contentNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            contentNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link with animation
            this.classList.add('active');
            
            // Get the content section to show
            const contentId = this.getAttribute('data-content');
            const targetForm = document.getElementById(`${contentId}-content`);
            
            // Hide all content forms with fade out effect
            contentForms.forEach(form => {
                if (!form.classList.contains('hidden')) {
                    form.style.opacity = '0';
                    setTimeout(() => {
                        form.classList.add('hidden');
                        form.style.opacity = '1';
                    }, 300);
                }
            });
            
            // Show the selected content form with fade in effect
            setTimeout(() => {
                targetForm.classList.remove('hidden');
                targetForm.style.opacity = '0';
                setTimeout(() => {
                    targetForm.style.opacity = '1';
                }, 10);
            }, 300);
        });
    });
    
    // Enhanced image upload preview functionality with file validation
    function setupImageUpload(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        const fileUploadDiv = input.closest('.file-upload');
        
        // Create preview image if it doesn't exist
        if (!preview.querySelector('img')) {
            preview.innerHTML = '<img src="" alt="Preview" class="max-h-40 rounded">';
        }
        
        // Handle drag and drop
        fileUploadDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadDiv.classList.add('border-blue-500', 'bg-blue-50');
        });
        
        fileUploadDiv.addEventListener('dragleave', () => {
            fileUploadDiv.classList.remove('border-blue-500', 'bg-blue-50');
        });
        
        fileUploadDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadDiv.classList.remove('border-blue-500', 'bg-blue-50');
            
            if (e.dataTransfer.files.length) {
                input.files = e.dataTransfer.files;
                handleFileSelection(input.files[0], preview);
            }
        });
        
        input.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleFileSelection(this.files[0], preview);
            }
        });
        
        function handleFileSelection(file, previewElement) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                showNotification('Please upload a valid image file (JPEG, PNG, GIF)', 'error');
                return;
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Image size must be less than 5MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewElement.querySelector('img').src = e.target.result;
                previewElement.classList.remove('hidden');
                showNotification('Image uploaded successfully!', 'success');
            }
            
            reader.onerror = function() {
                showNotification('Error reading file', 'error');
            }
            
            reader.readAsDataURL(file);
        }
    }
    
    // Set up image upload previews for all forms
    setupImageUpload('about-image', 'about-image-preview');
    setupImageUpload('features-image', 'features-image-preview');
    setupImageUpload('offers-image', 'offers-image-preview');
    setupImageUpload('types-image', 'types-image-preview');
    
    // Enhanced form submission handling with validation
    document.querySelectorAll('.content-form-data').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formId = this.id;
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Disable button during submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Saving...';
            
            try {
                // Simulate API call with delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Validate required fields
                const titleField = this.querySelector('input[type="text"], textarea');
                if (!titleField.value.trim()) {
                    throw new Error('Title is required');
                }
                
                // In a real app, you would send formData to your backend
                console.log('Form submitted:', Object.fromEntries(formData));
                
                // Show success message
                showNotification('Content saved successfully!', 'success');
                
                // You could update the UI with the new data here
                
            } catch (error) {
                showNotification(error.message || 'Error saving content', 'error');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    });
    
    // Book Now button functionality
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Book Now')) {
            button.addEventListener('click', function() {
                // Get the current form's data
                const form = this.closest('form');
                const formData = new FormData(form);
                const title = formData.get(form.querySelector('input[type="text"]').id);
                
                // In a real app, this would navigate to the booking page with parameters
                showNotification(`Redirecting to booking page for ${title}...`, 'info');
                
                // Simulate navigation delay
                setTimeout(() => {
                    // window.location.href = '/book-now?type=' + encodeURIComponent(title);
                }, 1000);
            });
        }
    });
    
    // Notification system with different types
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
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${colors[type]} flex items-center transform translate-x-full opacity-0 transition-all duration-300`;
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
        setTimeout(() => {
            notification.classList.remove('translate-x-0', 'opacity-100');
            notification.classList.add('translate-x-full', 'opacity-0');
            
            // Remove after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Allow manual dismissal
        notification.addEventListener('click', () => {
            notification.classList.remove('translate-x-0', 'opacity-100');
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }
    
    // Initialize the first content form as visible
    document.querySelector('.content-nav-link.active').click();
    
    // Add keyboard accessibility for navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileSidebar.classList.add('-translate-x-full');
            document.body.style.overflow = '';
        }
    });
    
    // Add touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX && touchStartX - touchEndX > 50) {
            // Swipe left - close sidebar
            mobileSidebar.classList.add('-translate-x-full');
            document.body.style.overflow = '';
        }
    }
});