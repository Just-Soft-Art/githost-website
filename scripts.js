// Theme switching functionality
const themeDropdown = document.getElementById('theme-dropdown');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
const themeOptions = document.querySelectorAll('.theme-option');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Language switching functionality
const languageDropdown = document.getElementById('language-dropdown');
const languageToggleBtn = document.getElementById('language-toggle-btn');
const languageDropdownMenu = document.getElementById('language-dropdown-menu');
const languageOptions = document.querySelectorAll('.language-option');

// Mobile menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Check if elements exist before proceeding
if (!themeDropdown || !themeToggleBtn || !themeStylesheet) {
    console.error('Required theme elements not found');
}

if (!languageDropdown || !languageToggleBtn) {
    console.error('Required language elements not found');
}

if (!hamburger || !navMenu) {
    console.error('Required navigation elements not found');
}

// Theme management
const themes = {
    light: {
        name: 'Light',
        icon: '☀️',
        href: './themes/light.css',
        logoIcon: './assets/img/homeicon/jsa-light-homeicon.svg'
    },
    dark: {
        name: 'Dark',
        icon: '🌙',
        href: './themes/dark.css',
        logoIcon: './assets/img/homeicon/jsa-dark-homeicon.svg'
    }
    // Temporarily disabled high-contrast theme
    /*
    'high-contrast': {
        name: 'Contrast',
        icon: '⚫',
        href: './themes/high-contrast.css',
        logoIcon: './assets/img/homeicon/jsa-hc-homeicon.svg'
    }
    */
};

// Set theme function
function setTheme(themeName) {
    const theme = themes[themeName];
    if (!theme || !themeStylesheet) return;
    
    // Update stylesheet
    themeStylesheet.href = theme.href;
    
    // Update logo icon
    const logoIcon = document.getElementById('logo-icon');
    if (logoIcon && theme.logoIcon) {
        logoIcon.src = theme.logoIcon;
    }
    
    // Update toggle button
    const themeIcon = themeToggleBtn?.querySelector('.theme-icon');
    const themeText = themeToggleBtn?.querySelector('.theme-text');
    
    if (themeIcon) themeIcon.textContent = theme.icon;
    if (themeText) themeText.textContent = theme.name;
    
    // Update active state
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === themeName) {
            option.classList.add('active');
        }
    });
    
    // Save to localStorage with error handling
    try {
        localStorage.setItem('selectedTheme', themeName);
    } catch (e) {
        console.warn('Unable to save theme preference:', e);
    }
    
    // Close dropdown
    closeDropdown();
}

// Open dropdown
function openDropdown() {
    if (!themeDropdown) return;
    closeLanguageDropdown(); // Close language dropdown if open
    themeDropdown.classList.add('open');
    document.addEventListener('click', handleOutsideClick);
}

// Close dropdown
function closeDropdown() {
    if (!themeDropdown) return;
    themeDropdown.classList.remove('open');
    document.removeEventListener('click', handleOutsideClick);
}

// Handle clicks outside dropdown
function handleOutsideClick(event) {
    if (!themeDropdown.contains(event.target)) {
        closeDropdown();
    }
}

// Toggle dropdown
function toggleDropdown() {
    if (themeDropdown.classList.contains('open')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

// Language management
const languages = {
    en: { name: 'English', code: 'EN' },
    de: { name: 'German', code: 'DE' },
    fr: { name: 'French', code: 'FR' },
    it: { name: 'Italian', code: 'IT' },
    es: { name: 'Spanish', code: 'ES' },
    pl: { name: 'Polish', code: 'PL' },
    ro: { name: 'Romanian', code: 'RO' },
    nl: { name: 'Dutch', code: 'NL' },
    ua: { name: 'Ukrainian', code: 'UA' }
};

// Set language function
function setLanguage(languageCode) {
    const language = languages[languageCode];
    if (!language || !languageToggleBtn) return;
    
    // Update toggle button
    const languageText = languageToggleBtn?.querySelector('.language-text');
    
    if (languageText) languageText.textContent = language.code;
    
    // Update active state
    languageOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.language === languageCode) {
            option.classList.add('active');
        }
    });
    
    // Save to localStorage with error handling
    try {
        localStorage.setItem('selectedLanguage', languageCode);
    } catch (e) {
        console.warn('Unable to save language preference:', e);
    }
    
    // Close dropdown
    closeLanguageDropdown();
}

// Open language dropdown
function openLanguageDropdown() {
    if (!languageDropdown) return;
    closeDropdown(); // Close theme dropdown if open
    languageDropdown.classList.add('open');
    document.addEventListener('click', handleLanguageOutsideClick);
}

// Close language dropdown
function closeLanguageDropdown() {
    if (!languageDropdown) return;
    languageDropdown.classList.remove('open');
    document.removeEventListener('click', handleLanguageOutsideClick);
}

// Handle outside clicks for language dropdown
function handleLanguageOutsideClick(event) {
    if (!languageDropdown?.contains(event.target)) {
        closeLanguageDropdown();
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Disable/enable dropdown buttons when mobile menu is active
    const isActive = navMenu.classList.contains('active');
    if (themeToggleBtn) {
        themeToggleBtn.disabled = isActive;
    }
    if (languageToggleBtn) {
        languageToggleBtn.disabled = isActive;
    }
    
    // Close any open dropdowns when opening mobile menu
    if (isActive) {
        closeDropdown();
        closeLanguageDropdown();
    }
}

function closeMobileMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Re-enable dropdown buttons when mobile menu is closed
    if (themeToggleBtn) {
        themeToggleBtn.disabled = false;
    }
    if (languageToggleBtn) {
        languageToggleBtn.disabled = false;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme or default to light
    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem('selectedTheme') || 'light';
    } catch (e) {
        console.warn('Unable to access localStorage:', e);
    }
    setTheme(savedTheme);
    
    // Theme dropdown toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown();
        });
    }
    
    // Theme option selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const themeName = this.dataset.theme;
            setTheme(themeName);
        });
    });
    
    // Language dropdown toggle
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (languageDropdown.classList.contains('open')) {
                closeLanguageDropdown();
            } else {
                openLanguageDropdown();
            }
        });
    }
    
    // Language option selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const languageCode = this.dataset.language;
            setLanguage(languageCode);
        });
    });
    
    // Load saved language preference
    try {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        setLanguage(savedLanguage);
    } catch (e) {
        console.warn('Unable to load language preference:', e);
        setLanguage('en');
    }
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            closeDropdown();
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
    
    // Add click handlers to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Product Carousel Functionality
class ProductCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDelay = 10000; // 10 seconds
        this.isTransitioning = false; // Prevent multiple simultaneous transitions
        
        this.init();
    }
    
    init() {
        if (!this.track || this.slides.length === 0) return;
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Add indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay on hover
        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoplay());
            container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
    
    goToSlide(slideIndex) {
        // Prevent multiple simultaneous transitions
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide]?.classList.remove('active');
        this.indicators[this.currentSlide]?.classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide]?.classList.add('active');
        this.indicators[this.currentSlide]?.classList.add('active');
        
        // Use requestAnimationFrame for smoother transitions
        requestAnimationFrame(() => {
            const translateX = -this.currentSlide * 100;
            if (this.track) {
                this.track.style.transform = `translate3d(${translateX}%, 0, 0)`;
            }
            
            // Reset transition flag after animation completes
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800); // Match CSS transition duration
        });
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        let startTime = 0;
        const threshold = 50; // Minimum swipe distance
        const maxTime = 300; // Maximum time for swipe (ms)
        
        if (this.track) {
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startTime = Date.now();
                // Temporarily disable transitions for smooth dragging feel
                this.track.style.transition = 'none';
            }, { passive: true });
            
            this.track.addEventListener('touchmove', (e) => {
                // Prevent default scrolling behavior
                e.preventDefault();
            }, { passive: false });
            
            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                const timeDiff = Date.now() - startTime;
                
                // Restore transitions
                this.track.style.transition = '';
                
                // Check if it's a valid swipe (distance and time)
                if (Math.abs(diff) > threshold && timeDiff < maxTime) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }, { passive: true });
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ProductCarousel();
    
    // Enhanced navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Keep navbar sticky (don't override CSS position)
            // Remove the position override to let CSS sticky work
            navbar.style.zIndex = '9999';
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            
            if (currentScrollY > 50) {
                // Scrolled down - enhance blur and background
                navbar.style.backdropFilter = 'saturate(180%) blur(25px)';
                navbar.style.webkitBackdropFilter = 'saturate(180%) blur(25px)';
                navbar.style.transform = 'translate3d(0, 0, 0)';
            } else {
                // At top - normal blur
                navbar.style.backdropFilter = 'saturate(180%) blur(20px)';
                navbar.style.webkitBackdropFilter = 'saturate(180%) blur(20px)';
                navbar.style.transform = 'translate3d(0, 0, 0)';
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Use requestAnimationFrame for smooth scroll effects
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    updateNavbar();
});

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Find the next section after the hero
            const heroSection = scrollIndicator.closest('section');
            const nextSection = heroSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when user scrolls past the hero section
        function handleScrollIndicator() {
            const heroSection = scrollIndicator.closest('section');
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > heroBottom - window.innerHeight * 0.5) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
        
        window.addEventListener('scroll', handleScrollIndicator, { passive: true });
        
        // Initial call
        handleScrollIndicator();
    }
});

// Scroll to top function for services page
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================================
// World Map Interactive Visualization
// ============================================================

class WorldMapVisualization {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.container = null;
        this.isActive = false;
        this.animationId = null;
        this.dots = [];
        this.connections = [];
        this.mousePos = { x: 0, y: 0 };
        this.time = 0;
        this.animationPaused = false;
        this.connectionsVisible = true;
        
        // City coordinates (approximate screen positions)
        this.cities = [
            { name: 'New York', x: 0.25, y: 0.35, clients: 45 },
            { name: 'London', x: 0.48, y: 0.28, clients: 67 },
            { name: 'Tokyo', x: 0.85, y: 0.4, clients: 32 },
            { name: 'Sydney', x: 0.88, y: 0.75, clients: 23 },
            { name: 'São Paulo', x: 0.35, y: 0.7, clients: 18 },
            { name: 'Dubai', x: 0.58, y: 0.45, clients: 29 },
            { name: 'Singapore', x: 0.78, y: 0.6, clients: 41 },
            { name: 'Berlin', x: 0.52, y: 0.25, clients: 35 },
            { name: 'Toronto', x: 0.22, y: 0.3, clients: 27 },
            { name: 'Mumbai', x: 0.68, y: 0.48, clients: 39 },
            { name: 'Los Angeles', x: 0.15, y: 0.42, clients: 52 },
            { name: 'Stockholm', x: 0.52, y: 0.18, clients: 21 },
            { name: 'Cape Town', x: 0.52, y: 0.8, clients: 16 },
            { name: 'Seoul', x: 0.83, y: 0.38, clients: 28 },
            { name: 'Kyiv', x: 0.56, y: 0.25, clients: 19 },
            { name: 'Mexico City', x: 0.18, y: 0.48, clients: 24 },
            { name: 'Cairo', x: 0.55, y: 0.42, clients: 15 },
            { name: 'Bangkok', x: 0.75, y: 0.52, clients: 33 },
            { name: 'Lagos', x: 0.48, y: 0.58, clients: 12 },
            { name: 'Vancouver', x: 0.12, y: 0.25, clients: 22 }
        ];
        
        this.init();
    }
    
    init() {
        // Check if we're on the about page
        const isAboutPage = window.location.pathname.includes('about.html');
        
        if (isAboutPage) {
            this.initAboutPage();
        } else {
            this.initContactPage();
        }
    }
    
    initAboutPage() {
        // Get DOM elements for about page
        this.container = document.getElementById('world-map-container');
        this.canvas = document.getElementById('world-map-canvas');
        
        console.log('About Page Init:', {
            container: this.container,
            canvas: this.canvas
        });
        
        if (!this.container || !this.canvas) {
            console.warn('World map elements not found on about page');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Setup controls
        this.setupControls();
        
        // Canvas event listeners
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Theme change listener
        this.setupThemeListener();
        
        // Initialize immediately
        this.isActive = true;
        this.setupCanvas();
        this.generateDots();
        this.startAnimation();
    }
    
    initContactPage() {
        // Legacy contact page code - About page now has the world map
        console.log('Contact page - About page now contains the interactive world map');
    }
    
    setupControls() {
        const resetBtn = document.getElementById('reset-view');
        const toggleConnectionsBtn = document.getElementById('toggle-connections');
        const toggleAnimationBtn = document.getElementById('toggle-animation');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetView());
        }
        
        if (toggleConnectionsBtn) {
            toggleConnectionsBtn.addEventListener('click', () => this.toggleConnections());
        }
        
        if (toggleAnimationBtn) {
            toggleAnimationBtn.addEventListener('click', () => this.toggleAnimation());
        }
    }
    
    setupThemeListener() {
        // Listen for theme changes using MutationObserver to watch for attribute changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    // Theme changed, regenerate dots with new colors
                    setTimeout(() => {
                        this.generateDots();
                    }, 100); // Small delay to ensure theme styles are loaded
                }
            });
        });
        
        // Observe the document element for theme changes
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Also listen for stylesheet changes (alternative theme switching method)
        const themeStylesheet = document.getElementById('theme-stylesheet');
        if (themeStylesheet) {
            themeStylesheet.addEventListener('load', () => {
                setTimeout(() => {
                    this.generateDots();
                }, 100);
            });
        }
    }
    
    resetView() {
        this.generateDots();
        console.log('View reset');
    }
    
    toggleConnections() {
        this.connectionsVisible = !this.connectionsVisible;
        const btn = document.getElementById('toggle-connections');
        if (btn) {
            btn.textContent = this.connectionsVisible ? '🔗 Hide Connections' : '🔗 Show Connections';
        }
        console.log('Connections toggled:', this.connectionsVisible);
    }
    
    toggleAnimation() {
        this.animationPaused = !this.animationPaused;
        const btn = document.getElementById('toggle-animation');
        if (btn) {
            btn.textContent = this.animationPaused ? '▶️ Resume Animation' : '⏸️ Pause Animation';
        }
        console.log('Animation toggled:', !this.animationPaused);
    }
    
    handleResize() {
        if (this.isActive) {
            this.setupCanvas();
            this.generateDots();
        }
    }
    
    
    setupCanvas() {
        if (!this.canvas || !this.ctx) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.width = rect.width;
        this.height = rect.height;
    }
    
    generateDots() {
        this.dots = [];
        this.connections = [];
        
        // Create city dots
        this.cities.forEach((city, index) => {
            const dot = {
                id: index,
                x: city.x * this.width,
                y: city.y * this.height,
                originalX: city.x * this.width,
                originalY: city.y * this.height,
                radius: 4 + (city.clients / 10),
                color: this.getThemeColor('accent-primary'),
                pulsePhase: Math.random() * Math.PI * 2,
                clients: city.clients,
                name: city.name,
                isHovered: false,
                connections: []
            };
            this.dots.push(dot);
        });
        
        // Generate connections between nearby cities
        this.dots.forEach((dot1, i) => {
            this.dots.forEach((dot2, j) => {
                if (i !== j) {
                    const distance = this.getDistance(dot1, dot2);
                    const maxDistance = Math.min(this.width, this.height) * 0.4;
                    
                    if (distance < maxDistance && Math.random() > 0.6) {
                        const connection = {
                            from: dot1,
                            to: dot2,
                            opacity: 0.3,
                            flowOffset: Math.random() * 100,
                            active: false
                        };
                        this.connections.push(connection);
                        dot1.connections.push(connection);
                        dot2.connections.push(connection);
                    }
                }
            });
        });
        
        // Add some random floating dots for ambiance
        for (let i = 0; i < 30; i++) {
            this.dots.push({
                id: this.cities.length + i,
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                originalX: Math.random() * this.width,
                originalY: Math.random() * this.height,
                radius: 1 + Math.random() * 2,
                color: this.getThemeColor('text-secondary'),
                pulsePhase: Math.random() * Math.PI * 2,
                opacity: 0.3 + Math.random() * 0.4,
                isFloating: true,
                drift: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                }
            });
        }
    }
    
    startAnimation() {
        if (!this.isActive) return;
        
        this.animate();
    }
    
    animate() {
        if (!this.isActive || !this.ctx || this.animationPaused) {
            if (!this.animationPaused) return;
            // Continue animation loop even when paused to keep checking state
            this.animationId = requestAnimationFrame(() => this.animate());
            return;
        }
        
        this.time += 0.016; // ~60fps
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw background grid
        this.drawGrid();
        
        // Update and draw connections
        this.updateConnections();
        if (this.connectionsVisible) {
            this.drawConnections();
        }
        
        // Update and draw dots
        this.updateDots();
        this.drawDots();
        
        // Draw UI elements
        this.drawTooltips();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawGrid() {
        const gridSize = 50;
        const opacity = 0.1;
        
        this.ctx.strokeStyle = this.getThemeColor('border-primary', opacity);
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }
    
    updateDots() {
        this.dots.forEach(dot => {
            // Pulse animation
            dot.pulsePhase += 0.02;
            
            // Floating dots movement
            if (dot.isFloating) {
                dot.x += dot.drift.x;
                dot.y += dot.drift.y;
                
                // Wrap around screen
                if (dot.x < 0) dot.x = this.width;
                if (dot.x > this.width) dot.x = 0;
                if (dot.y < 0) dot.y = this.height;
                if (dot.y > this.height) dot.y = 0;
            }
            
            // Mouse interaction
            const mouseDistance = this.getDistance(dot, this.mousePos);
            if (mouseDistance < 100 && !dot.isFloating) {
                dot.isHovered = true;
                // Activate connections
                dot.connections.forEach(conn => {
                    conn.active = true;
                });
            } else {
                dot.isHovered = false;
                if (!dot.isFloating) {
                    dot.connections.forEach(conn => {
                        conn.active = false;
                    });
                }
            }
        });
    }
    
    updateConnections() {
        this.connections.forEach(connection => {
            connection.flowOffset += 2;
            if (connection.flowOffset > 100) {
                connection.flowOffset = 0;
            }
        });
    }
    
    drawDots() {
        this.dots.forEach(dot => {
            const pulseScale = 1 + Math.sin(dot.pulsePhase) * 0.2;
            const radius = dot.radius * (dot.isHovered ? 1.5 : 1) * pulseScale;
            
            // Outer glow
            if (!dot.isFloating) {
                const gradient = this.ctx.createRadialGradient(
                    dot.x, dot.y, 0,
                    dot.x, dot.y, radius * 3
                );
                gradient.addColorStop(0, this.getThemeColor('accent-primary', 0.3));
                gradient.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(dot.x, dot.y, radius * 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Main dot
            this.ctx.fillStyle = dot.color || this.getThemeColor('accent-primary');
            this.ctx.globalAlpha = dot.opacity || 1;
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            // Client count indicator for city dots
            if (!dot.isFloating && dot.clients && dot.isHovered) {
                // Use theme-appropriate text color
                this.ctx.fillStyle = this.getHoverTextColor();
                this.ctx.font = '12px system-ui';
                this.ctx.textAlign = 'center';
                
                this.ctx.fillText(
                    `${dot.clients} clients`,
                    dot.x,
                    dot.y - radius - 15
                );
                this.ctx.fillText(
                    dot.name,
                    dot.x,
                    dot.y - radius - 30
                );
            }
        });
    }
    
    drawConnections() {
        this.connections.forEach(connection => {
            const opacity = connection.active ? 0.8 : 0.2;
            const lineWidth = connection.active ? 2 : 1;
            
            // Create gradient for the connection line
            const gradient = this.ctx.createLinearGradient(
                connection.from.x, connection.from.y,
                connection.to.x, connection.to.y
            );
            gradient.addColorStop(0, this.getThemeColor('accent-primary', opacity));
            gradient.addColorStop(0.5, this.getThemeColor('accent-secondary', opacity * 1.5));
            gradient.addColorStop(1, this.getThemeColor('accent-primary', opacity));
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = lineWidth;
            this.ctx.setLineDash([5, 5]);
            this.ctx.lineDashOffset = -connection.flowOffset;
            
            this.ctx.beginPath();
            this.ctx.moveTo(connection.from.x, connection.from.y);
            this.ctx.lineTo(connection.to.x, connection.to.y);
            this.ctx.stroke();
            
            this.ctx.setLineDash([]);
        });
    }
    
    drawTooltips() {
        // Draw mouse interaction area
        if (this.mousePos.x > 0 && this.mousePos.y > 0) {
            const nearDot = this.dots.find(dot => 
                !dot.isFloating && this.getDistance(dot, this.mousePos) < 100
            );
            
            if (nearDot) {
                this.ctx.strokeStyle = this.getThemeColor('accent-primary', 0.5);
                this.ctx.lineWidth = 1;
                this.ctx.setLineDash([2, 2]);
                this.ctx.beginPath();
                this.ctx.arc(this.mousePos.x, this.mousePos.y, 100, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos.x = e.clientX - rect.left;
        this.mousePos.y = e.clientY - rect.top;
    }
    
    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Check if click is on a city dot
        const clickedDot = this.dots.find(dot => 
            !dot.isFloating && this.getDistance({ x: clickX, y: clickY }, dot) < dot.radius + 10
        );
        
        if (clickedDot) {
            // Create ripple effect
            this.createRipple(clickedDot.x, clickedDot.y);
        }
    }
    
    createRipple(x, y) {
        let rippleRadius = 0;
        const maxRadius = 50;
        
        const animateRipple = () => {
            if (rippleRadius < maxRadius) {
                this.ctx.strokeStyle = this.getThemeColor('accent-primary', 1 - rippleRadius / maxRadius);
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
                this.ctx.stroke();
                
                rippleRadius += 2;
                requestAnimationFrame(animateRipple);
            }
        };
        
        animateRipple();
    }
    
    getDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    getThemeColor(colorVar, opacity = 1) {
        // Get CSS custom property value
        const root = document.documentElement;
        const colorValue = getComputedStyle(root).getPropertyValue(`--${colorVar}`).trim();
        
        // If no value found, wait a bit and try again (theme might be loading)
        if (!colorValue) {
            const fallbackColors = {
                'accent-primary': '#6571ff',
                'accent-secondary': '#9333ea',
                'text-primary': '#1a1a1a',
                'text-secondary': '#666666',
                'border-primary': '#e5e5e5'
            };
            const fallback = fallbackColors[colorVar] || '#6571ff';
            return this.hexToRgba(fallback, opacity);
        }
        
        // Convert hex to rgba if needed
        if (colorValue.startsWith('#')) {
            return this.hexToRgba(colorValue, opacity);
        }
        
        // If already rgb/rgba, modify opacity
        if (colorValue.startsWith('rgb')) {
            const values = colorValue.match(/\d+/g);
            if (values && values.length >= 3) {
                return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
            }
        }
        
        // Fallback
        return `rgba(101, 113, 255, ${opacity})`;
    }
    
    getHoverTextColor() {
        // Get theme attribute from document element
        const themeAttribute = document.documentElement.getAttribute('data-theme');
        
        // Also check the stylesheet href as backup
        const themeStylesheet = document.getElementById('theme-stylesheet');
        const stylesheetHref = themeStylesheet ? themeStylesheet.href : '';
        
        // Debug logging
        console.log('Current theme attribute:', themeAttribute);
        console.log('Stylesheet href:', stylesheetHref);
        
        // Check for dark theme
        const isDark = themeAttribute === 'dark' || stylesheetHref.includes('dark.css');
        const isHighContrast = themeAttribute === 'high-contrast' || stylesheetHref.includes('high-contrast.css');
        
        if (isDark) {
            console.log('Using white text for dark theme');
            return '#FFFFFF'; // White text for dark theme
        } else if (isHighContrast) {
            console.log('Using black text for high-contrast theme');
            return '#000000'; // Black text for high-contrast theme (white background)
        } else {
            console.log('Using black text for light theme');
            return '#000000'; // Black text for light theme
        }
    }
    
    hexToRgba(hex, opacity) {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.slice(0, 2), 16);
        const g = parseInt(cleanHex.slice(2, 4), 16);
        const b = parseInt(cleanHex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
}

// Initialize World Map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        new WorldMapVisualization();
    }, 100);
});
