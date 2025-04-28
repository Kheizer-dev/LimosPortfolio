document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Dark Mode
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
});

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  // Toggle nav visibility
  navLinks.classList.toggle('active');
  
  // Animate burger icon
  burger.classList.toggle('active');
  
  // Optional: Prevent scrolling when menu is open
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

//Underlines in navigation menu
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

//Decrypting effect
document.addEventListener('DOMContentLoaded', () => {
    const decodingText = document.getElementById('decoding-text');
    const sentences = [
        "Welcome to My Portfolio",
        "I'm a Web Developer",
        "A Software Developer",
        "A Tech Enthusiast",
        "A Problem Solver",
        "A Lifelong Learner",
        "Likes to Create Solutions to Problems"
    ];
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDecoding = true;
    let delay = 100;

    const randomChar = () => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
        return chars[Math.floor(Math.random() * chars.length)];
    };

    const decodeText = () => {
        const currentSentence = sentences[sentenceIndex];
        if (isDecoding) {
            // Show random characters for the entire sentence
            const decodedText = currentSentence
                .split('')
                .map((char, index) => (index < charIndex ? char : randomChar()))
                .join('');
            decodingText.textContent = decodedText;
            decodingText.setAttribute('data-text', decodedText); // Update glitch effect text

            // Move to the next character
            charIndex++;
            delay = 100;

            // If all characters are decoded, pause before revealing the next sentence
            if (charIndex > currentSentence.length) {
                isDecoding = false;
                delay = 2000; // Pause before starting the next sentence
            }
        } else {
            // Reset for the next sentence
            charIndex = 0;
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            isDecoding = true;
            delay = 500; // Short delay before starting the next sentence
        }

        setTimeout(decodeText, delay);
    };

    decodeText();
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
  const form = this;
  const btn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const spinner = document.getElementById('btn-spinner');
  const status = document.getElementById('form-status');
  
  // Prevent default if JavaScript is enabled
  e.preventDefault();
  
  // Show loading state
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  spinner.style.display = 'block';
  status.style.display = 'none';
  
  // Submit form data
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Success message
      status.textContent = 'Message sent successfully!';
      status.className = 'success';
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    // Error message
    status.textContent = 'Failed to send message. Please email me directly at your@email.com';
    status.className = 'error';
    console.error('Error:', error);
  })
  .finally(() => {
    // Reset button state
    status.style.display = 'block';
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    spinner.style.display = 'none';
  });
});

//Smooth Trqnsition
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

// ===== Project Card Flip Animation =====
document.querySelectorAll('.project-card').forEach(card => {
    // Add touch support for mobile devices
    card.addEventListener('touchstart', function() {
        this.classList.toggle('hover');
    }, {passive: true});
    
    // Click to flip on desktop (alternative to hover)
    card.addEventListener('click', function() {
        if (window.innerWidth > 768) return; // Only use click on mobile
        this.querySelector('.project-card-inner').style.transform = 
            this.querySelector('.project-card-inner').style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
});

// Handle window resize for better mobile/desktop switching
window.addEventListener('resize', function() {
    document.querySelectorAll('.project-card-inner').forEach(card => {
        if (window.innerWidth > 768) {
            card.style.transform = 'rotateY(0deg)';
        }
    });
});

// ===== Console Text Animation =====
const consoleText = document.getElementById('console-text');
const bioLines = [
  "> Khen Ashley D. Limos\n",
  "> Professional Summary:\n",
  "  - Information Technology Student\n", 
  "  - Consistent Academic Achiever\n",
  "  - Technical & Soft Skills Developer\n",
  "> Key Attributes:\n",
  "  - Detail-oriented\n",
  "  - Fast Learner\n",
  "  - Collaborative Team Player",
];

let lineIndex = 0;
let currentLine = 0;
let currentChar = 0;
let isNewLine = false;

function typeConsole() {
  if (lineIndex < bioLines.length) {
    const line = bioLines[lineIndex];
    
    if (currentChar < line.length) {
      // Type character by character
      consoleText.textContent += line[currentChar];
      currentChar++;
      setTimeout(typeConsole, line[currentChar] === '\n' ? 100 : 50);
    } else {
      // Move to next line
      lineIndex++;
      currentChar = 0;
      setTimeout(typeConsole, 200);
    }
  } else {
    // Add blinking cursor after completion
    consoleText.innerHTML += '<span class="blinking-cursor">_</span>';
  }
}

// Initialize typing effect
setTimeout(typeConsole, 1000);

// ===== Circuit Board Animation =====
document.addEventListener('DOMContentLoaded', function() {
  const svg = document.getElementById('circuit-board');
  const tooltip = document.querySelector('.circuit-tooltip');
  
  // Skill data
  const skills = [
    { name: "Communication", level: 92, color: "#4a90e2", connections: [1, 2] },
    { name: "Teamwork", level: 88, color: "#00d4ff", connections: [0, 3] },
    { name: "Problem Solving", level: 95, color: "#7fdbff", connections: [0, 4] },
    { name: "Creativity", level: 90, color: "#ff851b", connections: [1, 4] },
    { name: "Adaptability", level: 85, color: "#ff4136", connections: [2, 3] },
    { name: "Time Management", level: 93, color: "#2ecc40", connections: [1, 4] }
  ];

  // Generate random circuit layout positions
  const positions = [];
  const padding = 100;
  for (let i = 0; i < skills.length; i++) {
    positions.push({
      x: padding + Math.random() * (700 - padding * 2),
      y: padding + Math.random() * (300 - padding * 2)
    });
  }

  // Draw circuit paths
  skills.forEach((skill, i) => {
    skill.connections.forEach(conn => {
      if (conn > i) { // Prevent duplicate paths
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const start = positions[i];
        const end = positions[conn];
        
        // Create curved path
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const ctrlX = midX + (Math.random() - 0.5) * 100;
        const ctrlY = midY + (Math.random() - 0.5) * 100;
        
        path.setAttribute("d", `M${start.x},${start.y} Q${ctrlX},${ctrlY} ${end.x},${end.y}`);
        path.classList.add("circuit-path");
        path.style.stroke = skills[i].color;
        svg.appendChild(path);
      }
    });
  });

  // Draw circuit nodes (skills)
  skills.forEach((skill, i) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${positions[i].x},${positions[i].y})`);
    
    // Outer glow
    const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    glow.setAttribute("r", "24");
    glow.setAttribute("fill", skill.color);
    glow.setAttribute("opacity", "0.3");
    glow.setAttribute("class", "circuit-glow");
    group.appendChild(glow);
    
    // Main node
    const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    node.setAttribute("r", "20");
    node.setAttribute("fill", skill.color);
    node.setAttribute("class", "circuit-node");
    group.appendChild(node);
    
    // Skill abbreviation text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dy", "5");
    text.setAttribute("fill", "white");
    text.setAttribute("font-family", "'Courier New', monospace");
    text.setAttribute("font-weight", "bold");
    text.textContent = skill.name.split(' ').map(w => w[0]).join('');
    group.appendChild(text);
    
    // Add interactivity
    group.addEventListener('mouseenter', () => showTooltip(skill, positions[i]));
    group.addEventListener('mouseleave', hideTooltip);
    
    svg.appendChild(group);
  });

  // Add random smaller components
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1000;
    const y = Math.random() * 700;
    const type = Math.random() > 0.5 ? "rect" : "circle";
    
    const component = document.createElementNS("http://www.w3.org/2000/svg", type);
    if (type === "rect") {
      component.setAttribute("width", "8");
      component.setAttribute("height", "16");
      component.setAttribute("x", x);
      component.setAttribute("y", y);
      component.setAttribute("rx", "2");
    } else {
      component.setAttribute("r", "6");
      component.setAttribute("cx", x);
      component.setAttribute("cy", y);
    }
    
    component.setAttribute("fill", "#4a90e2");
    component.setAttribute("opacity", "0.6");
    svg.appendChild(component);
  }

  // Tooltip functions
  function showTooltip(skill, pos) {
    tooltip.innerHTML = `
      <h3>${skill.name}</h3>
      <div class="skill-meter">
        <div class="skill-meter-fill" style="width: ${skill.level}%"></div>
      </div>
      <p>${getSkillDescription(skill.name)}</p>
    `;
    
    tooltip.style.left = `${pos.x + 30}px`;
    tooltip.style.top = `${pos.y}px`;
    tooltip.style.opacity = "1";
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  function getSkillDescription(skillName) {
    const descriptions = {
      "Communication": "Effectively conveys ideas through verbal and written means across all organizational levels.",
      "Teamwork": "Collaborates seamlessly with cross-functional teams to achieve common goals.",
      "Problem Solving": "Systematically breaks down complex issues to develop innovative solutions.",
      "Creativity": "Generates unique ideas and approaches to overcome challenges.",
      "Adaptability": "Quickly adjusts to new environments and changing requirements.",
      "Time Mgmt": "Efficiently prioritizes and executes tasks to meet deadlines."
    };
    return descriptions[skillName] || "Highly developed professional skill.";
  }

  // Animate paths
  const paths = document.querySelectorAll('.circuit-path');
  paths.forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length;
    path.style.transition = `stroke-dashoffset ${2 + i * 0.5}s ease-in-out`;
    setTimeout(() => {
      path.style.strokeDashoffset = '0';
    }, 100);
  });
});

// Enhanced Floating Images Animation
function initFloatingImages() {
  const heroSection = document.querySelector('.hero');
  const floatingImages = document.querySelectorAll('.floating-image');
  const speed = 1.5; // Reduced speed for smoother movement
  const maxRotation = 15; // Max rotation angle

  // Set random initial positions and velocities
  floatingImages.forEach(img => {
      // Random starting position within hero section
      const startX = Math.random() * (heroSection.offsetWidth - img.offsetWidth);
      const startY = Math.random() * (heroSection.offsetHeight - img.offsetHeight);
      
      // Random velocity/direction
      const velocityX = (Math.random() - 0.5) * speed;
      const velocityY = (Math.random() - 0.5) * speed;
      
      // Store animation properties on the element
      img.floatingData = {
          x: startX,
          y: startY,
          vx: velocityX,
          vy: velocityY,
          rotation: Math.random() * maxRotation * 2 - maxRotation,
          width: img.offsetWidth,
          height: img.offsetHeight
      };

      // Set initial position
      img.style.position = 'absolute';
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;
      img.style.transform = `rotate(${img.floatingData.rotation}deg)`;
      img.style.willChange = 'transform, left, top'; // Optimize for performance
  });

  // Animation loop
  function animateFloatingImages() {
    const heroRect = heroSection.getBoundingClientRect();
      
      floatingImages.forEach(img => {
          const data = img.floatingData;
          
          // Update position
          data.x += data.vx;
          data.y += data.vy;
          
          // Boundary collision - Left/Right
          if (data.x <= 0) {
              data.x = 0;
              data.vx *= -1;
              data.rotation = (Math.random() * maxRotation) * Math.sign(data.vx);
          } else if (data.x + data.width >= heroRect.width) {
              data.x = heroRect.width - data.width;
              data.vx *= -1;
              data.rotation = (Math.random() * -maxRotation) * Math.sign(data.vx);
          }
          
          // Boundary collision - Top/Bottom
          if (data.y <= 0) {
              data.y = 0;
              data.vy *= -1;
              data.rotation = (Math.random() * maxRotation) * Math.sign(data.vy);
          } else if (data.y + data.height >= heroRect.height) {
              data.y = heroRect.height - data.height;
              data.vy *= -1;
              data.rotation = (Math.random() * -maxRotation) * Math.sign(data.vy);
          }
          
          // Apply new position and rotation
          img.style.left = `${data.x}px`;
          img.style.top = `${data.y}px`;
          img.style.transform = `rotate(${data.rotation}deg)`;
          
          // Gentle pulsing scale effect
          const pulse = Math.sin(Date.now() / 2000) * 0.05 + 1;
          img.style.transform += ` scale(${pulse})`;
      });
      
      requestAnimationFrame(animateFloatingImages);
  }

  // Start animation
  animateFloatingImages();

  // Make images draggable (optional)
  floatingImages.forEach(img => {
      let isDragging = false;
      let offsetX, offsetY;
      
      img.addEventListener('mousedown', (e) => {
          isDragging = true;
          offsetX = e.clientX - img.floatingData.x;
          offsetY = e.clientY - img.floatingData.y;
          img.style.cursor = 'grabbing';
          img.style.zIndex = '100';
          img.style.transform = img.style.transform.replace('scale(1)', 'scale(1.2)');
      });
      
      document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          
          img.floatingData.x = e.clientX - offsetX;
          img.floatingData.y = e.clientY - offsetY;
          img.style.left = `${img.floatingData.x}px`;
          img.style.top = `${img.floatingData.y}px`;
      });
      
      document.addEventListener('mouseup', () => {
          if (!isDragging) return;
          isDragging = false;
          img.style.cursor = 'grab';
          img.style.zIndex = '';
          img.style.transform = img.style.transform.replace('scale(1.2)', 'scale(1)');
          
          // Give new random velocity when released
          img.floatingData.vx = (Math.random() - 0.5) * speed * 2;
          img.floatingData.vy = (Math.random() - 0.5) * speed * 2;
      });
      
      img.style.cursor = 'grab';
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initFloatingImages);

// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize logic
  }, 100);
});

// Throttle animation frame events
let lastAnimationTime = 0;
function animateFloatingImages(timestamp) {
  if (timestamp - lastAnimationTime > 16) { // ~60fps
    // Animation logic
    lastAnimationTime = timestamp;
  }
  requestAnimationFrame(animateFloatingImages);
}

// Add keyboard navigation for dark mode toggle
darkModeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    darkModeToggle.click();
  }
});

// Improve focus management for mobile menu
burger.addEventListener('click', () => {
  if (navLinks.classList.contains('active')) {
    // Focus first nav link when menu opens
    document.querySelector('.nav-links a').focus();
  }
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Floating contact button functionality
  const floatingContactBtn = document.createElement('div');
  floatingContactBtn.className = 'floating-contact-btn';
  floatingContactBtn.innerHTML = '<i class="fas fa-envelope"></i>';
  document.body.appendChild(floatingContactBtn);

  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-header">
            <h2>Get In Touch</h2>
            <p>Have a project in mind or want to discuss opportunities? Send me a message!</p>
        </div>
        <form id="modal-contact-form" action="https://formspree.io/f/xyzelzqe" method="POST">
            <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required>
                <i class="fas fa-user"></i>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required>
                <i class="fas fa-envelope"></i>
            </div>
            
            <div class="form-group">
                <label for="message">Your Message</label>
                <textarea id="message" name="message" placeholder="Hello Khen, I'd like to talk about..." required></textarea>
                <i class="fas fa-comment"></i>
            </div>
            
            <input type="text" name="_gotcha" style="display:none">
            <input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">
            <input type="hidden" name="_subject" value="New message from portfolio!">
            
            <button type="submit" id="modal-submit-btn" class="submit-btn">
                <span id="modal-btn-text">Send Message</span>
                <div id="modal-btn-spinner" class="spinner"></div>
                <i class="fas fa-paper-plane"></i>
            </button>
            
            <div id="modal-form-status"></div>
        </form>
    </div>
`;
  document.body.appendChild(modal);

  // Move the original contact form's event listener to the modal form
  const originalForm = document.getElementById('contact-form');
  const modalForm = document.getElementById('modal-contact-form');
  if (originalForm && modalForm) {
      modalForm.addEventListener('submit', function(e) {
          // Copy the original form submission logic here
          const form = this;
          const btn = document.getElementById('modal-submit-btn');
          const btnText = document.getElementById('modal-btn-text');
          const spinner = document.getElementById('modal-btn-spinner');
          const status = document.getElementById('modal-form-status');
          
          e.preventDefault();
          
          btn.disabled = true;
          btnText.textContent = 'Sending...';
          spinner.style.display = 'block';
          status.style.display = 'none';
          
          fetch(form.action, {
              method: 'POST',
              body: new FormData(form),
              headers: {
                  'Accept': 'application/json'
              }
          })
          .then(response => {
              if (response.ok) {
                  status.textContent = 'Message sent successfully!';
                  status.className = 'success';
                  form.reset();
                  // Close modal after 2 seconds
                  setTimeout(() => {
                      modal.classList.remove('active');
                  }, 2000);
              } else {
                  throw new Error('Form submission failed');
              }
          })
          .catch(error => {
              status.textContent = 'Failed to send message. Please try again later.';
              status.className = 'error';
          })
          .finally(() => {
              btn.disabled = false;
              btnText.textContent = 'Send Message';
              spinner.style.display = 'none';
              status.style.display = 'block';
          });
      });
  }

  // Modal toggle functionality
  floatingContactBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });

  // Close modal when clicking X or outside
  modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('contact-modal') || e.target.classList.contains('close-modal')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
      }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
      }
  });
});

// Add input focus effects
document.addEventListener('DOMContentLoaded', function() {
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const icon = group.querySelector('i');
      
      input.addEventListener('focus', () => {
          group.classList.add('focused');
          if (icon) icon.style.color = '#1abc9c';
      });
      
      input.addEventListener('blur', () => {
          group.classList.remove('focused');
          if (icon) icon.style.color = '';
      });
  });
  
  // Add character counter for textarea
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
      const charCounter = document.createElement('div');
      charCounter.className = 'char-counter';
      charCounter.textContent = '0/500';
      messageTextarea.parentNode.appendChild(charCounter);
      
      messageTextarea.addEventListener('input', () => {
          const currentLength = messageTextarea.value.length;
          charCounter.textContent = `${currentLength}/500`;
          
          if (currentLength > 500) {
              charCounter.style.color = '#e74c3c';
          } else {
              charCounter.style.color = '#7f8c8d';
          }
      });
  }
});