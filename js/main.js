/**
 * Portfolio Website JavaScript - Ghanaian Version
 * Handles all interactive functionality including:
 * - Theme switching
 * - Mobile navigation
 * - Project filtering
 * - Scroll animations
 * - Offline contact form handling
 * - Particle system
 */

// ========================================
// GLOBAL VARIABLES & CONFIGURATION
// ========================================

const CONFIG = {
  // Animation settings
  animationDuration: 300,
  scrollOffset: 100,
  
  // Particle system settings
  particleCount: 50,
  particleMinSize: 2,
  particleMaxSize: 6,
  
  // Theme settings
  themeKey: 'portfolio-theme',
  defaultTheme: 'light',
  
  // Form settings
  formId: 'contact-form-offline',
  
  // Notification settings
  notificationDuration: 5000
};

// Global state
let currentTheme = CONFIG.defaultTheme;
let isMobileMenuOpen = false;
let activeFilter = 'all';

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

window.addEventListener('load', function() {
  handleWindowLoad();
});

/**
 * Initialize the entire application
 */
function initializeApp() {
  try {
    // Initialize core functionality
    initTheme();
    initMobileMenu();
    initProjectFilter();
    initScrollAnimations();
    initBackToTop();
    initParticleSystem();
    initContactForm();
    initSmoothScroll();
    initSkillBars();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Ghanaian Portfolio app initialized successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

/**
 * Handle window load event
 */
function handleWindowLoad() {
  // Hide loading spinner
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    setTimeout(() => {
      spinner.classList.add('hidden');
      setTimeout(() => {
        spinner.style.display = 'none';
      }, CONFIG.animationDuration);
    }, 500);
  }
  
  // Trigger skill bar animations
  animateSkillBars();
  
  // Initialize intersection observers for scroll animations
  initScrollAnimations();
}

// ========================================
// THEME MANAGEMENT
// ========================================

/**
 * Initialize theme system
 */
function initTheme() {
  const savedTheme = localStorage.getItem(CONFIG.themeKey) || CONFIG.defaultTheme;
  setTheme(savedTheme);
  
  // Set up theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    updateThemeIcon(savedTheme);
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem(CONFIG.themeKey, newTheme);
}

/**
 * Set the active theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
  
  // Update particle colors if they exist
  updateParticleColors(theme);
}

/**
 * Update theme toggle icon based on current theme
 * @param {string} theme - Current theme
 */
function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// ========================================
// MOBILE NAVIGATION
// ========================================

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
}

/**
 * Toggle mobile menu open/closed
 */
function toggleMobileMenu() {
  if (isMobileMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  isMobileMenuOpen = true;
  hamburger.classList.add('active');
  navMenu.classList.add('active');
  
  // Animate hamburger lines
  const lines = hamburger.querySelectorAll('.hamburger-line');
  lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  lines[1].style.opacity = '0';
  lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  isMobileMenuOpen = false;
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  
  // Reset hamburger lines
  const lines = hamburger.querySelectorAll('.hamburger-line');
  lines.forEach(line => {
    line.style.transform = '';
    line.style.opacity = '';
  });
}

// ========================================
// PROJECT FILTERING
// ========================================

/**
 * Initialize project filtering functionality
 */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        setActiveFilter(filter);
        filterProjects(filter);
        updateActiveButton(this);
      });
    });
  }
}

/**
 * Set the active filter
 * @param {string} filter - Filter type ('all', 'fintech', 'healthtech', 'edtech', 'agritech')
 */
function setActiveFilter(filter) {
  activeFilter = filter;
}

/**
 * Filter projects based on the active filter
 * @param {string} filter - Filter to apply
 */
function filterProjects(filter) {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const shouldShow = filter === 'all' || category === filter;
    
    if (shouldShow) {
      card.classList.remove('hidden');
      // Animate in
      setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
      }, 50);
    } else {
      // Animate out
      card.style.transform = 'scale(0.8)';
      card.style.opacity = '0';
      setTimeout(() => {
        card.classList.add('hidden');
      }, CONFIG.animationDuration);
    }
  });
}

/**
 * Update the active filter button
 * @param {HTMLElement} activeButton - The button that was clicked
 */
function updateActiveButton(activeButton) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
  // Create intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger skill bar animation if it's a skill item
        if (entry.target.classList.contains('skill-item')) {
          animateSkillBar(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .skill-item, .timeline-item, .project-card'
  );
  
  animateElements.forEach(el => {
    // Add default fade-in class if no animation class is present
    if (!el.classList.contains('fade-in') && 
        !el.classList.contains('slide-in-left') && 
        !el.classList.contains('slide-in-right')) {
      el.classList.add('fade-in');
    }
    observer.observe(el);
  });
  
  // Handle navbar scroll effect
  handleNavbarScroll();
}

/**
 * Handle navbar scroll effects
 */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScrollY = currentScrollY;
  });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// ========================================
// SKILL BARS ANIMATION
// ========================================

/**
 * Initialize skill bars
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.setProperty('--skill-width', `${width}%`);
  });
}

/**
 * Animate all skill bars
 */
function animateSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    if (isElementInViewport(item)) {
      animateSkillBar(item);
    }
  });
}

/**
 * Animate individual skill bar
 * @param {HTMLElement} skillItem - The skill item element
 */
function animateSkillBar(skillItem) {
  const progressBar = skillItem.querySelector('.skill-progress');
  if (progressBar && !progressBar.classList.contains('animate')) {
    const width = progressBar.getAttribute('data-width');
    setTimeout(() => {
      progressBar.style.width = `${width}%`;
      progressBar.classList.add('animate');
    }, 200);
  }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  }
}

/**
 * Smooth scroll to top
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========================================
// PARTICLE SYSTEM
// ========================================

/**
 * Initialize particle system for hero background
 */
function initParticleSystem() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  // Create particles
  for (let i = 0; i < CONFIG.particleCount; i++) {
    createParticle(container);
  }
}

/**
 * Create a single particle
 * @param {HTMLElement} container - The container element
 */
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random properties
  const size = Math.random() * (CONFIG.particleMaxSize - CONFIG.particleMinSize) + CONFIG.particleMinSize;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const animationDelay = Math.random() * 6;
  const animationDuration = 4 + Math.random() * 4;
  
  // Apply styles
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.animationDelay = `${animationDelay}s`;
  particle.style.animationDuration = `${animationDuration}s`;
  
  container.appendChild(particle);
}

/**
 * Update particle colors based on theme
 * @param {string} theme - Current theme
 */
function updateParticleColors(theme) {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    particle.style.background = theme === 'dark' ? '#ffd700' : '#0a192f';
  });
}

// ========================================
// CONTACT FORM HANDLING - OFFLINE VERSION
// ========================================

/**
 * Initialize contact form handling
 */
function initContactForm() {
  const form = document.getElementById(CONFIG.formId);
  
  if (form) {
    form.addEventListener('submit', handleOfflineFormSubmit);
    
    // Add form validation
    addFormValidation(form);
  }
}

/**
 * Add form validation
 * @param {HTMLElement} form - The form element
 */
function addFormValidation(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
}

/**
 * Validate individual field
 * @param {HTMLElement} field - The field element
 * @returns {boolean} True if valid
 */
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = 'This field is required';
    isValid = false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    }
  }
  
  // Phone validation (if phone field exists)
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      errorMessage = 'Please enter a valid phone number';
      isValid = false;
    }
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }
  
  return isValid;
}

/**
 * Show field error
 * @param {HTMLElement} field - The field element
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
  clearFieldError(field);
  
  field.classList.add('error');
  
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  errorElement.style.color = '#ef4444';
  errorElement.style.fontSize = '0.875rem';
  errorElement.style.marginTop = '0.25rem';
  
  field.parentNode.appendChild(errorElement);
}

/**
 * Clear field error
 * @param {HTMLElement} field - The field element
 */
function clearFieldError(field) {
  field.classList.remove('error');
  
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Handle offline form submission
 * @param {Event} e - Form submit event
 */
function handleOfflineFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validate all required fields
  const requiredFields = form.querySelectorAll('input[required], textarea[required]');
  let isFormValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showNotification('Please correct the errors above', 'error');
    return;
  }
  
  // Simulate form submission
  showNotification('Sending message...', 'info');
  
  // Create submission data object
  const submissionData = {
    ...data,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    location: 'Ghana' // Could be enhanced with IP geolocation
  };
  
  // Simulate API call delay
  setTimeout(() => {
    // Store in localStorage (in real app, would send to server)
    storeSubmission(submissionData);
    
    showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
    form.reset();
    
    // Show thank you message
    showThankYouMessage();
  }, 1500);
}

/**
 * Store form submission in localStorage
 * @param {Object} data - Form submission data
 */
function storeSubmission(data) {
  try {
    const submissions = JSON.parse(localStorage.getItem('portfolio-submissions') || '[]');
    submissions.push(data);
    
    // Keep only last 10 submissions
    if (submissions.length > 10) {
      submissions.splice(0, submissions.length - 10);
    }
    
    localStorage.setItem('portfolio-submissions', JSON.stringify(submissions));
    console.log('Form submission stored locally:', data);
  } catch (error) {
    console.error('Error storing submission:', error);
  }
}

/**
 * Show thank you message
 */
function showThankYouMessage() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'thank-you-message';
    thankYouMessage.innerHTML = `
      <div style="text-align: center; padding: 2rem; background: var(--bg-secondary); border-radius: var(--border-radius-lg);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Medaasi! (Thank You!)</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">
          Your message has been received successfully. I appreciate your interest in working together and will respond within 24 hours.
        </p>
        <p style="color: var(--text-accent); font-weight: 600; margin-bottom: 1.5rem;">
          Let's build something amazing for Africa! 🚀
        </p>
        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
          Send Another Message
        </button>
      </div>
    `;
    
    // Replace form with thank you message
    const form = document.getElementById(CONFIG.formId);
    if (form) {
      form.style.display = 'none';
      contactForm.appendChild(thankYouMessage);
    }
  }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.5rem; cursor: pointer; padding: 0; width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center;">&times;</button>
    </div>
  `;
  
  // Add styles
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  };
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    background: colors[type] || colors.info,
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    maxWidth: '400px',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  });
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after timeout
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, CONFIG.notificationDuration);
}

// ========================================
// SMOOTH SCROLL
// ========================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
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

/**
 * Set up global event listeners
 */
function setupEventListeners() {
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, 250));
  
  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Handle scroll events
  window.addEventListener('scroll', debounce(() => {
    animateSkillBars();
  }, 100));
}

// ========================================
// ERROR HANDLING
// ========================================

/**
 * Global error handler
 */
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
  
  // Show user-friendly error message for critical errors
  if (e.error && e.error.message && e.error.message.includes('undefined')) {
    showNotification('A technical issue occurred. Some features may not work correctly.', 'error');
  }
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  showNotification('A network error occurred. Please check your connection.', 'error');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

/**
 * Preload critical resources
 */
function preloadResources() {
  // Preload images
  const criticalImages = [
    './resources/images/profile.png',
    './resources/images/project-fintech.png',
    './resources/images/project-health.png'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Preload fonts
  const font = new FontFace('Inter', 'url(./resources/fonts/Inter.var.woff2)');
  font.load().then(loadedFont => {
    document.fonts.add(loadedFont);
  }).catch(err => {
    console.warn('Font loading failed:', err);
  });
}

// Call preload function
preloadResources();

// ========================================
// DEVELOPMENT HELPERS
// ========================================

/**
 * Debug helper - log current state
 */
function logState() {
  console.log('=== Ghanaian Portfolio State ===');
  console.log('Current Theme:', currentTheme);
  console.log('Mobile Menu Open:', isMobileMenuOpen);
  console.log('Active Filter:', activeFilter);
  console.log('Scroll Position:', window.scrollY);
  console.log('Viewport:', {
    width: window.innerWidth,
    height: window.innerHeight
  });
  console.log('Local Submissions:', JSON.parse(localStorage.getItem('portfolio-submissions') || '[]').length);
}

// Expose logState function globally for debugging
window.logState = logState;

// ========================================
// AFRICAN-SPECIFIC FEATURES
// ========================================

/**
 * Add African time zone support
 */
function getGhanaTime() {
  const options = {
    timeZone: 'Africa/Accra',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-GH', options).format(new Date());
}

/**
 * Add local currency formatting
 */
function formatGhanaCurrency(amount) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS'
  }).format(amount);
}

/**
 * Add local number formatting
 */
function formatGhanaNumber(number) {
  return new Intl.NumberFormat('en-GH').format(number);
}

// ========================================
// EXPORT FOR MODULE SYSTEMS (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initTheme,
    initMobileMenu,
    initProjectFilter,
    initScrollAnimations,
    initBackToTop,
    showNotification,
    logState,
    formatGhanaCurrency,
    formatGhanaNumber,
    getGhanaTime
  };
}