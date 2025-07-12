// Tab functionality for Experience & Education section
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    // Show cursor elements after a short delay
    setTimeout(() => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    }, 1000);
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animate cursor with requestAnimationFrame for smooth motion
    const animateCursor = () => {
      // Smooth animation for dot (faster follow)
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      
      // Smoother animation for outline (slower follow)
      outlineX += (mouseX - outlineX) * 0.2;
      outlineY += (mouseY - outlineY) * 0.2;
      
      // Apply transforms with centering adjustment
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor(); // Start animation loop
    
    // Add active class on clickable elements
    const clickableElements = document.querySelectorAll('a, button, .project-card, .testimonial, .skill-icon');
    
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-active');
        cursorOutline.classList.add('cursor-active');
      });
      
      element.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-active');
        cursorOutline.classList.remove('cursor-active');
      });
    });
    
    // Magnetic effect on buttons and social links
    const magneticElements = document.querySelectorAll('.btn, .social-links a');
    
    magneticElements.forEach(magnetic => {
      magnetic.addEventListener('mousemove', (e) => {
        const rect = magnetic.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Add a subtle transform to the element itself for interactive feedback
        magnetic.style.transform = `translate(${(x - centerX) * 0.05}px, ${(y - centerY) * 0.05}px)`;
      });
      
      magnetic.addEventListener('mouseleave', () => {
        magnetic.style.transform = '';
      });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', (e) => {
      if (e.relatedTarget === null || e.target.nodeName === 'HTML') {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
      }
    });
    
    // Show cursor when it enters the window
    document.addEventListener('mouseover', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
      cursorDot.style.transform += ' scale(0.7)';
      cursorOutline.style.transform += ' scale(0.7)';
      
      setTimeout(() => {
        cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.7)', '');
        cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(0.7)', '');
      }, 100);
    });
  }
  
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