// admin-feedback.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    sidebarToggle.addEventListener('click', function() {
        mobileSidebar.classList.remove('-translate-x-full');
    });
    
    closeSidebar.addEventListener('click', function() {
        mobileSidebar.classList.add('-translate-x-full');
    });

    // Highlight active navigation link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('bg-blue-700'));
            this.classList.add('bg-blue-700');
        });
    });

    // Feedback table functionality
    const feedbackTable = document.querySelector('table');
    const respondButtons = document.querySelectorAll('.respond-feedback');
    const blockButtons = document.querySelectorAll('.block-user');
    const deleteButtons = document.querySelectorAll('.delete-feedback');

    // Respond to feedback
    respondButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const bookingId = row.querySelector('td:first-child').textContent;
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            const response = prompt(`Enter your response to ${customerName}'s feedback (Booking ID: ${bookingId}):`);
            if (response) {
                alert(`Response sent to ${customerName}: "${response}"`);
                // In a real app, you would send this to your backend
            }
        });
    });

    // Block user
    blockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Are you sure you want to block ${customerName}?`)) {
                row.style.opacity = '0.5';
                row.style.backgroundColor = '#fee2e2'; // light red
                alert(`${customerName} has been blocked.`);
                // In a real app, you would update the user status in your backend
            }
        });
    });

    // Delete feedback
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const bookingId = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to delete feedback for Booking ID ${bookingId}?`)) {
                row.remove();
                alert('Feedback deleted successfully.');
                // In a real app, you would delete the record from your backend
                updatePaginationCount();
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const searchIcon = document.querySelector('.fa-search');
    
    function searchFeedback() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = feedbackTable.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const bookingId = row.querySelector('td:first-child').textContent.toLowerCase();
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const roomNumber = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const comments = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
            
            if (bookingId.includes(searchTerm) || name.includes(searchTerm) || 
                roomNumber.includes(searchTerm) || comments.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('keyup', searchFeedback);
    searchIcon.addEventListener('click', searchFeedback);

    // Pagination functionality
    const prevPageLink = document.querySelector('a[aria-label="Previous"]');
    const nextPageLink = document.querySelector('a[aria-label="Next"]');
    const pageLinks = document.querySelectorAll('nav a[aria-label="Pagination"]:not([aria-label="Previous"], [aria-label="Next"])');
    
    let currentPage = 1;
    
    function updatePaginationCount() {
        const rows = feedbackTable.querySelectorAll('tbody tr:not([style*="display: none"])');
        const totalPages = Math.ceil(rows.length / 3); // Assuming 3 rows per page
        
        document.querySelector('.text-sm.text-gray-700').innerHTML = `
            Page <span class="font-medium">${currentPage}</span> of <span class="font-medium">${totalPages}</span>
        `;
    }
    
    function showPage(pageNumber) {
        const rows = feedbackTable.querySelectorAll('tbody tr:not([style*="display: none"])');
        const startIndex = (pageNumber - 1) * 3;
        const endIndex = startIndex + 3;
        
        rows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Update active page link
        pageLinks.forEach(link => {
            link.classList.remove('bg-blue-50', 'border-blue-500', 'text-blue-600');
            if (parseInt(link.textContent) === pageNumber) {
                link.classList.add('bg-blue-50', 'border-blue-500', 'text-blue-600');
            }
        });
        
        currentPage = pageNumber;
        updatePaginationCount();
    }
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageNumber = parseInt(this.textContent);
            showPage(pageNumber);
        });
    });
    
    prevPageLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
    
    nextPageLink.addEventListener('click', function(e) {
        e.preventDefault();
        const rows = feedbackTable.querySelectorAll('tbody tr:not([style*="display: none"])');
        const totalPages = Math.ceil(rows.length / 3);
        
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
    
    // Initialize pagination
    showPage(1);
    updatePaginationCount();

    // Logout functionality
    const logoutLink = document.querySelector('.logout-link');
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // In a real app, you would clear the session and redirect
            alert('Logged out successfully');
            window.location.href = '/login.html';
        }
    });
});