// Tab functionality for Experience & Education section
document.addEventListener('DOMContentLoaded', () => {
  // Loading animation
  const loadingOverlay = document.getElementById('loading-overlay');
  const fadeElements = document.querySelectorAll('.hero-section, .intro-section, .skills-preview, nav, .section');
  
  // Add fade-in class to elements
  fadeElements.forEach(element => {
    element.classList.add('fade-in');
  });
  
  // Hide loading overlay and show content with staggered animation
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      
      // Staggered animation for content
      fadeElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('active');
        }, 300 + (index * 150)); // Stagger the animations
      });
      
      // Staggered animation for testimonials
      const testimonials = document.querySelectorAll('.testimonial');
      testimonials.forEach((testimonial, index) => {
        setTimeout(() => {
          testimonial.style.opacity = '1';
          testimonial.style.transform = 'translateY(0)';
        }, 1500 + (index * 300)); // Start after main content with longer delays between testimonials
      });
    }, 800); // Delay before hiding loader
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      
      // Toggle between hamburger and X icon
      const icon = mobileMenuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
          navLinks.classList.remove('show');
          const icon = mobileMenuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 600) {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          const icon = mobileMenuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
  
  // Tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      
      // Remove active class from all buttons and tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to current button and tab
      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });

  // Navigation active state
  const sections = document.querySelectorAll('section');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-item, .testimonial');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 50) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial setup for animations
  document.querySelectorAll('.project-card, .timeline-item, .skill-item, .testimonial').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
      navLinks.classList.remove('show');
      const icon = mobileMenuToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
  
  // Testimonial ratings hover effect
  const testimonialRatings = document.querySelectorAll('.testimonial-rating');
  testimonialRatings.forEach(rating => {
    const stars = rating.querySelectorAll('i');
    
    rating.addEventListener('mouseover', () => {
      stars.forEach(star => {
        star.style.transform = 'scale(1.2)';
      });
    });
    
    rating.addEventListener('mouseout', () => {
      stars.forEach(star => {
        star.style.transform = 'scale(1)';
      });
    });
  });
}); 