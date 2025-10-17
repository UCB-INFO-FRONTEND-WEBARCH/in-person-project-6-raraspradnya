// Week 8: Migrating Your Interactive Portfolio to React
// This starter file guides you through migrating your Week 7 vanilla JavaScript portfolio to React

import './App.css'

function App() {
  // ============================================
  // PART 1: EVENT HANDLER FUNCTIONS
  // ============================================
  // TODO: Move your Week 7 event handler functions here
  // In Week 7, you had functions like:
  // - handleNavClick (for smooth scroll)
  // - filterProjects (for project filtering)
  // - handleFormSubmit (for form validation)
  //
  // HINT: These will be regular JavaScript functions defined inside App component
  // Example from Week 7:
  //   const filterProjects = (category) => {
  //     // Your filtering logic here
  //   }
  
  // TODO: Add smooth scroll handler
  // Replace: navLinks.forEach(link => link.addEventListener('click', ...))
  // With: const handleNavClick = (e) => { ... }
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    };

    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  }
  
  // TODO: Add filter handler
  // Replace: filterButtons.forEach(button => button.addEventListener('click', ...))
  // With: const handleFilterClick = (category) => { ... }
  const handleFilterClick = (button) => {
    const filterValue = button.currentTarget.getAttribute('data-filter');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      if (card.getAttribute('data-category') === filterValue || filterValue === 'all'){
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })

    document.querySelectorAll('.filter-btn').forEach(btn =>{
      btn.classList.remove('active')
    })
    e.currentTarget.classList.add('active');
  }
  
  // TODO: Add form validation functions
  // You'll need: isValidEmail, showError, clearError, showSuccess
  // These can stay mostly the same!
  // Function to validate email format
  function isValidEmail(email) {
      // Hint: Use a simple regex or check for @ and .
      // Example: return email.includes('@') && email.includes('.');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  // Function to show error message
  function showError(input, message) {
      // TODO:
      // 1. Create a span element for error message
      // 2. Set its textContent to the message
      // 3. Add a class 'error-message' for styling
      // 4. Append it after the input field
      // Hint: Use createElement, classList.add, and appendChild
      clearError(input);
      const errorElement = document.createElement("span");
      errorElement.className = 'error-message';
      errorElement.textContent = message;

      input.classList.add('error');
      input.classList.remove('success');

      input.parentElement.appendChild(errorElement);
  }

  // Function to clear error message
  function clearError(input) {
      // TODO:
      // 1. Find the error message element (next sibling)
      // 2. Remove it from the DOM
      // Hint: Use querySelector or nextElementSibling and remove()
      const errorElement = input.parentElement.querySelector('.error-message');
      if (errorElement){
          errorElement.remove();
      }
      input.classList.remove('error');
  }

  // Show success state
  function showSuccess(input) {
      clearError(input);
      input.classList.add('success');
      input.classList.remove('error');
  }

  // TODO: Add form submit handler
  // Replace: contactForm.addEventListener('submit', ...)
  // With: const handleFormSubmit = (e) => { ... }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    if (nameInput.value.trim().length <2 || !isValidEmail(emailInput.value) || messageInput.value.trim().length < 10){
      isValid = false;
    }

    if (isValid){
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Thank you! Your message has been sent successfully.';

      contactForm.appendChild(successMsg);

      setTimeout(() => {
          contactForm.reset();
          successMsg.remove();
          document.querySelectorAll('.success').forEach(input =>{
              input.classList.remove('success');
          })
      }, 3000);

    }
  }
  
  // Scroll event for active nav and skill animations
  const handleScroll = () => {
    // Active nav highlighting
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link =>
          link.classList.remove('active')
        );
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  // Attach scroll listener when component loads
  window.addEventListener('scroll', handleScroll); 

  const handleMobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  };

  // ============================================
  // PART 2: JSX RETURN STATEMENT
  // ============================================
  // TODO: Copy your Week 7 HTML structure here
  // Remember to convert HTML to JSX:
  // - class → className
  // - onclick → onClick
  // - onsubmit → onSubmit
  // - for → htmlFor
  // - All event attributes use camelCase
  //
  // IMPORTANT: Put EVERYTHING in this one return statement!
  // This week we're building a MONOLITHIC component (one big component)
  // Week 9 will teach you how to break this into smaller pieces

  return (
    <div className="portfolio">
      {/* TODO: Add your navigation here */}
      {/* HINT: Replace <a href="#home" class="nav-link"> with <a href="#home" className="nav-link"> */}
      {/* HINT: Replace onclick with onClick={handleNavClick} */}
      <nav id="navbar">
          <div className="nav-brand">
              <span>Alex Johnson</span>
          </div>
          <ul className="nav-menu">
              <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
              <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
              <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
              <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
              <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
          </ul>
          <div className="nav-toggle" onClick={handleMobileMenuToggle}>
              <span></span>
              <span></span>
              <span></span>
          </div>
      </nav>

      {/* TODO: Add your hero section here */}
      <section id="home" className="hero">
          <div className="hero-content">
              <h1 className="hero-title">Alex Johnson</h1>
              <p className="hero-subtitle">Frontend Developer & UI Designer</p>
              <p className="hero-tagline">Creating beautiful, responsive web experiences with modern technologies</p>
              <div className="hero-buttons">
                  <a href="#projects" className="btn btn-primary">View Projects</a>
                  <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
          </div>
      </section>

      {/* TODO: Add your about section here */}
      <section id="about" className="section">
          <div className="container">
              <h2>About Me</h2>
              <div className="about-grid">
                  <div className="about-text">
                      <p>I'm a passionate frontend developer with 3 years of experience creating engaging digital experiences. I specialize in React, modern CSS, and responsive design patterns that work beautifully across all devices.</p>
                      <div className="about-details">
                          <div className="detail-item">
                              <span className="detail-icon">📍</span>
                              <span>San Francisco, CA</span>
                          </div>
                          <div className="detail-item">
                              <span className="detail-icon">✉️</span>
                              <a href="mailto:alex@example.com">alex@example.com</a>
                          </div>
                          <div className="detail-item">
                              <span className="detail-icon">📱</span>
                              <span>(555) 123-4567</span>
                          </div>
                      </div>
                  </div>
                  <div className="about-availability">
                      <h3>Currently Available For:</h3>
                      <div className="availability-tags">
                          <span className="tag tag-available">Freelance</span>
                          <span className="tag tag-available">Full-Time</span>
                          <span className="tag tag-available">Remote</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* TODO: Add your skills section here */}
      <section id="skills" className="section section-alt">
          <div className="container">
              <h2>Skills & Technologies</h2>
              <div className="skills-grid">
                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">⚛️</span>
                          <h3 className="skill-name">React</h3>
                      </div>
                      <div className="skill-category">Frontend Framework</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '90%' }}></div>
                      </div>
                      <span className="skill-percentage">90%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🎨</span>
                          <h3 className="skill-name">CSS3</h3>
                      </div>
                      <div className="skill-category">Styling</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '95%' }}></div>
                      </div>
                      <span className="skill-percentage">95%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">📱</span>
                          <h3 className="skill-name">Responsive Design</h3>
                      </div>
                      <div className="skill-category">Design</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '88%' }}></div>
                      </div>
                      <span className="skill-percentage">88%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🚀</span>
                          <h3 className="skill-name">JavaScript</h3>
                      </div>
                      <div className="skill-category">Programming</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '85%' }}></div>
                      </div>
                      <span className="skill-percentage">85%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🎯</span>
                          <h3 className="skill-name">Figma</h3>
                      </div>
                      <div className="skill-category">Design Tools</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '80%' }}></div>
                      </div>
                      <span className="skill-percentage">80%</span>
                  </div>

                  <div className="skill-card">
                      <div className="skill-header">
                          <span className="skill-icon">🌐</span>
                          <h3 className="skill-name">Node.js</h3>
                      </div>
                      <div className="skill-category">Backend</div>
                      <div className="skill-level">
                          <div className="skill-progress" style={{ '--skill-level': '75%' }}></div>
                      </div>
                      <span className="skill-percentage">75%</span>
                  </div>
              </div>
          </div>
      </section>

      {/* TODO: Add your projects section here */}
      {/* HINT: For filter buttons, use onClick={() => handleFilterClick('category')} */}
      <section id="projects" className="section">
          <div className="container">
              <h2>Featured Projects</h2>
              <div className="filter-buttons">
                  <button className="filter-btn active" data-filter="all" onClick={handleFilterClick}>All Projects</button>
                  <button className="filter-btn" data-filter="frontend" onClick={handleFilterClick}>Frontend</button>
                  <button className="filter-btn" data-filter="fullstack" onClick={handleFilterClick}>Full-Stack</button>
                  <button className="filter-btn" data-filter="design" onClick={handleFilterClick}>Design</button>
                  <button className="filter-btn" data-filter="webapp" onClick={handleFilterClick}>Web App</button>
              </div>
              <div className="projects-grid">
                  <div className="project-card featured" data-category="fullstack">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/4f46e5/ffffff?text=E-Commerce+App" alt="E-Commerce Platform" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">E-Commerce Platform</h3>
                              <span className="project-category">Full-Stack</span>
                          </div>
                          <p className="project-description">A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.</p>
                          <div className="project-tags">
                              <span className="project-tag">React</span>
                              <span className="project-tag">Node.js</span>
                              <span className="project-tag">MongoDB</span>
                              <span className="project-tag">Stripe</span>
                          </div>
                      </div>
                  </div>

                  <div className="project-card" data-category="frontend">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/059669/ffffff?text=Weather+App" alt="Weather Dashboard" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">Weather Dashboard</h3>
                              <span className="project-category">Frontend</span>
                          </div>
                          <p className="project-description">Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.</p>
                          <div className="project-tags">
                              <span className="project-tag">JavaScript</span>
                              <span className="project-tag">CSS3</span>
                              <span className="project-tag">API</span>
                          </div>
                      </div>
                  </div>

                  <div className="project-card" data-category="webapp">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/dc2626/ffffff?text=Task+Manager" alt="Task Management App" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">Task Management App</h3>
                              <span className="project-category">Web App</span>
                          </div>
                          <p className="project-description">Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.</p>
                          <div className="project-tags">
                              <span className="project-tag">React</span>
                              <span className="project-tag">TypeScript</span>
                              <span className="project-tag">Firebase</span>
                          </div>
                      </div>
                  </div>

                  <div className="project-card" data-category="design">
                      <div className="project-image">
                          <img src="https://via.placeholder.com/400x250/7c3aed/ffffff?text=Portfolio+Site" alt="Portfolio Website" />
                          <div className="project-overlay">
                              <div className="project-links">
                                  <a href="#" className="project-link">
                                      <span>🔗</span> Live Demo
                                  </a>
                                  <a href="#" className="project-link">
                                      <span>💻</span> Code
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="project-content">
                          <div className="project-header">
                              <h3 className="project-title">Creative Portfolio</h3>
                              <span className="project-category">Design</span>
                          </div>
                          <p className="project-description">Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.</p>
                          <div className="project-tags">
                              <span className="project-tag">HTML5</span>
                              <span className="project-tag">CSS3</span>
                              <span className="project-tag">GSAP</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* TODO: Add your contact form here */}
      {/* HINT: Form will use onSubmit={handleFormSubmit} */}
      {/* HINT: Inputs will use onChange for real-time validation */}
      <section id="contact" className="section section-alt">
          <div className="container">
              <h2>Get In Touch</h2>
              <div className="contact-content">
                  <p>I'm always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

                  <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit}>
                      <div className="form-grid">
                          <div className="form-group">
                              <label for="name">Name *</label>
                              <input type="text" id="name" name="name" required />
                          </div>

                          <div className="form-group">
                              <label for="email">Email *</label>
                              <input type="email" id="email" name="email" required />
                          </div>

                          <div className="form-group form-group-full">
                              <label for="subject">Subject</label>
                              <input type="text" id="subject" name="subject" />
                          </div>

                          <div className="form-group form-group-full">
                              <label for="message">Message *</label>
                              <textarea id="message" name="message" rows="5" required></textarea>
                          </div>

                          <div className="form-group form-group-full">
                              <button type="submit" className="btn btn-primary">Send Message</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </section>

      {/* TODO: Add your footer here */}
      <footer className="footer">
          <div className="container">
              <div className="footer-content">
                  <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
                  <div className="social-links">
                      <a href="#" className="social-link">GitHub</a>
                      <a href="#" className="social-link">LinkedIn</a>
                      <a href="#" className="social-link">Twitter</a>
                      <a href="#" className="social-link">Dribbble</a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  )
}

export default App
