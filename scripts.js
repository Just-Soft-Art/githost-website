// Theme switching functionality
const themeDropdown = document.getElementById('theme-dropdown');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
const themeOptions = document.querySelectorAll('.theme-option');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Mobile menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Check if elements exist before proceeding
if (!themeDropdown || !themeToggleBtn || !themeStylesheet) {
    console.error('Required theme elements not found');
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
    },
    'high-contrast': {
        name: 'Contrast',
        icon: '⚫',
        href: './themes/high-contrast.css',
        logoIcon: './assets/img/homeicon/jsa-hc-homeicon.svg'
    }
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

// Mobile menu functions
function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
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
            // Ensure navbar is always visible
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
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
