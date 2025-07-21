// Enhanced Photography Portfolio JavaScript

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeSmoothScroll();
  initializeEventHandlers();
  initializeAnimations();
  initializeFormHandling();
  initializeGalleryLightbox();
  initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Smooth scroll for navigation links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        e.preventDefault();
        
        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Smooth scroll to target
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

// Event handlers
function initializeEventHandlers() {
  // Event button actions with enhanced feedback
  const eventButtons = document.querySelectorAll('.event-button');
  eventButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading state
      const originalText = btn.textContent;
      btn.textContent = 'Processing...';
      btn.style.opacity = '0.7';
      
      setTimeout(() => {
        if (btn.textContent.includes('Register')) {
          showNotification('Registration feature coming soon! Please contact us for more information.', 'info');
        } else {
          showNotification('More information will be available soon!', 'info');
        }
        
        // Restore button
        btn.textContent = originalText;
        btn.style.opacity = '1';
      }, 1000);
    });
  });

  // Social media links with proper URLs
  const socialLinks = document.querySelectorAll('.social-links a');
  const socialUrls = [
    'https://facebook.com/',
    'https://www.instagram.com/aasifraza_0786/?hl=en#',
    'https://x.com/AashifR88038',
    'https://youtube.com/channel/INVALID_CHANNEL_ID'
  ];
  
  socialLinks.forEach((link, index) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('href', socialUrls[index] || '#');
    
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        showNotification('Social media links will be updated soon!', 'info');
      }
    });
  });
}

// Animations and scroll effects
function initializeAnimations() {
  // Intersection Observer for fade-in animations
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

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.gallery-item, .exhibit-item, .event-card, .contact-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Scroll effects
function initializeScrollEffects() {
  // Navbar background on scroll
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    let current = '';
    const scrollTop = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Form handling
function initializeFormHandling() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Initialize EmailJS
      if (window.emailjs) {
        emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
        emailjs.sendForm(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_TEMPLATE_ID,
          this
        )
          .then(() => {
            showNotification(
              `Hi ${this.elements['name'].value},<br><br>
              Thank you for reaching out! 🙌<br><br>
              We’ve received your message:<br>
              <blockquote>"${this.elements['message'].value}"</blockquote><br>
              We’ll get back to you as soon as possible, typically within 24 hours.<br><br>
              Best regards,<br>
              Md Aashif Raza<br>
              <hr>
              <small>This is an automated confirmation email. Please do not reply directly to this message.</small>`,
              'success'
            );
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, (error) => {
            showNotification('Sorry, there was an error sending your message. Please try again later.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          });
      } else {
        showNotification('Email service not loaded. Please try again later.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

// Gallery lightbox functionality
function initializeGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const title = this.querySelector('.gallery-overlay h3')?.textContent || 'Gallery Image';
      
      openLightbox(img.src, title);
    });
  });
}

// Lightbox functionality
function openLightbox(imageSrc, title) {
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img src="${imageSrc}" alt="${title}">
      <h3>${title}</h3>
    </div>
  `;
  
  // Add lightbox styles
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .lightbox.show {
      opacity: 1;
    }
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }
    .lightbox-content img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 10px;
    }
    .lightbox-content h3 {
      color: white;
      text-align: center;
      margin-top: 20px;
      font-size: 1.2rem;
    }
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: white;
      font-size: 30px;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .lightbox-close:hover {
      color: #ffd700;
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(lightbox);
  
  // Show lightbox
  setTimeout(() => lightbox.classList.add('show'), 10);
  
  // Close lightbox functionality
  const closeLightbox = () => {
    lightbox.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(lightbox);
      document.head.removeChild(style);
    }, 300);
  };
  
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Close on escape key
  document.addEventListener('keydown', function closeOnEscape(e) {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', closeOnEscape);
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add notification styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10001;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 350px;
    }
    .notification.show {
      transform: translateX(0);
    }
    .notification-content {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .notification-message {
      flex: 1;
      margin-right: 15px;
    }
    .notification-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
      transition: color 0.3s ease;
    }
    .notification-close:hover {
      color: #333;
    }
    .notification-success {
      border-left: 4px solid #28a745;
    }
    .notification-info {
      border-left: 4px solid #17a2b8;
    }
    .notification-warning {
      border-left: 4px solid #ffc107;
    }
    .notification-error {
      border-left: 4px solid #dc3545;
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }
    }, 300);
  }, 5000);
  
  // Close button functionality
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }
    }, 300);
  });
}

// Utility functions
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

// Performance optimization
const optimizedScrollHandler = debounce(function() {
  // Add any scroll-based optimizations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Export functions for potential external use
window.PhotographyPortfolio = {
  showNotification,
  openLightbox,
  debounce
};
