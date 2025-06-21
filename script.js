// Advanced Portfolio JavaScript with 3D Animations and Enhanced Interactions
class PortfolioAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupGSAP();
    this.setupScrollAnimations();
    this.setupEnhancedTooltips();
    this.setup3DEffects();
    this.setupRetroBackground();
    this.setupNavigation();
    this.setupCourseworkToggle();
    this.setupFloatingPixels();
  }

  setupLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Hide loading screen with animation
        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            this.startMainAnimations();
          }, 500);
        }, 500);
      }
      loadingProgress.style.width = `${progress}%`;
    }, 100);
  }

  setupGSAP() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set default ease
    gsap.defaults({ ease: "power2.out" });
  }

  setupScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
      const sectionContainer = section.querySelector('.section-3d-container');
      
      gsap.fromTo(sectionContainer, 
        {
          opacity: 0,
          y: 100,
          rotationX: 15,
          rotationY: 5
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
      gsap.fromTo(header,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          rotationY: index % 2 === 0 ? -15 : 15
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 100,
          rotationY: 45,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate RPG items
    const rpgItems = document.querySelectorAll('.rpg-item');
    
    rpgItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 50,
          rotationY: 90,
          scale: 0.5
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  setupEnhancedTooltips() {
    const items = document.querySelectorAll('.rpg-item');
    const tooltip = document.querySelector('.tooltip');
    
    // Rarity stats mapping
    const rarityStats = {
      common: { power: 60, experience: 40 },
      rare: { power: 75, experience: 60 },
      epic: { power: 90, experience: 80 },
      legendary: { power: 100, experience: 100 }
    };

    items.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const name = item.dataset.name;
        const level = item.dataset.level;
        const effect = item.dataset.effect;
        const rarity = item.dataset.rarity;
        const stats = rarityStats[rarity];

        // Update tooltip content
        tooltip.querySelector('.tooltip-name').textContent = name;
        tooltip.querySelector('.tooltip-level').textContent = level;
        tooltip.querySelector('.tooltip-effect').textContent = effect;
        
        // Update rarity badge
        const rarityElement = tooltip.querySelector('.tooltip-rarity');
        rarityElement.textContent = rarity.toUpperCase();
        rarityElement.className = `tooltip-rarity ${rarity}`;

        // Update stat bars
        const statFills = tooltip.querySelectorAll('.stat-fill');
        statFills[0].style.setProperty('--stat-width', `${stats.power}%`);
        statFills[1].style.setProperty('--stat-width', `${stats.experience}%`);

        // Position tooltip
        const rect = item.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 20;

        // Keep tooltip within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
          left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
          top = rect.bottom + 20;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;

        // Show tooltip with animation
        gsap.to(tooltip, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(tooltip, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: "power2.in"
        });
      });
    });
  }

  setup3DEffects() {
    // 3D tilt effect for cards
    const cards = document.querySelectorAll('.experience-card, .rpg-item, .project-item');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });

    // Parallax effect for profile image
    const profileImage = document.querySelector('.image-frame');
    if (profileImage) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(profileImage, {
          rotationY: x,
          rotationX: -y,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }

  setupRetroBackground() {
    // Create floating pixels
    const floatingPixels = document.querySelector('.floating-pixels');
    
    for (let i = 0; i < 20; i++) {
      const pixel = document.createElement('div');
      pixel.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${this.getRandomNeonColor()};
        border-radius: 50%;
        animation: floatPixel ${8 + Math.random() * 4}s linear infinite;
        animation-delay: ${Math.random() * 8}s;
        left: ${Math.random() * 100}%;
        top: 100vh;
      `;
      floatingPixels.appendChild(pixel);
    }

    // Add more scanlines
    const scanlines = document.querySelector('.scanlines');
    for (let i = 0; i < 5; i++) {
      const scanline = document.createElement('div');
      scanline.style.cssText = `
        position: absolute;
        width: 100%;
        height: 1px;
        background: rgba(0, 255, 255, 0.1);
        top: ${i * 20}%;
        animation: scanlines ${0.1 + Math.random() * 0.1}s linear infinite;
        animation-delay: ${Math.random() * 0.1}s;
      `;
      scanlines.appendChild(scanline);
    }
  }

  setupNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetSection, offsetY: 80 },
            ease: "power2.inOut"
          });
        }
      });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => this.updateActiveNav(section.id),
        onEnterBack: () => this.updateActiveNav(section.id)
      });
    });
  }

  updateActiveNav(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  setupCourseworkToggle() {
    document.querySelectorAll('.coursework-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const courseworkList = button.nextElementSibling;
        const isVisible = courseworkList.style.display === 'block';
        
        if (isVisible) {
          gsap.to(courseworkList, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              courseworkList.style.display = 'none';
            }
          });
        } else {
          courseworkList.style.display = 'block';
          gsap.fromTo(courseworkList, 
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        }
      });
    });
  }

  setupFloatingPixels() {
    // Create additional floating elements
    const body = document.body;
    
    for (let i = 0; i < 15; i++) {
      const element = document.createElement('div');
      element.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${this.getRandomNeonColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: floatPixel ${10 + Math.random() * 10}s linear infinite;
        animation-delay: ${Math.random() * 10}s;
        left: ${Math.random() * 100}%;
        top: 100vh;
      `;
      body.appendChild(element);
    }
  }

  getRandomNeonColor() {
    const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff0080', '#8000ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  startMainAnimations() {
    // Animate name on load
    const nameParts = document.querySelectorAll('.name-part');
    gsap.fromTo(nameParts,
      { opacity: 0, y: 50, rotationY: 90 },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0, 
        duration: 1.5, 
        stagger: 0.3,
        ease: "back.out(1.7)"
      }
    );

    // Animate bio lines
    const bioLines = document.querySelectorAll('.bio-line');
    gsap.fromTo(bioLines,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        stagger: 0.5,
        ease: "power2.out"
      }
    );

    // Animate social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    gsap.fromTo(socialIcons,
      { opacity: 0, scale: 0, rotation: 180 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "back.out(1.7)"
      }
    );

    // Animate profile image
    const profileImage = document.querySelector('.image-frame');
    if (profileImage) {
      gsap.fromTo(profileImage,
        { opacity: 0, scale: 0.5, rotationY: -90 },
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: -15, 
          duration: 1.5,
          ease: "back.out(1.7)"
        }
      );
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioAnimations();
});

// Add some additional CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes floatPixel {
    0% { 
      transform: translateY(100vh) rotate(0deg); 
      opacity: 0; 
    }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { 
      transform: translateY(-100px) rotate(360deg); 
      opacity: 0; 
    }
  }

  @keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  .nav-link.active {
    color: var(--neon-blue) !important;
    text-shadow: 0 0 10px var(--neon-blue) !important;
    transform: translateY(-2px) !important;
  }

  .nav-link.active::before {
    left: 100% !important;
  }
`;
document.head.appendChild(style);

