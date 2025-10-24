// DOM Elements
const navAuth = document.getElementById('navAuth');
const navUser = document.getElementById('navUser');
const hamburger = document.getElementById('hamburger');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const playBtns = document.querySelectorAll('.play-btn');
const followBtns = document.querySelectorAll('.follow-btn');
const exploreBtns = document.querySelectorAll('.explore-btn');
const statNumbers = document.querySelectorAll('.stat-number');

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    setupEventListeners();
    startCounters();
    initAnimations();
});

function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Play buttons
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('playing');
            const icon = this.querySelector('i');
            if (this.classList.contains('playing')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                // Simulate playing audio
                simulateAudioPlayback(this);
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });
    
    // Follow buttons
    followBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const spaceCard = this.closest('.space-card');
            const spaceName = spaceCard.querySelector('h3').textContent;
            
            if (this.classList.contains('following')) {
                this.classList.remove('following');
                this.innerHTML = '<i class="fas fa-plus"></i>Theo dõi';
                showNotification(`Đã bỏ theo dõi ${spaceName}`, 'info');
            } else {
                this.classList.add('following');
                this.innerHTML = '<i class="fas fa-check"></i>Đã theo dõi';
                showNotification(`Đã theo dõi ${spaceName}`, 'success');
            }
        });
    });
    
    // Explore buttons
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const spaceCard = this.closest('.space-card');
            const spaceName = spaceCard.querySelector('h3').textContent;
            showNotification(`Đang chuyển đến ${spaceName}...`, 'info');
            
            // Simulate navigation delay
            setTimeout(() => {
                // In a real app, this would navigate to the specific space
                console.log(`Navigating to ${spaceName}`);
            }, 1000);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (isLoggedIn === 'true' && currentUser) {
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) navUser.style.display = 'block';
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navUser) navUser.style.display = 'none';
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    
    // Animate hamburger icon
    const bars = hamburger.querySelectorAll('.bar');
    if (navMenu.style.display === 'flex') {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

function switchTab(tabId) {
    // Update active tab button
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update active tab pane
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`${tabId}Tab`).classList.add('active');
}

function simulateAudioPlayback(playBtn) {
    // Simulate audio playback progress
    const podcastCard = playBtn.closest('.podcast-card');
    const durationText = podcastCard.querySelector('.duration');
    
    if (playBtn.classList.contains('playing')) {
        // Simulate playback starting
        console.log('Audio playback started');
        
        // In a real app, you would integrate with a Web Audio API or audio player
        setTimeout(() => {
            if (playBtn.classList.contains('playing')) {
                showNotification('Đang phát podcast...', 'info');
            }
        }, 500);
    }
}

function startCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.space-card, .article-card, .podcast-card, .trending-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .space-card:nth-child(2) {
        transition-delay: 0.1s;
    }
    
    .space-card:nth-child(3) {
        transition-delay: 0.2s;
    }
    
    .following {
        background: var(--accent) !important;
        color: var(--white) !important;
        border-color: var(--accent) !important;
    }
`;
document.head.appendChild(animationStyles);

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause all audio when page is hidden
        playBtns.forEach(btn => {
            if (btn.classList.contains('playing')) {
                btn.classList.remove('playing');
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    }
});