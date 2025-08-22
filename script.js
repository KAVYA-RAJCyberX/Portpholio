// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.classList.toggle('dark', savedTheme === 'dark');
} else {
    // Default to dark theme
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars when skills section is visible
            if (entry.target.id === 'skills') {
                animateProgressBars();
            }
            
            // Animate project progress bars when projects section is visible
            if (entry.target.id === 'projects') {
                animateProjectProgress();
            }
        }
    });
}, observerOptions);

// Add animation classes to elements
function initAnimations() {
    // Hero section animations
    const heroText = document.querySelector('.hero-text');
    const techStack = document.querySelector('.tech-stack');
    if (heroText) heroText.classList.add('animate-slide-left');
    if (techStack) techStack.classList.add('animate-slide-right');

    // About section animations
    const aboutText = document.querySelector('.about-text');
    const highlights = document.querySelector('.highlights');
    if (aboutText) aboutText.classList.add('animate-slide-left');
    if (highlights) highlights.classList.add('animate-slide-right');

    // Skills section animations
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) skillsGrid.classList.add('animate-fade-in');

    // Projects section animations
    const projectTabs = document.querySelector('.project-tabs');
    if (projectTabs) projectTabs.classList.add('animate-scale');

    // Contact section animations
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    if (contactInfo) contactInfo.classList.add('animate-slide-left');
    if (contactForm) contactForm.classList.add('animate-slide-right');

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        animationObserver.observe(section);
    });

    // Observe individual animated elements
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// Progress bar animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Project progress bar animations
function animateProjectProgress() {
    const projectProgress = document.querySelectorAll('.progress-section .progress-fill');
    projectProgress.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Project Tabs Functionality
function initProjectTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetTab = trigger.getAttribute('data-tab');
            
            // Remove active class from all triggers and contents
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked trigger and corresponding content
            trigger.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Tech stack item interactions
function initTechStackInteractions() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        // Stagger the initial animation
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover sound effect (visual feedback)
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Form handling
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = html.classList.contains('dark') 
                ? 'rgba(15, 15, 15, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = html.classList.contains('dark') 
                ? 'rgba(15, 15, 15, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--blue-500)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(document.querySelector('.hero'));
}

// Add hover effects to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02) rotateY(3deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
}

// Add stagger animation to skill categories
function initSkillCategoryAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateY(0deg)';
                }, index * 200);
            }
        });
    });
    
    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px) rotateY(-15deg)';
        category.style.transition = 'all 0.8s ease';
        skillObserver.observe(category);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initProjectTabs();
    initTechStackInteractions();
    initContactForm();
    initHeaderScroll();
    initParallaxEffect();
    initTypingEffect();
    initProjectCardEffects();
    initSkillCategoryAnimations();
    
    // Add initial visibility to hero section
    setTimeout(() => {
        document.querySelector('.hero-text')?.classList.add('visible');
        document.querySelector('.tech-stack')?.classList.add('visible');
    }, 500);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate animations if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable some animations on mobile for better performance
        document.querySelectorAll('.tech-item').forEach(item => {
            item.style.transform = 'none';
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();