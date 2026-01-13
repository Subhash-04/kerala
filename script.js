/* ====================================
   CSM-AIML Kerala Trip 2025-26
   Enhanced JavaScript with 3D Animations
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 100
    });

    // Preloader
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        // Trigger hero animations after preloader
        document.body.classList.add('loaded');
    }, 2000);

    // Initialize all features
    initBackToTop();
    initSmoothScroll();
    initParallax3D();
    initCardEffects();
    initModalKeyboard();
    initScrollProgress();
});

/* ====================================
   Modal Functions
   ==================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Refresh AOS for modal content
        setTimeout(() => {
            AOS.refresh();
        }, 100);
        
        // Add entrance animation to content
        const content = modal.querySelector('.modal-container');
        if (content) {
            content.style.animation = 'modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const content = modal.querySelector('.modal-container');
        if (content) {
            content.style.animation = 'modalSlideOut 0.3s ease-out forwards';
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }, 300);
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

function initModalKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

/* ====================================
   Back to Top Button
   ==================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ====================================
   Smooth Scroll
   ==================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ====================================
   3D Parallax Effects
   ==================================== */
function initParallax3D() {
    const floatingElements = document.querySelectorAll('.float-element');
    const blobs = document.querySelectorAll('.liquid-blob');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                
                // Parallax for floating elements
                floatingElements.forEach((el, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const yOffset = scrolled * speed;
                    const rotation = scrolled * 0.02;
                    el.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
                });
                
                // Parallax for blobs
                blobs.forEach((blob, index) => {
                    const speed = 0.03 + (index * 0.01);
                    const yOffset = scrolled * speed;
                    blob.style.transform = `translateY(${yOffset}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            floatingElements.forEach((el, index) => {
                const depth = (index + 1) * 10;
                const xMove = xPercent * depth;
                const yMove = yPercent * depth;
                el.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });
    }
}

/* ====================================
   Card 3D Effects
   ==================================== */
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px)
                scale(1.02)
            `;
            
            // Move shine effect
            const shine = card.querySelector('.card-shine');
            if (shine) {
                const shineX = (x / rect.width) * 100;
                shine.style.left = `${shineX - 25}%`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Stat cards hover effect
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ====================================
   Scroll Progress Indicator
   ==================================== */
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(13, 148, 136, 0.1);
            z-index: 9999;
        }
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #0d9488, #06b6d4, #10b981);
            width: 0%;
            transition: width 0.1s ease-out;
            border-radius: 0 2px 2px 0;
            box-shadow: 0 0 10px rgba(13, 148, 136, 0.5);
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(30px) scale(0.98);
            }
        }
    `;
    document.head.appendChild(style);
    
    const bar = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        bar.style.width = `${scrolled}%`;
    });
}

/* ====================================
   Image Gallery Interactions
   ==================================== */
function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) translateZ(20px)';
            item.style.boxShadow = '0 20px 40px rgba(13, 148, 136, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
}

/* ====================================
   Place Cards Animation
   ==================================== */
function initPlaceCardAnimations() {
    const placeCards = document.querySelectorAll('.place-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeSlideIn 0.5s ease-out ${index * 0.1}s forwards`;
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.2 });
    
    placeCards.forEach(card => {
        observer.observe(card);
    });
}

/* ====================================
   Typing Effect for Tagline
   ==================================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ====================================
   Ripple Effect on Click
   ==================================== */
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
    
    setTimeout(() => circle.remove(), 600);
}

/* ====================================
   Utility: Throttle Function
   ==================================== */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ====================================
   Utility: Debounce Function
   ==================================== */
function debounce(func, wait = 20) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* ====================================
   Console Branding
   ==================================== */
console.log(`
%c🌴 CSM-AIML Kerala Trip 2025-26 🌴
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c"Once in a B.Tech Trip – Create Memories Forever"

%c5 Days • 4 Nights • 4 Cities • Infinite Memories

%cWebsite crafted with ❤️ for CSM-AIML Students
`,
'color: #0d9488; font-size: 20px; font-weight: bold;',
'color: #06b6d4;',
'color: #f97316; font-style: italic;',
'color: #10b981;',
'color: #64748b; font-size: 11px;'
);

/* ====================================
   Initialize on Modal Open
   ==================================== */
document.addEventListener('click', (e) => {
    // Re-initialize animations when modal opens
    if (e.target.closest('.feature-card')) {
        setTimeout(() => {
            initGalleryEffects();
            initPlaceCardAnimations();
        }, 300);
    }
});

/* ====================================
   3D Circular Carousel Functions
   ==================================== */
let carouselPlaying = true;

function toggleCarousel() {
    const carousel = document.getElementById('carousel3d');
    const btnText = document.getElementById('carouselBtnText');
    
    if (carousel) {
        if (carouselPlaying) {
            carousel.style.animationPlayState = 'paused';
            btnText.textContent = '▶️ Play';
            carouselPlaying = false;
        } else {
            carousel.style.animationPlayState = 'running';
            btnText.textContent = '⏸️ Pause';
            carouselPlaying = true;
        }
    }
}

// Initialize 3D Carousel interactions
function init3DCarousel() {
    const carousel = document.getElementById('carousel3d');
    const items = document.querySelectorAll('.carousel-3d-item');
    
    if (!carousel) return;
    
    // Pause on hover over individual items
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', () => {
            if (carouselPlaying) {
                carousel.style.animationPlayState = 'running';
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init3DCarousel);

/* ====================================
   Journey Day Switcher - 3D Fragment Transitions
   ==================================== */
let isTransitioning = false;
let currentDayNum = 1;

function showDay(dayNum) {
    // Prevent rapid clicking during transition
    if (isTransitioning || dayNum === currentDayNum) return;
    isTransitioning = true;
    
    const container = document.querySelector('.journey-cards-container');
    const tabs = document.querySelectorAll('.journey-tab');
    const days = document.querySelectorAll('.journey-day');
    const currentDay = document.getElementById('day' + currentDayNum);
    const newDay = document.getElementById('day' + dayNum);
    
    if (!currentDay || !newDay) {
        isTransitioning = false;
        return;
    }
    
    // Add particle burst effect
    container.classList.add('transitioning');
    
    // Update tabs immediately
    tabs.forEach((tab, index) => {
        if (index === dayNum - 1) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Start exit animation on current day
    currentDay.classList.remove('active');
    currentDay.classList.add('exiting');
    
    // After exit animation, show new day
    setTimeout(() => {
        // Remove exiting state
        currentDay.classList.remove('exiting');
        
        // Show new day with assemble animation
        newDay.classList.add('active');
        
        // Update current day tracker
        currentDayNum = dayNum;
        
        // Remove particle burst
        setTimeout(() => {
            container.classList.remove('transitioning');
        }, 100);
        
        // Allow new transitions
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
        
    }, 500); // Wait for exit animation
}

// Auto-switch days on swipe (touch support) with 3D transitions
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.journey-cards-container');
    if (!container) return;
    
    let startX = 0;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    container.addEventListener('touchend', (e) => {
        if (isTransitioning) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentDayNum < 5) {
                showDay(currentDayNum + 1);
            } else if (diff < 0 && currentDayNum > 1) {
                showDay(currentDayNum - 1);
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        // Only work when modal is open
        const modal = document.getElementById('tripPlan');
        if (!modal || !modal.classList.contains('active')) return;
        
        if (e.key === 'ArrowRight' && currentDayNum < 5) {
            showDay(currentDayNum + 1);
        } else if (e.key === 'ArrowLeft' && currentDayNum > 1) {
            showDay(currentDayNum - 1);
        }
    });
});
