// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const initMobileMenu = () => {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuButton && mobileMenuClose && mobileMenu) {
            const toggleMobileMenu = () => {
                mobileMenu.classList.toggle('open');
                document.body.classList.toggle('overflow-hidden');
            };
            
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
            mobileMenuClose.addEventListener('click', toggleMobileMenu);
        }
    };

    // Statistics Counter Animation
    const initCounters = () => {
        const statsCards = document.querySelectorAll('.stats-card');
        
        const animateValue = (element, start, end, suffix, duration) => {
            const range = end - start;
            const increment = range / (duration * 60);
            let current = start;
            
            const updateCounter = () => {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    element.textContent = end + (suffix || '');
                    return;
                }
                element.textContent = Math.floor(current) + (suffix || '');
                requestAnimationFrame(updateCounter);
            };
            
            requestAnimationFrame(updateCounter);
        };

        const startCounters = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const numberElement = card.querySelector('.stats-number');
                    const targetValue = parseInt(card.dataset.count);
                    const suffix = card.dataset.suffix || '';
                    
                    animateValue(numberElement, 0, targetValue, suffix, 2);
                    observer.unobserve(card);
                }
            });
        };

        const observer = new IntersectionObserver(startCounters, {
            threshold: 0.5
        });

        statsCards.forEach(card => observer.observe(card));
    };

    // FAQ Accordion
   // FAQ Animation and Interaction
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const answer = item.querySelector('.faq-answer');
        
        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // First close all other FAQs with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.height = `${otherAnswer.scrollHeight}px`;
                    // Force reflow
                    otherAnswer.offsetHeight;
                    otherAnswer.style.height = '0px';
                    otherItem.classList.remove('active');
                    
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            if (!isOpen) {
                // Opening
                item.classList.add('active');
                answer.style.height = `${answer.scrollHeight}px`;
                button.querySelector('.faq-icon').style.transform = 'rotate(180deg)';
            } else {
                // Closing
                answer.style.height = `${answer.scrollHeight}px`;
                // Force reflow
                answer.offsetHeight;
                answer.style.height = '0px';
                item.classList.remove('active');
                button.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            }
        });
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFAQ);

    // Contact Form Handler
    const initContactForm = () => {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitButton = form.querySelector('button[type="submit"]');
                const inputs = form.querySelectorAll('input, textarea');
                
                if (submitButton) {
                    // Disable form
                    submitButton.disabled = true;
                    inputs.forEach(input => input.disabled = true);
                    
                    // Update button state
                    submitButton.innerHTML = '<span class="animate-spin inline-block">↻</span> Sending...';
                    
                    // Simulate form submission (replace with actual API call)
                    setTimeout(() => {
                        submitButton.innerHTML = '✓ Message Sent!';
                        submitButton.classList.add('bg-green-500');
                        
                        // Reset form after delay
                        setTimeout(() => {
                            form.reset();
                            submitButton.innerHTML = 'Send Message';
                            submitButton.classList.remove('bg-green-500');
                            submitButton.disabled = false;
                            inputs.forEach(input => input.disabled = false);
                        }, 2000);
                    }, 1500);
                }
            });
        }
    };

    // Smooth Scroll
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Close mobile menu if open
                        const mobileMenu = document.querySelector('.mobile-menu');
                        if (mobileMenu?.classList.contains('open')) {
                            mobileMenu.classList.remove('open');
                            document.body.classList.remove('overflow-hidden');
                        }
                    }
                }
            });
        });
    };

    // Initialize all functionality
    initMobileMenu();
    initCounters();
    initFAQ();
    initContactForm();
    initSmoothScroll();
});