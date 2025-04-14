document.addEventListener('DOMContentLoaded', function() {
    // ========== SIDEBAR FUNCTIONALITY ==========
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    sidebarToggle.addEventListener('click', function() {
        mobileSidebar.classList.remove('-translate-x-full');
    });
    
    closeSidebar.addEventListener('click', function() {
        mobileSidebar.classList.add('-translate-x-full');
    });

    // ========== ROOM DATA MANAGEMENT ==========
    // Sample room data with additional fields
    let rooms = {
        '101': {
            id: '101',
            type: 'Standard',
            capacity: '2 Persons',
            price: '1000',
            status: 'Available',
            amenities: ['TV', 'AC', 'WiFi'],
            floor: '1'
        },
        '102': {
            id: '102',
            type: 'Deluxe',
            capacity: '4 Persons',
            price: '4000',
            status: 'Occupied',
            amenities: ['TV', 'AC', 'WiFi', 'Minibar'],
            floor: '1'
        },
        '103': {
            id: '103',
            type: 'Suite',
            capacity: '2 Persons',
            price: '5000',
            status: 'Available',
            amenities: ['TV', 'AC', 'WiFi', 'Minibar', 'Jacuzzi'],
            floor: '1'
        },
        '201': {
            id: '201',
            type: 'Family',
            capacity: '6 Persons',
            price: '6000',
            status: 'Maintenance',
            amenities: ['TV', 'AC', 'WiFi', 'Kitchenette'],
            floor: '2'
        }
    };

    // ========== MODAL FUNCTIONALITY ==========
    const roomModal = document.getElementById('roomModal');
    const modalTitle = document.getElementById('modalTitle');
    const roomForm = document.getElementById('roomForm');
    const closeBtns = document.querySelectorAll('.close-btn, #cancelRoom');
    const tableBody = document.querySelector('tbody');

    // Add data-id attributes to rows for easier selection
    document.querySelectorAll('tbody tr').forEach(row => {
        const id = row.cells[0].textContent;
        row.setAttribute('data-id', id);
    });

    // ========== ROOM OPERATIONS ==========
    // Add room button
    document.getElementById('addRoomBtn').addEventListener('click', function() {
        modalTitle.textContent = 'Add New Room';
        roomForm.reset();
        document.getElementById('roomId').value = '';
        roomModal.style.display = 'block';
    });

    // Edit room buttons
    document.querySelectorAll('.edit-room').forEach(btn => {
        btn.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            const room = rooms[roomId];
            
            modalTitle.textContent = `Edit Room ${roomId}`;
            document.getElementById('roomId').value = roomId;
            document.getElementById('roomNumber').value = roomId;
            document.getElementById('roomType').value = room.type;
            document.getElementById('roomCapacity').value = room.capacity;
            document.getElementById('roomPrice').value = room.price;
            document.getElementById('roomStatus').value = room.status;
            
            roomModal.style.display = 'block';
        });
    });

    // Delete room buttons
    document.querySelectorAll('.delete-room').forEach(btn => {
        btn.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            const row = this.closest('tr');
            
            if (confirm(`Are you sure you want to delete Room ${roomId}? This action cannot be undone.`)) {
                // Remove room from data
                delete rooms[roomId];
                
                // Remove row from table
                row.remove();
                
                // Update results count
                updateResultsCount();
                
                alert(`Room ${roomId} has been deleted successfully!`);
            }
        });
    });

    // ========== FORM HANDLING ==========
    // Form submission
    roomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const roomId = document.getElementById('roomId').value;
        const isEdit = roomId !== '';
        const roomNumber = document.getElementById('roomNumber').value;
        
        // Collect form data
        const formData = {
            type: document.getElementById('roomType').value,
            capacity: document.getElementById('roomCapacity').value,
            price: document.getElementById('roomPrice').value,
            status: document.getElementById('roomStatus').value,
            amenities: isEdit ? rooms[roomId]?.amenities || [] : [],
            floor: roomNumber.charAt(0) // First digit of room number
        };

        if (isEdit) {
            // Update existing room
            rooms[roomId] = { ...rooms[roomId], ...formData };
            updateRoomRow(roomId, rooms[roomId]);
        } else {
            // Add new room
            if (rooms[roomNumber]) {
                alert('Room with this number already exists!');
                return;
            }
            
            rooms[roomNumber] = { id: roomNumber, ...formData };
            addRoomRow(rooms[roomNumber]);
        }
        
        // Show success message
        alert(`Room ${isEdit ? 'updated' : 'added'} successfully!`);
        roomModal.style.display = 'none';
    });

    // ========== TABLE OPERATIONS ==========
    // Update a room row in the table
    function updateRoomRow(roomId, roomData) {
        const row = document.querySelector(`tr[data-id="${roomId}"]`);
        if (row) {
            // Update basic information
            row.cells[1].textContent = roomData.type;
            row.cells[2].textContent = roomData.capacity;
            row.cells[3].textContent = `₹${roomData.price}/night`;
            
            // Update status cell
            const statusCell = row.cells[4];
            statusCell.innerHTML = '';
            const statusSpan = document.createElement('span');
            statusSpan.className = `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full status-${roomData.status.toLowerCase()}`;
            statusSpan.textContent = roomData.status;
            statusCell.appendChild(statusSpan);
        }
    }

    // Add a new room row to the table
    function addRoomRow(roomData) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', roomData.id);
        newRow.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${roomData.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${roomData.type}</td>
            <td class="px-6 py-4 whitespace-nowrap">${roomData.capacity}</td>
            <td class="px-6 py-4 whitespace-nowrap">₹${roomData.price}/night</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full status-${roomData.status.toLowerCase()}">
                    ${roomData.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2 action-buttons">
                <button class="text-blue-600 hover:text-blue-900 edit-room" data-id="${roomData.id}">
                    <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button class="text-red-600 hover:text-red-900 delete-room" data-id="${roomData.id}">
                    <i class="fas fa-trash mr-1"></i> Delete
                </button>
            </td>
        `;
        
        tableBody.appendChild(newRow);
        attachRowEventListeners(newRow);
        updateResultsCount();
    }

    // Attach event listeners to row buttons
    function attachRowEventListeners(row) {
        row.querySelector('.edit-room')?.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            const room = rooms[roomId];
            
            modalTitle.textContent = `Edit Room ${roomId}`;
            document.getElementById('roomId').value = roomId;
            document.getElementById('roomNumber').value = roomId;
            document.getElementById('roomType').value = room.type;
            document.getElementById('roomCapacity').value = room.capacity;
            document.getElementById('roomPrice').value = room.price;
            document.getElementById('roomStatus').value = room.status;
            
            roomModal.style.display = 'block';
        });
        
        row.querySelector('.delete-room')?.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            
            if (confirm(`Are you sure you want to delete Room ${roomId}? This action cannot be undone.`)) {
                delete rooms[roomId];
                row.remove();
                updateResultsCount();
                alert(`Room ${roomId} has been deleted successfully!`);
            }
        });
    }

    // ========== SEARCH FUNCTIONALITY ==========
    const searchInput = document.querySelector('input[type="text"]');
    const searchIcon = document.querySelector('.fa-search');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const roomNumber = row.cells[0].textContent.toLowerCase();
            const roomType = row.cells[1].textContent.toLowerCase();
            const capacity = row.cells[2].textContent.toLowerCase();
            const price = row.cells[3].textContent.toLowerCase();
            const status = row.cells[4].textContent.toLowerCase();
            
            if (roomNumber.includes(searchTerm) || 
                roomType.includes(searchTerm) || 
                capacity.includes(searchTerm) || 
                price.includes(searchTerm) || 
                status.includes(searchTerm)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        updateResultsCount(visibleCount);
    }
    
    searchInput.addEventListener('input', performSearch);
    searchIcon.addEventListener('click', performSearch);

    // ========== PAGINATION & RESULTS COUNT ==========
    function updateResultsCount(visibleCount) {
        const totalRooms = Object.keys(rooms).length;
        const actualVisibleCount = visibleCount !== undefined ? visibleCount : totalRooms;
        
        document.querySelector('.text-sm.text-gray-700').innerHTML = `
            Showing <span class="font-medium">1</span> to <span class="font-medium">${actualVisibleCount}</span> of <span class="font-medium">${totalRooms}</span> results
        `;
    }

    // ========== MODAL CLOSE HANDLERS ==========
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            roomModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === roomModal) {
            roomModal.style.display = 'none';
        }
    });

    // Initialize results count
    updateResultsCount();
});