document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const editModal = document.getElementById('editModal');
    const viewModal = document.getElementById('viewModal');
    const closeBtns = document.querySelectorAll('.close-btn, #cancelEdit, #closeView');
    const tableBody = document.querySelector('tbody');
    const searchInput = document.querySelector('input[type="text"]');
    const searchIcon = document.querySelector('.fa-search');
    
    // Sample data - in a real app, this would come from your backend
    let bookings = {
        '12': {
            id: '12',
            customer: 'Yogesh',
            room: 'Suite',
            checkIn: '2025-03-25',
            checkOut: '2025-03-25',
            status: 'Confirmed'
        },
        '11': {
            id: '11',
            customer: 'Rahul',
            room: 'Deluxe',
            checkIn: '2025-03-24',
            checkOut: '2025-03-26',
            status: 'Confirmed'
        },
        '10': {
            id: '10',
            customer: 'Priya',
            room: 'Standard',
            checkIn: '2025-03-23',
            checkOut: '2025-03-25',
            status: 'Pending'
        },
        '9': {
            id: '9',
            customer: 'Ankit',
            room: 'Deluxe',
            checkIn: '2025-03-22',
            checkOut: '2025-03-24',
            status: 'Cancelled'
        }
    };
    
    // Function to update the table row
    function updateTableRow(bookingId, updatedData) {
        const row = document.querySelector(`tr[data-id="${bookingId}"]`);
        if (row) {
            row.cells[1].textContent = updatedData.customer;
            row.cells[2].textContent = updatedData.room;
            row.cells[3].textContent = formatDate(updatedData.checkIn);
            row.cells[4].textContent = formatDate(updatedData.checkOut);
            
            // Update status with proper styling
            const statusCell = row.cells[5];
            statusCell.innerHTML = '';
            const statusSpan = document.createElement('span');
            statusSpan.className = `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full status-${updatedData.status.toLowerCase()}`;
            statusSpan.textContent = updatedData.status;
            statusCell.appendChild(statusSpan);
        }
    }
    
    // Function to delete table row
    function deleteTableRow(bookingId) {
        const row = document.querySelector(`tr[data-id="${bookingId}"]`);
        if (row) {
            row.remove();
            delete bookings[bookingId];
            updateResultsCount();
        }
    }
    
    // Format date from YYYY-MM-DD to DD-MM-YY
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year.slice(-2)}`;
    }
    
    // Update results count display
    function updateResultsCount() {
        const visibleRows = tableBody.querySelectorAll('tr:not([style*="display: none"])');
        document.querySelector('.text-sm.text-gray-700').innerHTML = `
            Showing <span class="font-medium">1</span> to <span class="font-medium">${visibleRows.length}</span> of <span class="font-medium">${visibleRows.length}</span> results
        `;
    }
    
    // Add data-id attributes to rows for easier selection
    document.querySelectorAll('tbody tr').forEach(row => {
        const id = row.cells[0].textContent.replace('#', '');
        row.setAttribute('data-id', id);
    });
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const id = row.cells[0].textContent.toLowerCase();
            const customer = row.cells[1].textContent.toLowerCase();
            const room = row.cells[2].textContent.toLowerCase();
            const checkIn = row.cells[3].textContent.toLowerCase();
            const checkOut = row.cells[4].textContent.toLowerCase();
            const status = row.cells[5].textContent.toLowerCase();
            
            if (id.includes(searchTerm) || 
                customer.includes(searchTerm) || 
                room.includes(searchTerm) || 
                checkIn.includes(searchTerm) || 
                checkOut.includes(searchTerm) || 
                status.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        updateResultsCount();
    }
    
    // Event listeners for search
    searchInput.addEventListener('keyup', performSearch);
    searchIcon.addEventListener('click', performSearch);
    
    // Edit button functionality
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            const booking = bookings[bookingId];
            
            document.getElementById('editBookingId').textContent = bookingId;
            document.getElementById('editCustomer').value = booking.customer;
            document.getElementById('editRoom').value = booking.room;
            document.getElementById('editCheckIn').value = booking.checkIn;
            document.getElementById('editCheckOut').value = booking.checkOut;
            document.getElementById('editStatus').value = booking.status;
            
            editModal.style.display = 'block';
        });
    });
    
    // View button functionality
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            const booking = bookings[bookingId];
            
            document.getElementById('viewBookingId').textContent = bookingId;
            document.getElementById('viewCustomer').textContent = booking.customer;
            document.getElementById('viewRoom').textContent = booking.room;
            document.getElementById('viewCheckIn').textContent = formatDate(booking.checkIn);
            document.getElementById('viewCheckOut').textContent = formatDate(booking.checkOut);
            document.getElementById('viewStatus').textContent = booking.status;
            
            viewModal.style.display = 'block';
        });
    });
    
    // Delete button functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            if (confirm(`Are you sure you want to delete booking #${bookingId}?`)) {
                // In a real app, you would make an API call to delete the booking
                deleteTableRow(bookingId);
            }
        });
    });
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            editModal.style.display = 'none';
            viewModal.style.display = 'none';
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
        if (event.target === viewModal) {
            viewModal.style.display = 'none';
        }
    });
    
    // Form submission
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const bookingId = document.getElementById('editBookingId').textContent;
        
        // Get updated values
        const updatedBooking = {
            id: bookingId,
            customer: document.getElementById('editCustomer').value,
            room: document.getElementById('editRoom').value,
            checkIn: document.getElementById('editCheckIn').value,
            checkOut: document.getElementById('editCheckOut').value,
            status: document.getElementById('editStatus').value
        };
        
        // Update the bookings data
        bookings[bookingId] = updatedBooking;
        
        // Update the table row
        updateTableRow(bookingId, updatedBooking);
        
        // Close modal
        editModal.style.display = 'none';
        
        // Show success message
        alert(`Booking #${bookingId} updated successfully!`);
    });
    
    // Initialize results count
    updateResultsCount();
});