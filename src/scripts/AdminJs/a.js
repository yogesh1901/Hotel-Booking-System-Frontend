// Main Application Controller
class ContentManager {
    constructor() {
        this.currentSection = 'homepage';
        this.initElements();
        this.initEventListeners();
        this.setupFileUploads();
    }
    
    initElements() {
        // Sidebar elements
        this.mobileSidebar = document.getElementById('mobileSidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.closeSidebar = document.getElementById('closeSidebar');
        this.overlay = document.getElementById('overlay');
        
        // Content navigation
        this.contentNavLinks = document.querySelectorAll('.content-nav-link');
        this.contentForms = document.querySelectorAll('.content-form');
        this.contentSectionsList = document.getElementById('contentSectionsList');
        
        // Modals
        this.previewModal = document.getElementById('previewModal');
        this.closePreviewModal = document.getElementById('closePreviewModal');
        this.closePreview = document.getElementById('closePreview');
        
        // Toast container
        this.toastContainer = document.getElementById('toastContainer');
        
        // Other interactive elements
        this.previewBtns = document.querySelectorAll('.preview-btn');
        this.saveBtns = document.querySelectorAll('.save-btn');
        this.addAboutFeatureBtn = document.querySelector('.add-about-feature-btn');
        this.addRoomBtn = document.querySelector('.add-room-btn');
        this.addOfferBtn = document.querySelector('.add-offer-btn');
    }
    
    initEventListeners() {
        // Mobile sidebar toggle
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => this.toggleSidebar(true));
        }
        if (this.closeSidebar) {
            this.closeSidebar.addEventListener('click', () => this.toggleSidebar(false));
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.toggleSidebar(false));
        }
        
        // Content navigation
        this.contentNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showContentSection(link.getAttribute('data-content'));
            });
        });
        
        // Preview functionality
        this.previewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previewModal.classList.remove('hidden');
                this.generatePreview();
            });
        });
        
        if (this.closePreviewModal) {
            this.closePreviewModal.addEventListener('click', () => this.previewModal.classList.add('hidden'));
        }
        if (this.closePreview) {
            this.closePreview.addEventListener('click', () => this.previewModal.classList.add('hidden'));
        }
        
        // Save functionality
        this.saveBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const form = btn.closest('.content-form');
                const sectionId = form.id.replace('-content', '');
                this.saveContent(sectionId);
            });
        });
        
        // Add about feature
        if (this.addAboutFeatureBtn) {
            this.addAboutFeatureBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addNewAboutFeature();
            });
        }
        
        // Add room
        if (this.addRoomBtn) {
            this.addRoomBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addNewRoom();
            });
        }
        
        // Add offer
        if (this.addOfferBtn) {
            this.addOfferBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addNewOffer();
            });
        }
        
        // Remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-feature')) {
                e.preventDefault();
                e.target.closest('.feature-item, .about-feature-item').remove();
            }
            
            if (e.target.closest('.remove-room')) {
                e.preventDefault();
                e.target.closest('.room-item').remove();
            }
            
            if (e.target.closest('.remove-offer')) {
                e.preventDefault();
                e.target.closest('.offer-item').remove();
            }
            
            if (e.target.closest('.remove-room-image')) {
                e.preventDefault();
                e.target.closest('.relative').remove();
                this.updateRoomImageUploadButtons(e.target.closest('.room-images-container'));
            }
            
            if (e.target.closest('.remove-offer-image')) {
                e.preventDefault();
                e.target.closest('.offer-image-preview').remove();
            }
            
            if (e.target.closest('.remove-gallery-image')) {
                e.preventDefault();
                e.target.closest('.gallery-image-item').remove();
                this.updateGalleryUploadButton();
            }
        });
    }
    
    toggleSidebar(show) {
        if (show) {
            this.mobileSidebar.classList.remove('-translate-x-full');
            this.overlay.classList.add('open');
        } else {
            this.mobileSidebar.classList.add('-translate-x-full');
            this.overlay.classList.remove('open');
        }
    }
    
    showContentSection(sectionId) {
        // Update active nav link
        this.contentNavLinks.forEach(link => {
            if (link.getAttribute('data-content') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Show the corresponding content form
        this.contentForms.forEach(form => {
            if (form.id === `${sectionId}-content`) {
                form.classList.add('active');
            } else {
                form.classList.remove('active');
            }
        });
        
        this.currentSection = sectionId;
    }
    
    setupFileUploads() {
        // Hero image upload
        const heroImageInput = document.getElementById('hero-image');
        const heroImagePreview = document.getElementById('hero-image-preview');
        if (heroImageInput && heroImagePreview) {
            const heroImagePreviewImg = heroImagePreview.querySelector('img');
            const removeHeroImageBtn = heroImagePreview.querySelector('.remove-image');
            
            heroImageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        heroImagePreviewImg.src = event.target.result;
                        heroImagePreview.classList.remove('hidden');
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            removeHeroImageBtn.addEventListener('click', () => {
                heroImagePreview.classList.add('hidden');
                heroImageInput.value = '';
            });
        }
        
        // About image upload
        const aboutImageInput = document.getElementById('about-image');
        const aboutImagePreview = document.getElementById('about-image-preview');
        if (aboutImageInput && aboutImagePreview) {
            const aboutImagePreviewImg = aboutImagePreview.querySelector('img');
            const removeAboutImageBtn = aboutImagePreview.querySelector('.remove-image');
            
            aboutImageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        aboutImagePreviewImg.src = event.target.result;
                        aboutImagePreview.classList.remove('hidden');
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            removeAboutImageBtn.addEventListener('click', () => {
                aboutImagePreview.classList.add('hidden');
                aboutImageInput.value = '';
            });
        }
        
        // Gallery upload
        const galleryUpload = document.getElementById('gallery-upload');
        if (galleryUpload) {
            galleryUpload.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    const galleryContainer = document.getElementById('gallery-images-container');
                    
                    Array.from(files).forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const imgDiv = document.createElement('div');
                                imgDiv.className = 'relative group gallery-image-item';
                                imgDiv.innerHTML = `
                                    <img src="${event.target.result}" alt="Gallery" class="w-full h-32 object-cover rounded-lg">
                                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <button class="text-white bg-red-500 p-1 rounded-full hover:bg-red-600 mx-1 remove-gallery-image">
                                            <i class="fas fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                `;
                                galleryContainer.insertBefore(imgDiv, galleryContainer.querySelector('.file-upload'));
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                    
                    this.updateGalleryUploadButton();
                }
            });
        }
        
        // Room image uploads
        document.querySelectorAll('.room-image-upload').forEach(upload => {
            upload.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    const imagesContainer = e.target.closest('.room-images-container');
                    
                    Array.from(files).forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const imgDiv = document.createElement('div');
                                imgDiv.className = 'relative';
                                imgDiv.innerHTML = `
                                    <img src="${event.target.result}" alt="Room" class="w-full h-24 object-cover rounded-lg">
                                    <button class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 text-xs remove-room-image">
                                        <i class="fas fa-times"></i>
                                    </button>
                                `;
                                imagesContainer.insertBefore(imgDiv, imagesContainer.querySelector('.file-upload'));
                                this.updateRoomImageUploadButtons(imagesContainer);
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }
            });
        });
        
        // Offer image uploads
        document.querySelectorAll('.offer-image-upload').forEach(upload => {
            upload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    const offerItem = e.target.closest('.offer-item');
                    
                    reader.onload = (event) => {
                        // Remove existing preview if any
                        const existingPreview = offerItem.querySelector('.offer-image-preview');
                        if (existingPreview) {
                            existingPreview.remove();
                        }
                        
                        const previewDiv = document.createElement('div');
                        previewDiv.className = 'mt-2 relative offer-image-preview';
                        previewDiv.innerHTML = `
                            <img src="${event.target.result}" alt="Offer" class="w-full h-32 object-cover rounded-lg">
                            <button class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 remove-offer-image">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        
                        // Insert after the file upload div
                        const uploadDiv = offerItem.querySelector('.file-upload');
                        uploadDiv.parentNode.insertBefore(previewDiv, uploadDiv.nextSibling);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    updateRoomImageUploadButtons(container) {
        const uploadDiv = container.querySelector('.file-upload');
        const imageCount = container.querySelectorAll('img').length;
        
        // Remove upload button if we have 4 images
        if (imageCount >= 4 && uploadDiv) {
            uploadDiv.remove();
        } 
        // Add upload button if we have less than 4 images and no upload button exists
        else if (imageCount < 4 && !uploadDiv) {
            const newUploadDiv = document.createElement('div');
            newUploadDiv.className = 'border-2 border-dashed border-gray-300 rounded-lg p-2 text-center file-upload h-24';
            newUploadDiv.innerHTML = `
                <input type="file" class="hidden room-image-upload" accept="image/*">
                <label class="cursor-pointer h-full flex flex-col items-center justify-center">
                    <i class="fas fa-plus text-gray-400"></i>
                </label>
            `;
            container.appendChild(newUploadDiv);
            
            // Setup event listener for the new upload button
            newUploadDiv.querySelector('input[type="file"]').addEventListener('change', (e) => {
                this.setupFileUploads();
            });
        }
    }
    
    updateGalleryUploadButton() {
        const galleryContainer = document.getElementById('gallery-images-container');
        const imageCount = galleryContainer.querySelectorAll('.gallery-image-item').length;
        const uploadDiv = galleryContainer.querySelector('.file-upload');
        
        // Remove upload button if we have 8 images
        if (imageCount >= 8 && uploadDiv) {
            uploadDiv.remove();
        } 
        // Add upload button if we have less than 8 images and no upload button exists
        else if (imageCount < 8 && !uploadDiv) {
            const newUploadDiv = document.createElement('div');
            newUploadDiv.className = 'border-2 border-dashed border-gray-300 rounded-xl p-6 text-center file-upload';
            newUploadDiv.innerHTML = `
                <input type="file" id="gallery-upload" class="hidden" accept="image/*" multiple>
                <label for="gallery-upload" class="cursor-pointer">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                    <p class="text-sm text-gray-600">Drag & drop images here or click to browse</p>
                    <p class="text-xs text-gray-400 mt-1">Max 10MB per image</p>
                </label>
            `;
            galleryContainer.appendChild(newUploadDiv);
            
            // Setup event listener for the new upload button
            newUploadDiv.querySelector('input[type="file"]').addEventListener('change', (e) => {
                this.setupFileUploads();
            });
        }
    }
    
    addNewAboutFeature() {
        const featuresContainer = document.getElementById('about-features-container');
        
        const newFeature = document.createElement('div');
        newFeature.className = 'p-4 border rounded-lg about-feature-item';
        newFeature.innerHTML = `
            <div class="flex items-center">
                <div class="mr-4 bg-yellow-100 p-3 rounded-full">
                    <i class="fas fa-plus text-yellow-600 text-xl about-feature-icon"></i>
                </div>
                <div class="flex-1">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Feature Title</label>
                    <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 about-feature-title" placeholder="Feature title">
                </div>
            </div>
            <div class="mt-3 flex justify-end">
                <button class="remove-feature text-red-500 text-sm hover:text-red-700">
                    <i class="fas fa-trash mr-1"></i> Remove
                </button>
            </div>
        `;
        
        featuresContainer.insertBefore(newFeature, this.addAboutFeatureBtn);
    }
    
    addNewRoom() {
        const roomsContainer = document.getElementById('rooms-container');
        const roomCount = roomsContainer.querySelectorAll('.room-item').length + 1;
        
        const newRoom = document.createElement('div');
        newRoom.className = 'border rounded-lg p-4 room-item';
        newRoom.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h4 class="font-semibold text-lg">New Room Type</h4>
                <button class="remove-room text-red-500 hover:text-red-700 text-sm">
                    <i class="fas fa-trash mr-1"></i> Remove
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Room Name</label>
                    <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 room-name" placeholder="Room name">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Starting Price</label>
                    <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 room-price" placeholder="e.g., $199/night">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Max Guests</label>
                    <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 room-guests" placeholder="e.g., 2 Adults">
                </div>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 room-description" rows="3" placeholder="Room description"></textarea>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Room Images</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 room-images-container">
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center file-upload h-24">
                        <input type="file" class="hidden room-image-upload" accept="image/*">
                        <label class="cursor-pointer h-full flex flex-col items-center justify-center">
                            <i class="fas fa-plus text-gray-400"></i>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Amenities</label>
                <div class="flex flex-wrap gap-2 room-amenities">
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox text-yellow-600 room-amenity" data-amenity="wifi">
                        <span class="ml-2">Free WiFi</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox text-yellow-600 room-amenity" data-amenity="ac">
                        <span class="ml-2">Air Conditioning</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox text-yellow-600 room-amenity" data-amenity="minibar">
                        <span class="ml-2">Mini Bar</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox text-yellow-600 room-amenity" data-amenity="tv">
                        <span class="ml-2">TV</span>
                    </label>
                </div>
            </div>
        `;
        
        roomsContainer.insertBefore(newRoom, this.addRoomBtn);
        
        // Setup file upload for room images
        const fileUpload = newRoom.querySelector('.room-image-upload');
        fileUpload.addEventListener('change', (e) => {
            this.setupFileUploads();
        });
    }
    
    addNewOffer() {
        const offersContainer = document.getElementById('offers-container');
        
        const newOffer = document.createElement('div');
        newOffer.className = 'border rounded-lg p-4 offer-item';
        newOffer.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h4 class="font-semibold text-lg">New Special Offer</h4>
                <button class="remove-offer text-red-500 hover:text-red-700 text-sm">
                    <i class="fas fa-trash mr-1"></i> Remove
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Offer Title</label>
                    <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 offer-title" placeholder="Offer title">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Discount/Value</label>
                    <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 offer-discount" placeholder="e.g., 20% Off">
                </div>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Valid Dates</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-1">From</label>
                        <input type="date" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 offer-date-from">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-1">To</label>
                        <input type="date" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 offer-date-to">
                    </div>
                </div>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 offer-description" rows="3" placeholder="Offer description"></textarea>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Terms & Conditions</label>
                <textarea class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 offer-terms" rows="2" placeholder="Terms and conditions"></textarea>
            </div>
            
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Featured Image</label>
                <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center file-upload">
                    <input type="file" class="hidden offer-image-upload" accept="image/*">
                    <label class="cursor-pointer">
                        <i class="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-600">Upload offer image</p>
                    </label>
                </div>
            </div>
        `;
        
        offersContainer.insertBefore(newOffer, this.addOfferBtn);
        
        // Setup file upload for offer image
        const fileUpload = newOffer.querySelector('.offer-image-upload');
        fileUpload.addEventListener('change', (e) => {
            this.setupFileUploads();
        });
    }
    
    generatePreview() {
        const previewContent = this.previewModal.querySelector('.overflow-auto');
        
        // Generate a preview based on the current section
        let previewHTML = '';
        
        switch(this.currentSection) {
            case 'homepage':
                previewHTML = `
                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-4">Homepage Preview</h2>
                        <div class="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 class="text-xl font-semibold mb-2">${document.getElementById('homepage-hero-heading').value || 'Hero Section'}</h3>
                            <p class="text-gray-600 mb-4">${document.getElementById('homepage-hero-subheading').value || 'Your perfect getaway awaits'}</p>
                            ${document.getElementById('hero-image-preview').classList.contains('hidden') ? 
                                '<div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center text-gray-500">Hero Image Preview</div>' : 
                                `<img src="${document.getElementById('hero-image-preview-img').src}" alt="Hero" class="w-full h-48 object-cover rounded-lg">`}
                        </div>
                    </div>
                `;
                break;
                
            case 'about':
                previewHTML = `
                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-4">About Us Preview</h2>
                        <div class="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 class="text-xl font-semibold mb-2">${document.getElementById('about-title').value || 'Our Story'}</h3>
                            <p class="text-gray-600 mb-4">${document.getElementById('about-subtitle').value || 'A legacy of hospitality'}</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                ${document.getElementById('about-image-preview').classList.contains('hidden') ? 
                                    '<div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center text-gray-500">About Image Preview</div>' : 
                                    `<img src="${document.getElementById('about-image-preview-img').src}" alt="About" class="w-full h-48 object-cover rounded-lg">`}
                                <div>
                                    <p class="text-gray-700 mb-4">${document.getElementById('about-text').value || 'About us text content...'}</p>
                                </div>
                            </div>
                            <h4 class="text-lg font-semibold mb-3">Key Features</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${Array.from(document.querySelectorAll('.about-feature-item')).map(item => `
                                    <div class="bg-gray-100 p-4 rounded-lg">
                                        <div class="flex items-center">
                                            <div class="mr-4 bg-yellow-100 p-3 rounded-full">
                                                <i class="${item.querySelector('.about-feature-icon').className.replace('text-xl', 'text-lg')}"></i>
                                            </div>
                                            <div>
                                                <h5 class="font-medium">${item.querySelector('.about-feature-title').value || 'Feature Title'}</h5>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'rooms':
                previewHTML = `
                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-4">Rooms & Suites Preview</h2>
                        <div class="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 class="text-xl font-semibold mb-2">${document.getElementById('rooms-title').value || 'Our Rooms & Suites'}</h3>
                            <p class="text-gray-600 mb-6">${document.getElementById('rooms-intro').value || 'Experience the perfect blend of comfort and luxury...'}</p>
                            
                            <div class="space-y-6">
                                ${Array.from(document.querySelectorAll('.room-item')).map(room => `
                                    <div class="bg-gray-100 p-6 rounded-lg">
                                        <h4 class="text-xl font-semibold mb-2">${room.querySelector('.room-name').value || 'Room Type'}</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <p class="text-gray-600">Starting at</p>
                                                <p class="text-lg font-semibold text-yellow-600">${room.querySelector('.room-price').value || '$199/night'}</p>
                                            </div>
                                            <div>
                                                <p class="text-gray-600">Max Guests</p>
                                                <p class="text-lg font-semibold">${room.querySelector('.room-guests').value || '2 Adults'}</p>
                                            </div>
                                        </div>
                                        <p class="text-gray-700 mb-4">${room.querySelector('.room-description').value || 'Room description...'}</p>
                                        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                            ${Array.from(room.querySelectorAll('.room-images-container img')).map((img, i) => `
                                                <img src="${img.src}" alt="Room" class="w-full h-24 object-cover rounded-lg">
                                            `).join('')}
                                        </div>
                                        <h5 class="font-semibold mb-2">Amenities</h5>
                                        <div class="flex flex-wrap gap-2">
                                            ${Array.from(room.querySelectorAll('.room-amenity:checked')).map(amenity => `
                                                <span class="bg-gray-200 px-3 py-1 rounded-full text-sm">${amenity.nextElementSibling.textContent}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'offers':
                previewHTML = `
                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-4">Special Offers Preview</h2>
                        <div class="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 class="text-xl font-semibold mb-2">${document.getElementById('offers-title').value || 'Special Offers'}</h3>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                ${Array.from(document.querySelectorAll('.offer-item')).map(offer => `
                                    <div class="bg-gray-100 p-6 rounded-lg">
                                        <div class="flex justify-between items-start mb-4">
                                            <h4 class="text-xl font-semibold">${offer.querySelector('.offer-title').value || 'Special Offer'}</h4>
                                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                ${offer.querySelector('.offer-discount').value || '20% Off'}
                                            </span>
                                        </div>
                                        <div class="mb-4">
                                            <p class="text-gray-700">${offer.querySelector('.offer-description').value || 'Offer description...'}</p>
                                        </div>
                                        <div class="mb-4">
                                            <p class="text-sm text-gray-600">Valid: ${offer.querySelector('.offer-date-from').value || 'Start date'} to ${offer.querySelector('.offer-date-to').value || 'End date'}</p>
                                        </div>
                                        ${offer.querySelector('.offer-image-preview') ? 
                                            `<img src="${offer.querySelector('.offer-image-preview img').src}" alt="Offer" class="w-full h-48 object-cover rounded-lg mb-4">` : 
                                            '<div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center text-gray-500 mb-4">Offer Image Preview</div>'}
                                        <div class="text-sm text-gray-600">
                                            <h5 class="font-semibold mb-1">Terms & Conditions</h5>
                                            <p>${offer.querySelector('.offer-terms').value || 'Terms and conditions apply...'}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'gallery':
                previewHTML = `
                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-4">Gallery Preview</h2>
                        <div class="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 class="text-xl font-semibold mb-2">${document.getElementById('gallery-title').value || 'Our Gallery'}</h3>
                            <p class="text-gray-600 mb-6">${document.getElementById('gallery-subtitle').value || 'Explore our hotel through images'}</p>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                ${Array.from(document.querySelectorAll('.gallery-image-item')).map((img, i) => `
                                    <img src="${img.querySelector('img').src}" alt="Gallery" class="w-full h-32 object-cover rounded-lg">
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'contact':
                previewHTML = `
                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-4">Contact Preview</h2>
                        <div class="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 class="text-xl font-semibold mb-2">${document.getElementById('contact-title').value || 'Contact Us'}</h3>
                            <p class="text-gray-600 mb-6">${document.getElementById('contact-subtitle').value || "We'd love to hear from you"}</p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 class="text-lg font-semibold mb-3">Our Location</h4>
                                    <div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                                        Map Preview
                                    </div>
                                    <pre class="text-gray-700 whitespace-pre-wrap">${document.getElementById('contact-address').value || '123 Luxury Avenue\nHotel District\nCity, Country 12345'}</pre>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold mb-3">Contact Details</h4>
                                    <ul class="space-y-3">
                                        <li class="flex items-center">
                                            <i class="fas fa-phone-alt text-gray-500 mr-3 w-6 text-center"></i>
                                            <span>${document.getElementById('contact-phone').value || '+1 (555) 123-4567'}</span>
                                        </li>
                                        <li class="flex items-center">
                                            <i class="fas fa-envelope text-gray-500 mr-3 w-6 text-center"></i>
                                            <span>${document.getElementById('contact-email').value || 'info@luxuryhotel.com'}</span>
                                        </li>
                                        <li class="flex items-center">
                                            <i class="fas fa-globe text-gray-500 mr-3 w-6 text-center"></i>
                                            <span>${document.getElementById('contact-website').value || 'www.luxuryhotel.com'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="bg-gray-100 p-6 rounded-lg">
                                <h4 class="text-lg font-semibold mb-4">Send us a message</h4>
                                <form class="space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-gray-700 text-sm font-bold mb-1">Name</label>
                                            <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                        </div>
                                        <div>
                                            <label class="block text-gray-700 text-sm font-bold mb-1">Email</label>
                                            <input type="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1">Subject</label>
                                        <input type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-1">Message</label>
                                        <textarea class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" rows="4"></textarea>
                                    </div>
                                    <button type="submit" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            default:
                previewHTML = `
                    <div class="text-center py-20 text-gray-400">
                        <i class="fas fa-eye text-4xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">Preview of "${this.currentSection}" Content</h3>
                        <p class="max-w-md mx-auto">This would show a live preview of how the content would appear on the website.</p>
                    </div>
                `;
                break;
        }
        
        previewContent.innerHTML = previewHTML;
    }
    
    saveContent(sectionId) {
        // Get the current section ID if not provided
        sectionId = sectionId || this.currentSection;
        
        // Collect data from the form
        let formData = {};
        const form = document.getElementById(`${sectionId}-content`);
        
        // Get all input, textarea, and select elements
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                formData[input.id || input.name] = input.checked;
            } else {
                formData[input.id || input.name] = input.value;
            }
        });
        
        // Get image data if available
        if (sectionId === 'homepage' && !document.getElementById('hero-image-preview').classList.contains('hidden')) {
            formData.heroImage = document.getElementById('hero-image-preview-img').src;
        }
        
        if (sectionId === 'about' && !document.getElementById('about-image-preview').classList.contains('hidden')) {
            formData.aboutImage = document.getElementById('about-image-preview-img').src;
        }
        
        // Get dynamic content (features, rooms, offers)
        if (sectionId === 'about') {
            formData.features = Array.from(document.querySelectorAll('.about-feature-item')).map(item => ({
                title: item.querySelector('.about-feature-title').value,
                icon: item.querySelector('.about-feature-icon').className
            }));
        }
        
        if (sectionId === 'rooms') {
            formData.rooms = Array.from(document.querySelectorAll('.room-item')).map(room => ({
                name: room.querySelector('.room-name').value,
                price: room.querySelector('.room-price').value,
                guests: room.querySelector('.room-guests').value,
                description: room.querySelector('.room-description').value,
                amenities: Array.from(room.querySelectorAll('.room-amenity:checked')).map(a => a.dataset.amenity),
                images: Array.from(room.querySelectorAll('.room-images-container img')).map(img => img.src)
            }));
        }
        
        if (sectionId === 'offers') {
            formData.offers = Array.from(document.querySelectorAll('.offer-item')).map(offer => ({
                title: offer.querySelector('.offer-title').value,
                discount: offer.querySelector('.offer-discount').value,
                dateFrom: offer.querySelector('.offer-date-from').value,
                dateTo: offer.querySelector('.offer-date-to').value,
                description: offer.querySelector('.offer-description').value,
                terms: offer.querySelector('.offer-terms').value,
                image: offer.querySelector('.offer-image-preview img')?.src || null
            }));
        }
        
        if (sectionId === 'gallery') {
            formData.galleryImages = Array.from(document.querySelectorAll('.gallery-image-item img')).map(img => img.src);
        }
        
        // In a real application, you would send this data to your backend
        console.log(`Saving ${sectionId} content:`, formData);
        
        this.showToast(`"${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}" content saved successfully`, 'success');
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast px-4 py-3 rounded-lg shadow-lg text-white ${
            type === 'error' ? 'bg-red-500' : 
            type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`;
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                    type === 'error' ? 'fa-exclamation-circle' : 
                    type === 'success' ? 'fa-check-circle' : 'fa-info-circle'
                } mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Remove toast after animation
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ContentManager();
});