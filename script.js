// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling and Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        
        // Show success message
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Counter Animation for Stats
const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(counter => {
        const target = parseInt(counter.innerText);
        const isPlus = counter.innerText.includes('+');
        let current = 0;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + (isPlus ? '+' : '');
            }
        }, 50);
    });
};

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.animated) {
            animateCounters();
            entry.target.animated = true;
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Add CSS animation for slideInUp
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Console message
console.log('%c Welcome to Sreeja Vijayan\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Let\'s connect and build something amazing! ', 'color: #667eea; font-size: 14px; font-weight: bold;');