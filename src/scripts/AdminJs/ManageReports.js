document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    sidebarToggle.addEventListener('click', function() {
        mobileSidebar.classList.remove('-translate-x-full');
    });
    
    closeSidebar.addEventListener('click', function() {
        mobileSidebar.classList.add('-translate-x-full');
    });
    
    // Report modals
    const generateReportModal = document.getElementById('generateReportModal');
    const viewReportModal = document.getElementById('viewReportModal');
    const closeBtns = document.querySelectorAll('.close-btn, #cancelReport, #closeViewReport');
    
    // Sample report data
    const reports = {
        'R101': {
            id: 'R101',
            type: 'Financial Report',
            dateRange: '01-03-2025 to 31-03-2025',
            generated: '25-03-2025',
            content: `
                <div class="report-content">
                    <h3 class="text-lg font-bold mb-4">Financial Summary - March 2025</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-green-800 mb-2">Revenue</h4>
                            <p class="text-2xl font-bold text-green-600">$85,420</p>
                            <p class="text-sm text-green-700">+12% from last month</p>
                        </div>
                        <div class="bg-red-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-red-800 mb-2">Expenses</h4>
                            <p class="text-2xl font-bold text-red-600">$42,150</p>
                            <p class="text-sm text-red-700">+5% from last month</p>
                        </div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg mb-6">
                        <h4 class="font-semibold text-blue-800 mb-2">Net Profit</h4>
                        <p class="text-3xl font-bold text-blue-600">$43,270</p>
                        <p class="text-sm text-blue-700">+18% from last month</p>
                    </div>
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2">Revenue Breakdown</h4>
                        <ul class="space-y-2">
                            <li class="flex justify-between"><span>Room Bookings:</span> <span>$68,340</span></li>
                            <li class="flex justify-between"><span>Restaurant:</span> <span>$12,450</span></li>
                            <li class="flex justify-between"><span>Spa Services:</span> <span>$4,630</span></li>
                        </ul>
                    </div>
                </div>
            `
        },
        'R102': {
            id: 'R102',
            type: 'Occupancy Report',
            dateRange: '01-03-2025 to 31-03-2025',
            generated: '20-03-2025',
            content: `
                <div class="report-content">
                    <h3 class="text-lg font-bold mb-4">Occupancy Summary - March 2025</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-indigo-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-indigo-800 mb-2">Total Rooms</h4>
                            <p class="text-2xl font-bold text-indigo-600">120</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-purple-800 mb-2">Occupancy Rate</h4>
                            <p class="text-2xl font-bold text-purple-600">81.67%</p>
                            <p class="text-sm text-purple-700">+3.2% from last month</p>
                        </div>
                    </div>
                    <div class="mb-6">
                        <h4 class="font-semibold mb-2">Room Type Breakdown</h4>
                        <ul class="space-y-2">
                            <li class="flex justify-between"><span>Standard Rooms:</span> <span>92% occupied</span></li>
                            <li class="flex justify-between"><span>Deluxe Rooms:</span> <span>78% occupied</span></li>
                            <li class="flex justify-between"><span>Suites:</span> <span>65% occupied</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2">Peak Days</h4>
                        <p>Highest occupancy on March 15 (98%) during the Business Conference event.</p>
                    </div>
                </div>
            `
        },
        'R103': {
            id: 'R103',
            type: 'Customer Feedback Report',
            dateRange: '01-03-2025 to 31-03-2025',
            generated: '15-03-2025',
            content: `
                <div class="report-content">
                    <h3 class="text-lg font-bold mb-4">Customer Feedback - March 2025</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-yellow-800 mb-2">Average Rating</h4>
                            <div class="flex items-center">
                                <span class="text-2xl font-bold text-yellow-600 mr-2">4.5</span>
                                <div class="flex">
                                    ${'<i class="fas fa-star text-yellow-400"></i>'.repeat(4) + '<i class="fas fa-star-half-alt text-yellow-400"></i>'}
                                </div>
                            </div>
                            <p class="text-sm text-yellow-700">out of 5.0</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-blue-800 mb-2">Feedback Count</h4>
                            <p class="text-2xl font-bold text-blue-600">142</p>
                            <p class="text-sm text-blue-700">responses</p>
                        </div>
                    </div>
                    <div class="mb-6">
                        <h4 class="font-semibold mb-2">Feedback Sentiment</h4>
                        <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                            <div class="bg-green-600 h-4 rounded-full" style="width: 87%"></div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Positive: 87%</span>
                            <span>Negative: 13%</span>
                        </div>
                    </div>
                    
                </div>
            `
        }
    };

    // Generate report button
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        generateReportModal.style.display = 'block';
    });

    // View report buttons
    document.querySelectorAll('.view-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            const report = reports[reportId];
            
            if (report) {
                document.getElementById('viewReportTitle').textContent = report.type;
                document.getElementById('viewReportDateRange').textContent = report.dateRange;
                document.getElementById('viewReportGenerated').textContent = report.generated;
                document.getElementById('reportPreview').innerHTML = report.content;
                
                viewReportModal.style.display = 'block';
            } else {
                alert('Report not found!');
            }
        });
    });

    // Download report buttons
    document.querySelectorAll('.download-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            const report = reports[reportId];
            
            if (report) {
                // Create a blob with the report content
                const blob = new Blob([`Report ID: ${report.id}\nType: ${report.type}\nDate Range: ${report.dateRange}\nGenerated: ${report.generated}\n\nContent:\n${report.content.replace(/<[^>]*>/g, '')}`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                // Create a temporary anchor element to trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = `${report.type.replace(/\s+/g, '_')}_${reportId}.txt`;
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
                
                // Show notification
                showNotification(`Downloading ${report.type} (${reportId})...`, 'success');
            } else {
                showNotification('Report not found!', 'error');
            }
        });
    });

    // Delete report buttons
    document.querySelectorAll('.delete-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            const report = reports[reportId];
            
            if (report) {
                if (confirm(`Are you sure you want to delete ${report.type} (${reportId})? This action cannot be undone.`)) {
                    // In a real app, you would make an API call here
                    // For demo, we'll just show a message
                    showNotification(`${report.type} has been deleted successfully!`, 'success');
                    
                    // In a real app, you would remove the row from the table
                    // this.closest('tr').remove();
                }
            } else {
                showNotification('Report not found!', 'error');
            }
        });
    });

    // Print report buttons
    document.querySelectorAll('.print-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id');
            const report = reports[reportId];
            
            if (report) {
                // Create printable content with proper styling
                const printContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${report.type}</title>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .report-header { border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
                            h1 { color: #2d3748; margin: 0; }
                            .report-details { display: flex; justify-content: space-between; margin-bottom: 20px; }
                            .report-content { margin-top: 20px; }
                            .print-footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 0.9em; color: #666; }
                        </style>
                    </head>
                    <body>
                        <div class="report-header">
                            <h1>${report.type}</h1>
                        </div>
                        <div class="report-details">
                            <p><strong>Date Range:</strong> ${report.dateRange}</p>
                            <p><strong>Generated On:</strong> ${report.generated}</p>
                        </div>
                        <div class="report-content">${report.content}</div>
                        <p class="print-footer">Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                    </body>
                    </html>
                `;

                // Open print window
                const printWindow = window.open('', '_blank');
                printWindow.document.write(printContent);
                printWindow.document.close();
                
                // Wait for content to load before printing
                printWindow.onload = function() {
                    setTimeout(() => {
                        printWindow.focus();
                        printWindow.print();
                        // printWindow.close(); // Don't close immediately to allow user to cancel
                    }, 500);
                };
            } else {
                showNotification('Report not found!', 'error');
            }
        });
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            generateReportModal.style.display = 'none';
            viewReportModal.style.display = 'none';
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target === generateReportModal) {
            generateReportModal.style.display = 'none';
        }
        if (event.target === viewReportModal) {
            viewReportModal.style.display = 'none';
        }
    });
    
    // Form submission
    document.getElementById('reportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reportType = document.getElementById('reportType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const format = document.getElementById('reportFormat').value;
        
        if (!reportType || !startDate || !endDate) {
            showNotification('Please fill all required fields!', 'error');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            showNotification('End date must be after start date!', 'error');
            return;
        }
        
        // Simulate report generation
        showNotification(`Generating ${reportType} for ${startDate} to ${endDate} in ${format} format...`, 'success');
        
        // In a real app, you would send this data to your backend
        console.log('Generating report:', { reportType, startDate, endDate, format });
        
        // Reset form and close modal
        this.reset();
        generateReportModal.style.display = 'none';
        
        // Simulate adding a new report to the table (in a real app, this would come from the server)
        setTimeout(() => {
            const newReportId = 'R' + (Math.floor(Math.random() * 900) + 100);
            const newReport = {
                id: newReportId,
                type: reportType + ' Report',
                dateRange: `${formatDate(startDate)} to ${formatDate(endDate)}`,
                generated: formatDate(new Date()),
                content: `<p>This is a newly generated ${reportType.toLowerCase()} report for ${formatDate(startDate)} to ${formatDate(endDate)}.</p>`
            };
            
            // Add to our reports object
            reports[newReportId] = newReport;
            
            // Add to the table
            const tbody = document.querySelector('tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${newReportId}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="report-type ${getReportTypeClass(reportType)}">${newReport.type}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">${newReport.dateRange}</td>
                <td class="px-6 py-4 whitespace-nowrap">${newReport.generated}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                    <button class="text-blue-600 hover:text-blue-900 view-report" data-id="${newReportId}">View</button>
                    <button class="text-green-600 hover:text-green-900 download-report" data-id="${newReportId}">Download</button>
                    <button class="text-red-600 hover:text-red-900 delete-report" data-id="${newReportId}">Delete</button>
                    <button class="text-purple-600 hover:text-purple-900 print-report" data-id="${newReportId}">
                        <i class="fas fa-print mr-1"></i> Print
                    </button>
                </td>
            `;
            tbody.prepend(newRow);
            
            // Add event listeners to the new buttons
            addReportEventListeners(newRow, newReportId);
            
            showNotification('Report generated successfully!', 'success');
        }, 1500);
    });
    
    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const id = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const type = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const dateRange = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (id.includes(searchTerm) || type.includes(searchTerm) || dateRange.includes(searchTerm)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Update showing count
        const showingCount = document.querySelector('.text-sm.text-gray-700');
        if (showingCount) {
            showingCount.innerHTML = showingCount.innerHTML.replace(
                /Showing <span class="font-medium">\d+<\/span> to <span class="font-medium">\d+<\/span> of <span class="font-medium">\d+<\/span>/,
                `Showing <span class="font-medium">1</span> to <span class="font-medium">${visibleCount}</span> of <span class="font-medium">${visibleCount}</span>`
            );
        }
    });
    
    // Helper function to add event listeners to report buttons
    function addReportEventListeners(row, reportId) {
        row.querySelector('.view-report').addEventListener('click', function() {
            const report = reports[reportId];
            
            document.getElementById('viewReportTitle').textContent = report.type;
            document.getElementById('viewReportDateRange').textContent = report.dateRange;
            document.getElementById('viewReportGenerated').textContent = report.generated;
            document.getElementById('reportPreview').innerHTML = report.content;
            
            viewReportModal.style.display = 'block';
        });
        
        row.querySelector('.download-report').addEventListener('click', function() {
            const report = reports[reportId];
            const blob = new Blob([`Report ID: ${report.id}\nType: ${report.type}\nDate Range: ${report.dateRange}\nGenerated: ${report.generated}\n\nContent:\n${report.content.replace(/<[^>]*>/g, '')}`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${report.type.replace(/\s+/g, '_')}_${reportId}.txt`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            showNotification(`Downloading ${report.type} (${reportId})...`, 'success');
        });
        
        row.querySelector('.delete-report').addEventListener('click', function() {
            const report = reports[reportId];
            if (confirm(`Are you sure you want to delete ${report.type} (${reportId})?`)) {
                row.remove();
                delete reports[reportId];
                showNotification(`${report.type} deleted successfully`, 'success');
            }
        });
        
        row.querySelector('.print-report').addEventListener('click', function() {
            const report = reports[reportId];
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${report.type}</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .report-header { border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
                        h1 { color: #2d3748; margin: 0; }
                        .report-details { display: flex; justify-content: space-between; margin-bottom: 20px; }
                        .report-content { margin-top: 20px; }
                        .print-footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 0.9em; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="report-header">
                        <h1>${report.type}</h1>
                    </div>
                    <div class="report-details">
                        <p><strong>Date Range:</strong> ${report.dateRange}</p>
                        <p><strong>Generated On:</strong> ${report.generated}</p>
                    </div>
                    <div class="report-content">${report.content}</div>
                    <p class="print-footer">Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                </body>
                </html>
            `;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.onload = function() {
                setTimeout(() => {
                    printWindow.focus();
                    printWindow.print();
                }, 500);
            };
        });
    }
    
    // Helper function to format date as DD-MM-YYYY
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    // Helper function to get CSS class for report type
    function getReportTypeClass(type) {
        switch(type.toLowerCase()) {
            case 'financial': return 'financial-report';
            case 'occupancy': return 'occupancy-report';
            case 'feedback': return 'feedback-report';
            default: return 'financial-report';
        }
    }
    
    // Helper function to show notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Initialize date inputs with default values
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    document.getElementById('startDate').valueAsDate = firstDayOfMonth;
    document.getElementById('endDate').valueAsDate = today;
});