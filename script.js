// Tab functionality for Experience & Education section
document.addEventListener('DOMContentLoaded', () => {
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
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Check if we're in the middle of this section
      if (scrollPosition >= (sectionTop - 200) && scrollPosition < (sectionBottom - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    // If we're at the very bottom of the page, highlight the last section
    if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 10) {
      const lastSection = sections[sections.length - 1];
      current = lastSection.getAttribute('id');
    }
    
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
  
  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  let isSubmitting = false; // Prevent double submission
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Prevent double submission
      if (isSubmitting) return;
      isSubmitting = true;
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Hide previous status
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      try {
        // Send email using mailto
        const result = await sendContactForm(data);
        formStatus.className = 'form-status success';
        
        formStatus.innerHTML = `
          <i class="fas fa-envelope"></i>
          Your email client should have opened with a pre-filled message.
          Please send it to complete your contact request.
        `;
        
        formStatus.style.display = 'block';
        
      } catch (error) {
        // Show error message
        formStatus.className = 'form-status error';
        formStatus.innerHTML = `
          <i class="fas fa-exclamation-triangle"></i>
          Failed to open email client. Please contact me directly at
          <a href="mailto:coderzawad@gmail.com">coderzawad@gmail.com</a>
        `;
        formStatus.style.display = 'block';
      } finally {
        // Reset button after a delay to prevent double submission
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          isSubmitting = false;
        }, 2000);
      }
    });
  }
  
  // Send contact form using mailto (most reliable for static sites)
  async function sendContactForm(data) {
    // Use mailto as the primary method for static websites
    return useMailtoFallback(data);
  }
  
  // Fallback to mailto
  function useMailtoFallback(data) {
    const subject = data.subject;
    const body = `Hi Lewis,

${data.message}

Best regards,
${data.name}
${data.email}`;
    
    const mailtoLink = `mailto:coderzawad@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create a temporary link and click it
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    
    return Promise.resolve({ success: true, method: 'mailto' });
  }
  
  // Form validation enhancements
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
  
  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'This field is required');
      return false;
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }
    
    return true;
  }
  
  function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }
  
  function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }
});