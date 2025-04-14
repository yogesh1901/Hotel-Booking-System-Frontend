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

    // ========== CUSTOMER DATA MANAGEMENT ==========
    // Sample customer data with additional fields
    let customers = {
        'C101': {
            id: 'C101',
            firstName: 'Yogeshwaran',
            lastName: 'R',
            email: 'yogesh@email.com',
            phone: '+1234567890',
            status: 'Active',
            bookings: 5,
            joinDate: '2023-01-15'
        },
        'C102': {
            id: 'C102',
            firstName: 'Gogul',
            lastName: '',
            email: 'gogul@email.com',
            phone: '+1234567890',
            status: 'Blocked',
            bookings: 3,
            joinDate: '2023-02-20'
        },
        'C103': {
            id: 'C103',
            firstName: 'Priya',
            lastName: '',
            email: 'priya@email.com',
            phone: '+9876543210',
            status: 'Active',
            bookings: 2,
            joinDate: '2023-03-10'
        },
        'C104': {
            id: 'C104',
            firstName: 'Rahul',
            lastName: '',
            email: 'rahul@email.com',
            phone: '+1122334455',
            status: 'Active',
            bookings: 4,
            joinDate: '2023-01-25'
        }
    };

    // ========== MODAL FUNCTIONALITY ==========
    const customerModal = document.getElementById('customerModal');
    const modalTitle = document.getElementById('modalTitle');
    const customerForm = document.getElementById('customerForm');
    const closeBtns = document.querySelectorAll('.close-btn, #cancelCustomer');
    const tableBody = document.querySelector('tbody');

    // Add data-id attributes to rows for easier selection
    document.querySelectorAll('tbody tr').forEach(row => {
        const id = row.cells[0].textContent;
        row.setAttribute('data-id', id);
    });

    // ========== CUSTOMER OPERATIONS ==========
    // Add customer button
    document.getElementById('addCustomerBtn').addEventListener('click', function() {
        modalTitle.textContent = 'Add New Customer';
        customerForm.reset();
        document.getElementById('customerId').value = '';
        customerModal.style.display = 'block';
    });

    // Edit customer buttons
    document.querySelectorAll('.edit-customer').forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const customer = customers[customerId];
            
            modalTitle.textContent = 'Edit Customer';
            document.getElementById('customerId').value = customerId;
            document.getElementById('firstName').value = customer.firstName;
            document.getElementById('lastName').value = customer.lastName;
            document.getElementById('email').value = customer.email;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('status').value = customer.status;
            
            customerModal.style.display = 'block';
        });
    });

    // Block/Unblock customer buttons
    document.querySelectorAll('.block-customer, .unblock-customer').forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const row = this.closest('tr');
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            const isBlocking = this.classList.contains('block-customer');
            const action = isBlocking ? 'block' : 'unblock';
            
            if (confirm(`Are you sure you want to ${action} ${customerName}?`)) {
                // Update customer status
                customers[customerId].status = isBlocking ? 'Blocked' : 'Active';
                
                // Update the row in the table
                updateCustomerRow(customerId, customers[customerId]);
                
                alert(`Customer ${customerName} has been ${action}ed successfully!`);
            }
        });
    });

    // Delete customer buttons
    document.querySelectorAll('.delete-customer').forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const row = this.closest('tr');
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone.`)) {
                // Remove customer from data
                delete customers[customerId];
                
                // Remove row from table
                row.remove();
                
                // Update results count
                updateResultsCount();
                
                alert(`Customer ${customerName} has been deleted successfully!`);
            }
        });
    });

    // ========== FORM HANDLING ==========
    // Form submission
    customerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerId = document.getElementById('customerId').value;
        const isEdit = customerId !== '';
        
        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            status: document.getElementById('status').value,
            bookings: isEdit ? customers[customerId]?.bookings || 0 : 0,
            joinDate: isEdit ? customers[customerId]?.joinDate || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        };

        if (isEdit) {
            // Update existing customer
            customers[customerId] = { ...customers[customerId], ...formData };
            updateCustomerRow(customerId, customers[customerId]);
        } else {
            // Add new customer
            const newId = 'C' + (Object.keys(customers).length + 101);
            customers[newId] = { id: newId, ...formData };
            addCustomerRow(customers[newId]);
        }
        
        // Show success message
        alert(`Customer ${isEdit ? 'updated' : 'added'} successfully!`);
        customerModal.style.display = 'none';
    });

    // ========== TABLE OPERATIONS ==========
    // Update a customer row in the table
    function updateCustomerRow(customerId, customerData) {
        const row = document.querySelector(`tr[data-id="${customerId}"]`);
        if (row) {
            // Update basic information
            row.cells[1].textContent = `${customerData.firstName} ${customerData.lastName}`.trim();
            row.cells[2].textContent = customerData.email;
            row.cells[3].textContent = customerData.phone;
            row.cells[5].textContent = customerData.bookings;
            
            // Update status cell
            const statusCell = row.cells[4];
            statusCell.innerHTML = '';
            const statusSpan = document.createElement('span');
            statusSpan.className = `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full status-${customerData.status.toLowerCase()}`;
            statusSpan.textContent = customerData.status;
            statusCell.appendChild(statusSpan);
            
            // Update action buttons based on status
            const actionsCell = row.cells[6];
            actionsCell.innerHTML = `
                <button class="text-blue-600 hover:text-blue-900 edit-customer" data-id="${customerId}">Edit</button>
                ${customerData.status === 'Active' ? 
                    `<button class="text-yellow-600 hover:text-yellow-900 block-customer" data-id="${customerId}">Block</button>` : 
                    `<button class="text-green-600 hover:text-green-900 unblock-customer" data-id="${customerId}">Unblock</button>`}
                <button class="text-red-600 hover:text-red-900 delete-customer" data-id="${customerId}">Delete</button>
            `;
            
            // Reattach event listeners to new buttons
            attachRowEventListeners(row);
        }
    }

    // Add a new customer row to the table
    function addCustomerRow(customerData) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', customerData.id);
        newRow.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${customerData.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${customerData.firstName} ${customerData.lastName}</td>
            <td class="px-6 py-4 whitespace-nowrap">${customerData.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">${customerData.phone}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full status-${customerData.status.toLowerCase()}">
                    ${customerData.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">${customerData.bookings}</td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2">
                <button class="text-blue-600 hover:text-blue-900 edit-customer" data-id="${customerData.id}">Edit</button>
                ${customerData.status === 'Active' ? 
                    '<button class="text-yellow-600 hover:text-yellow-900 block-customer" data-id="${customerData.id}">Block</button>' : 
                    '<button class="text-green-600 hover:text-green-900 unblock-customer" data-id="${customerData.id}">Unblock</button>'}
                <button class="text-red-600 hover:text-red-900 delete-customer" data-id="${customerData.id}">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(newRow);
        attachRowEventListeners(newRow);
        updateResultsCount();
    }

    // Attach event listeners to row buttons
    function attachRowEventListeners(row) {
        row.querySelector('.edit-customer')?.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const customer = customers[customerId];
            
            modalTitle.textContent = 'Edit Customer';
            document.getElementById('customerId').value = customerId;
            document.getElementById('firstName').value = customer.firstName;
            document.getElementById('lastName').value = customer.lastName;
            document.getElementById('email').value = customer.email;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('status').value = customer.status;
            
            customerModal.style.display = 'block';
        });
        
        row.querySelector('.block-customer')?.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Are you sure you want to block ${customerName}?`)) {
                customers[customerId].status = 'Blocked';
                updateCustomerRow(customerId, customers[customerId]);
                alert(`Customer ${customerName} has been blocked successfully!`);
            }
        });
        
        row.querySelector('.unblock-customer')?.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Are you sure you want to unblock ${customerName}?`)) {
                customers[customerId].status = 'Active';
                updateCustomerRow(customerId, customers[customerId]);
                alert(`Customer ${customerName} has been unblocked successfully!`);
            }
        });
        
        row.querySelector('.delete-customer')?.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            const customerName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Are you sure you want to delete ${customerName}? This action cannot be undone.`)) {
                delete customers[customerId];
                row.remove();
                updateResultsCount();
                alert(`Customer ${customerName} has been deleted successfully!`);
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
            const id = row.cells[0].textContent.toLowerCase();
            const name = row.cells[1].textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            const phone = row.cells[3].textContent.toLowerCase();
            const status = row.cells[4].textContent.toLowerCase();
            
            if (id.includes(searchTerm) || 
                name.includes(searchTerm) || 
                email.includes(searchTerm) || 
                phone.includes(searchTerm) || 
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
        const totalRows = Object.keys(customers).length;
        const actualVisibleCount = visibleCount !== undefined ? visibleCount : totalRows;
        
        document.querySelector('.text-sm.text-gray-700').innerHTML = `
            Showing <span class="font-medium">1</span> to <span class="font-medium">${actualVisibleCount}</span> of <span class="font-medium">${totalRows}</span> results
        `;
    }

    // ========== MODAL CLOSE HANDLERS ==========
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            customerModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === customerModal) {
            customerModal.style.display = 'none';
        }
    });

    // Initialize results count
    updateResultsCount();
});