// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Navigation elements
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksArray = document.querySelectorAll('.nav-links a');
  
  // Service elements
  const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
  
  // Form elements
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  // Navigation toggle for mobile
  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Animate toggle button
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when a link is clicked
  navLinksArray.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      // Reset toggle button
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
  
  // Smooth scrolling for navigation links
  navLinksArray.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinksArray.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get the target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Only proceed if target section exists
      if (targetSection) {
        // Calculate position accounting for fixed navbar
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Toggle service details
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const detailsElement = document.getElementById(targetId);
      
      // Toggle active class
      detailsElement.classList.toggle('active');
      
      // Update button text
      if (detailsElement.classList.contains('active')) {
        this.textContent = 'Show Less';
      } else {
        this.textContent = 'Learn More';
      }
    });
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to a server here
      // For this demo, we'll just show the success message
      
      // Hide the form and show success message
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      
      // Clear form fields
      contactForm.reset();
    });
  }
  
  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    const navbarHeight = navbar.offsetHeight;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 20; // 20px buffer
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const id = section.getAttribute('id');
        
        // Remove active class from all links
        navLinksArray.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Update navbar background on scroll
  function updateNavbarBackground() {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', function() {
    updateActiveNavLink();
    updateNavbarBackground();
  });
  
  // Initialize
  updateNavbarBackground();
  updateActiveNavLink();
});
