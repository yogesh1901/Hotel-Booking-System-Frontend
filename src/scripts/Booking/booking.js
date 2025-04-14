// booking.js

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const roomSearchPage = document.getElementById('roomSearchPage');
    const bookingFormPage = document.getElementById('bookingFormPage');
    const confirmationPage = document.getElementById('confirmationPage');
    const backToRoomsBtn = document.getElementById('backToRoomsBtn');
    const bookAnotherBtn = document.getElementById('bookAnotherBtn');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');
    const roomsGrid = document.getElementById('roomsGrid');
    const bookingSummary = document.getElementById('bookingSummary');
    const bookingDetails = document.getElementById('bookingDetails');
    const bookingReference = document.getElementById('bookingReference');
    const bookingRoomTitle = document.getElementById('bookingRoomTitle');
    const roomCount = document.getElementById('roomCount');
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const roomSearch = document.getElementById('roomSearch');
    const searchBtn = document.getElementById('searchBtn');
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');
    const applyDatesBtn = document.getElementById('applyDatesBtn');
    
    // Current date for date inputs
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Set default dates
    checkInDate.value = formatDate(today);
    checkOutDate.value = formatDate(tomorrow);
    checkInDate.min = formatDate(today);
    checkOutDate.min = formatDate(tomorrow);
    
    // Room data
    const rooms = [
        {
            id: 1,
            name: "Standard Room",
            type: "standard",
            price: 2500,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Comfortable standard room with all basic amenities",
            amenities: ["wifi", "ac"],
            capacity: 2,
            size: "25 sqm"
        },
        {
            id: 2,
            name: "Deluxe Room",
            type: "deluxe",
            price: 4500,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Spacious deluxe room with premium amenities",
            amenities: ["wifi", "ac", "restaurant"],
            capacity: 2,
            size: "35 sqm"
        },
        {
            id: 3,
            name: "Executive Suite",
            type: "executive",
            price: 7000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Luxurious suite with separate living area",
            amenities: ["wifi", "ac", "restaurant", "spa"],
            capacity: 3,
            size: "50 sqm"
        },
        {
            id: 4,
            name: "Presidential Suite",
            type: "presidential",
            price: 12000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "The ultimate in luxury with premium services",
            amenities: ["wifi", "ac", "restaurant", "spa", "pool"],
            capacity: 4,
            size: "80 sqm"
        },
        {
            id: 5,
            name: "Standard Room - Pool View",
            type: "standard",
            price: 3000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Standard room with a beautiful pool view",
            amenities: ["wifi", "ac", "pool"],
            capacity: 2,
            size: "25 sqm"
        },
        {
            id: 6,
            name: "Single Bed Room",
            type: "standard",
            price: 3000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Standard room with a beautiful pool view",
            amenities: ["wifi", "ac", "pool"],
            capacity: 2,
            size: "25 sqm"
        },
        {
            id: 8,
            name: "Dobule Bed Room",
            type: "standard",
            price: 3000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Standard room with a beautiful pool view",
            amenities: [ "ac", "pool"],
            capacity: 2,
            size: "25 sqm"
        }
    ];
    
    // Current booking data
    let currentBooking = {
        room: null,
        checkIn: checkInDate.value,
        checkOut: checkOutDate.value,
        guestInfo: {},
        paymentInfo: {},
        reference: null
    };
    
    // Pagination variables
    const roomsPerPage = 6;
    let currentPage = 1;
    let filteredRooms = [...rooms];
    
    // Initialize the page
    function init() {
        renderRooms();
        setupEventListeners();
        updatePriceDisplay();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Price range slider
        priceRange.addEventListener('input', function() {
            updatePriceDisplay();
            filterRooms();
        });
        
        // Room type filters
        document.querySelectorAll('.room-type').forEach(checkbox => {
            checkbox.addEventListener('change', filterRooms);
        });
        
        // Amenities filters
        document.querySelectorAll('.amenity').forEach(checkbox => {
            checkbox.addEventListener('change', filterRooms);
        });
        
        // Reset filters
        resetFiltersBtn.addEventListener('click', resetFilters);
        
        // Search functionality
        searchBtn.addEventListener('click', filterRooms);
        roomSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterRooms();
            }
        });
        
        // Date apply button
        applyDatesBtn.addEventListener('click', function() {
            if (new Date(checkOutDate.value) <= new Date(checkInDate.value)) {
                alert("Check-out date must be after check-in date");
                return;
            }
            currentBooking.checkIn = checkInDate.value;
            currentBooking.checkOut = checkOutDate.value;
            filterRooms();
        });
        
        // Navigation between pages
        backToRoomsBtn.addEventListener('click', function() {
            showPage('roomSearchPage');
        });
        
        bookAnotherBtn.addEventListener('click', function() {
            showPage('roomSearchPage');
            resetFilters();
        });
        
        confirmBookingBtn.addEventListener('click', confirmBooking);
    }
    
    // Show specific page
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }
    
    // Update price display
    function updatePriceDisplay() {
        minPrice.textContent = `₹${priceRange.min}`;
        maxPrice.textContent = `₹${priceRange.value}`;
    }
    
    // Filter rooms based on selected filters
    function filterRooms() {
        const searchTerm = roomSearch.value.toLowerCase();
        const maxPriceValue = parseInt(priceRange.value);
        
        // Get selected room types
        const selectedTypes = Array.from(document.querySelectorAll('.room-type:checked')).map(el => el.value);
        
        // Get selected amenities
        const selectedAmenities = Array.from(document.querySelectorAll('.amenity:checked')).map(el => el.value);
        
        filteredRooms = rooms.filter(room => {
            // Filter by search term
            if (searchTerm && !room.name.toLowerCase().includes(searchTerm) && 
                !room.description.toLowerCase().includes(searchTerm)) {
                return false;
            }
            
            // Filter by price
            if (room.price > maxPriceValue) {
                return false;
            }
            
            // Filter by room type
            if (selectedTypes.length > 0 && !selectedTypes.includes(room.type)) {
                return false;
            }
            
            // Filter by amenities
            if (selectedAmenities.length > 0) {
                const hasAllAmenities = selectedAmenities.every(amenity => 
                    room.amenities.includes(amenity)
                );
                if (!hasAllAmenities) {
                    return false;
                }
            }
            
            return true;
        });
        
        currentPage = 1;
        renderRooms();
    }
    
    // Reset all filters
    function resetFilters() {
        // Reset price range
        priceRange.value = priceRange.max;
        updatePriceDisplay();
        
        // Uncheck all room type filters
        document.querySelectorAll('.room-type').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Uncheck all amenities filters
        document.querySelectorAll('.amenity').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear search
        roomSearch.value = '';
        
        // Reset dates to default
        checkInDate.value = formatDate(today);
        checkOutDate.value = formatDate(tomorrow);
        currentBooking.checkIn = checkInDate.value;
        currentBooking.checkOut = checkOutDate.value;
        
        // Reset filtered rooms
        filteredRooms = [...rooms];
        currentPage = 1;
        renderRooms();
    }
    
    // Render rooms to the grid
    function renderRooms() {
        roomsGrid.innerHTML = '';
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        const paginatedRooms = filteredRooms.slice(startIndex, endIndex);
        
        if (paginatedRooms.length === 0) {
            roomsGrid.innerHTML = `
                <div class="col-span-3 text-center py-10">
                    <p class="text-gray-600">No rooms found matching your criteria.</p>
                    <button id="resetFiltersBtn2" class="mt-4 bg-hotel-gold text-hotel-black px-4 py-2 rounded font-medium">
                        Reset Filters
                    </button>
                </div>
            `;
            
            document.getElementById('resetFiltersBtn2').addEventListener('click', resetFilters);
        } else {
            paginatedRooms.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow';
                roomCard.innerHTML = `
                    <img src="${room.image}" alt="${room.name}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-lg">${room.name}</h3>
                            <span class="bg-hotel-gold text-hotel-black text-xs px-2 py-1 rounded">${room.size}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">${room.description}</p>
                        <div class="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span class="text-xs text-gray-500">${room.capacity} Guests</span>
                        </div>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${room.amenities.map(amenity => `
                                <span class="text-xs bg-gray-100 px-2 py-1 rounded">${getAmenityName(amenity)}</span>
                            `).join('')}
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-hotel-black">₹${room.price.toLocaleString()}/night</span>
                            <button class="book-btn bg-hotel-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-opacity-90 transition" data-room-id="${room.id}">
                                Book Now
                            </button>
                        </div>
                    </div>
                `;
                roomsGrid.appendChild(roomCard);
            });
        }
        
        // Update room count
        roomCount.textContent = `Showing ${paginatedRooms.length} of ${filteredRooms.length} rooms`;
        
        // Render pagination
        renderPagination();
        
        // Add event listeners to book buttons
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', function() {
                const roomId = parseInt(this.getAttribute('data-room-id'));
                const room = rooms.find(r => r.id === roomId);
                startBookingProcess(room);
            });
        });
    }
    
    // Get amenity display name
    function getAmenityName(amenity) {
        const amenityNames = {
            wifi: "Free WiFi",
            ac: "Air Conditioning",
            pool: "Swimming Pool",
            restaurant: "Restaurant",
            spa: "Spa"
        };
        return amenityNames[amenity] || amenity;
    }
    
    // Render pagination controls
    function renderPagination() {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        
        const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
        
        if (totalPages <= 1) return;
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.className = `px-3 py-1 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`;
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderRooms();
            }
        });
        pagination.appendChild(prevButton);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `px-3 py-1 border-t border-b border-gray-300 ${currentPage === i ? 'bg-hotel-gold text-hotel-black' : 'bg-white text-gray-700 hover:bg-gray-50'}`;
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderRooms();
            });
            pagination.appendChild(pageButton);
        }
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.className = `px-3 py-1 rounded-r-md border border-gray-300 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`;
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderRooms();
            }
        });
        pagination.appendChild(nextButton);
    }
    
    // Start booking process for a room
    function startBookingProcess(room) {
        currentBooking.room = room;
        bookingRoomTitle.textContent = `Booking: ${room.name}`;
        
        // Update booking summary
        updateBookingSummary();
        
        // Show booking form page
        showPage('bookingFormPage');
    }
    
    // Update booking summary
    function updateBookingSummary() {
        const checkInDate = new Date(currentBooking.checkIn);
        const checkOutDate = new Date(currentBooking.checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        bookingSummary.innerHTML = `
            <div class="flex items-start mb-4">
                <img src="${currentBooking.room.image}" alt="${currentBooking.room.name}" class="w-20 h-20 object-cover rounded mr-4">
                <div>
                    <h4 class="font-semibold">${currentBooking.room.name}</h4>
                    <p class="text-sm text-gray-600">${currentBooking.room.description}</p>
                </div>
            </div>
            
            <div class="space-y-3 mb-4">
                <div class="flex justify-between">
                    <span class="text-gray-600">Check-in</span>
                    <span class="font-medium">${formatDisplayDate(currentBooking.checkIn)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Check-out</span>
                    <span class="font-medium">${formatDisplayDate(currentBooking.checkOut)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Nights</span>
                    <span class="font-medium">${nights}</span>
                </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4">
                <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Room Price (${nights} nights)</span>
                    <span class="font-medium">₹${(currentBooking.room.price * nights).toLocaleString()}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Taxes & Fees</span>
                    <span class="font-medium">₹${Math.round(currentBooking.room.price * nights * 0.18).toLocaleString()}</span>
                </div>
                <div class="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>₹${Math.round(currentBooking.room.price * nights * 1.18).toLocaleString()}</span>
                </div>
            </div>
        `;
    }
    
    // Format date for display (e.g., "15 Jan 2023")
    function formatDisplayDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Confirm booking
    function confirmBooking() {
        // Validate form
        if (!validateBookingForm()) {
            return;
        }
        
        // Collect guest information
        currentBooking.guestInfo = {
            name: document.getElementById('guestName').value,
            email: document.getElementById('guestEmail').value,
            phone: document.getElementById('guestPhone').value,
            requests: document.getElementById('specialRequests').value
        };
        
        // Collect payment information
        currentBooking.paymentInfo = {
            cardNumber: document.getElementById('cardNumber').value,
            cardExpiry: document.getElementById('cardExpiry').value,
            cardCvv: document.getElementById('cardCvv').value,
            cardName: document.getElementById('cardName').value
        };
        
        // Generate booking reference
        currentBooking.reference = 'BK' + Math.floor(100000 + Math.random() * 900000);
        bookingReference.textContent = currentBooking.reference;
        
        // Update booking details on confirmation page
        updateConfirmationDetails();
        
        // Show confirmation page
        showPage('confirmationPage');
    }
    
    // Validate booking form
    function validateBookingForm() {
        // Guest name validation
        const guestName = document.getElementById('guestName').value.trim();
        if (!guestName) {
            alert('Please enter your full name');
            return false;
        }
        
        // Email validation
        const guestEmail = document.getElementById('guestEmail').value.trim();
        if (!guestEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        // Phone validation
        const guestPhone = document.getElementById('guestPhone').value.trim();
        if (!guestPhone || !/^\d{10}$/.test(guestPhone)) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }
        
        // Card number validation
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }
        
        // Card expiry validation
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert('Please enter a valid expiry date in MM/YY format');
            return false;
        }
        
        // CVV validation
        const cardCvv = document.getElementById('cardCvv').value.trim();
        if (!cardCvv || !/^\d{3,4}$/.test(cardCvv)) {
            alert('Please enter a valid 3 or 4-digit CVV');
            return false;
        }
        
        // Card name validation
        const cardName = document.getElementById('cardName').value.trim();
        if (!cardName) {
            alert('Please enter the name on card');
            return false;
        }
        
        // Terms agreement validation
        if (!document.getElementById('termsAgreement').checked) {
            alert('Please agree to the Terms and Conditions and Privacy Policy');
            return false;
        }
        
        return true;
    }
    
    // Update confirmation details
    function updateConfirmationDetails() {
        const checkInDate = new Date(currentBooking.checkIn);
        const checkOutDate = new Date(currentBooking.checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        bookingDetails.innerHTML = `
            <div>
                <p class="text-sm text-gray-600">Guest Name</p>
                <p class="font-medium">${currentBooking.guestInfo.name}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Email</p>
                <p class="font-medium">${currentBooking.guestInfo.email}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Phone</p>
                <p class="font-medium">${currentBooking.guestInfo.phone}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Room Type</p>
                <p class="font-medium">${currentBooking.room.name}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Check-in</p>
                <p class="font-medium">${formatDisplayDate(currentBooking.checkIn)}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Check-out</p>
                <p class="font-medium">${formatDisplayDate(currentBooking.checkOut)}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Nights</p>
                <p class="font-medium">${nights}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600">Total Amount</p>
                <p class="font-medium">₹${Math.round(currentBooking.room.price * nights * 1.18).toLocaleString()}</p>
            </div>
        `;
    }
    init();
});