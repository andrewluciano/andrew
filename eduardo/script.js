// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

// Initialize page content
function initializePage() {
    // Set current date
    const currentDate = formatCurrentDate();
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = currentDate;
    }
    
    // Rotate quotes
    rotateQuotes();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
}

// Format current date in Portuguese
function formatCurrentDate() {
    const date = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
    return date.toLocaleDateString('pt-BR', options);
}

// Setup event listeners
function setupEventListeners() {
    // Search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Article cards hover effects
    const articleCards = document.querySelectorAll('.article-card, .character-card, .sidebar-card, .featured-article');
    articleCards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Read more button
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', handleReadMore);
    }
    
    // Related articles
    const relatedArticles = document.querySelectorAll('.related-article');
    relatedArticles.forEach(article => {
        article.addEventListener('click', handleRelatedArticleClick);
    });
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Simulate search functionality
        showNotification(`Buscar por: "${query}"\n(Estou com preguiça de fazer então, DESISTA!)`);
        searchInput.value = '';
    }
}

// Handle smooth scrolling for navigation
function handleSmoothScroll(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerOffset = 80; // Account for fixed navigation
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update active navigation state
        updateActiveNavigation(targetId);
    }
}

// Initialize smooth scrolling for all anchor links
function initializeSmoothScrolling() {
    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(updateActiveNavigationOnScroll, 100));
}

// Update active navigation link
function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.classList.remove('nav-link-primary');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('nav-link-primary');
        }
    });
}

// Update active navigation on scroll
function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavigation(sectionId);
        }
    });
}

// Handle read more button click
function handleReadMore() {
    showNotification('Estou com preguiça de fazer então, DESISTA!');
}

// Handle related article clicks
function handleRelatedArticleClick(event) {
    const articleTitle = event.currentTarget.querySelector('.related-title').textContent;
    showNotification(`Nao vou abrir não: "${articleTitle}"\n(Não vou desenvolver)`);
}

// Toggle mobile menu (placeholder)
function toggleMobileMenu() {
    showNotification('Estou com preguiça de fazer então, DESISTA!');
}

// Rotate quotes periodically
function rotateQuotes() {
    const quotes = [
        {
            text: "A Casa Verde é a minha obra, e há de ser a minha glória.",
            source: "O Alienista"
        }
    ]};
    
    let currentQuoteIndex = 0;
    const quoteElement = document.getElementById('dailyQuote');
    
    if (quoteElement) {{
        // Set initial quote
        quoteElement.textContent = `"${quotes[currentQuoteIndex].text}"`;
        
        // Rotate quotes every 10 seconds
        setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            
            // Fade out
            quoteElement.style.opacity = '0';
            
            setTimeout(() => {
                quoteElement.textContent = `"${quotes[currentQuoteIndex].text}"`;
                // Fade in
                quoteElement.style.opacity = '1';
            }, 300);
            
        }, 10000);
        
        // Add transition for smooth fade
        quoteElement.style.transition = 'opacity 0.3s ease';
    }
}

// Show notification (simple alert replacement)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        backgroundColor: 'var(--newspaper-black)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '1000',
        maxWidth: '300px',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        whiteSpace: 'pre-line',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading state
        img.style.opacity = '0.5';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize image loading animations
document.addEventListener('DOMContentLoaded', addImageLoadingAnimation);

// Add intersection observer for animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.article-card, .character-card, .context-card, .sidebar-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after content loads
window.addEventListener('load', addScrollAnimations);

// Performance optimization: Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images
preloadCriticalImages();

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Navigate with arrow keys
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const sections = document.querySelectorAll('section[id]');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(section => 
            section.getAttribute('id') === currentSection
        );
        
        let newIndex;
        if (event.key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % sections.length;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        }
        
        const targetSection = sections[newIndex];
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section.getAttribute('id');
        }
    }
    
    return sections[0]?.getAttribute('id') || 'home';
}