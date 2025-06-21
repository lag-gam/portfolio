// Advanced Portfolio JavaScript with Horizontal Scrolling and Enhanced Interactions
class PortfolioAnimations {
  constructor() {
    this.currentSection = 0;
    this.totalSections = 5;
    this.isScrolling = false;
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupGSAP();
    this.setupHorizontalScrolling();
    this.setupEnhancedTooltips();
    this.setup3DEffects();
    this.setupNavigation();
    this.setupCourseworkToggle();
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

  setupHorizontalScrolling() {
    const mainContainer = document.querySelector('.main-container');
    const sections = document.querySelectorAll('.section');
    
    // Disable default scroll behavior
    document.body.style.overflow = 'hidden';
    
    // Handle wheel events for horizontal scrolling
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      isScrolling = true;
      clearTimeout(scrollTimeout);
      
      if (e.deltaY > 0 && this.currentSection < this.totalSections - 1) {
        // Scroll down/right
        this.currentSection++;
        this.scrollToSection(this.currentSection);
      } else if (e.deltaY < 0 && this.currentSection > 0) {
        // Scroll up/left
        this.currentSection--;
        this.scrollToSection(this.currentSection);
      }
      
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800);
    }, { passive: false });

    // Handle keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.currentSection < this.totalSections - 1) {
          this.currentSection++;
          this.scrollToSection(this.currentSection);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.currentSection > 0) {
          this.currentSection--;
          this.scrollToSection(this.currentSection);
        }
      }
    });

    // Handle touch/swipe events for mobile
    let startX = 0;
    let startY = 0;
    
    window.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (isScrolling) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Determine if it's a horizontal or vertical swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0 && this.currentSection < this.totalSections - 1) {
          // Swipe left - go to next section
          this.currentSection++;
          this.scrollToSection(this.currentSection);
        } else if (diffX < 0 && this.currentSection > 0) {
          // Swipe right - go to previous section
          this.currentSection--;
          this.scrollToSection(this.currentSection);
        }
      }
    }, { passive: true });

    // Animate sections on initial load
    sections.forEach((section, index) => {
      const sectionContainer = section.querySelector('.section-3d-container');
      
      gsap.fromTo(sectionContainer, 
        {
          opacity: 0,
          y: 50,
          rotationX: 10,
          rotationY: 5
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2
        }
      );
    });
  }

  scrollToSection(sectionIndex) {
    const mainContainer = document.querySelector('.main-container');
    const translateX = -(sectionIndex * 20); // 20% per section
    
    gsap.to(mainContainer, {
      x: `${translateX}%`,
      duration: 0.8,
      ease: "power2.inOut",
      onStart: () => {
        this.isScrolling = true;
      },
      onComplete: () => {
        this.isScrolling = false;
        this.updateActiveNav(sectionIndex);
        this.animateSectionContent(sectionIndex);
      }
    });
  }

  animateSectionContent(sectionIndex) {
    const sections = document.querySelectorAll('.section');
    const currentSection = sections[sectionIndex];
    
    if (!currentSection) return;
    
    // Animate section header
    const header = currentSection.querySelector('.section-header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }

    // Animate different content based on section type
    switch(sectionIndex) {
      case 0: // About
        this.animateAboutSection();
        break;
      case 1: // Education
        this.animateEducationSection();
        break;
      case 2: // Experience
        this.animateExperienceSection();
        break;
      case 3: // Skills
        this.animateSkillsSection();
        break;
      case 4: // Projects
        this.animateProjectsSection();
        break;
      case 5: // Instagram
        this.animateInstagramSection();
        break;
    }
  }

  animateAboutSection() {
    const nameParts = document.querySelectorAll('.name-part');
    const bioLines = document.querySelectorAll('.bio-line');
    const socialIcons = document.querySelectorAll('.social-icon');
    const profileImage = document.querySelector('.image-frame');

    gsap.fromTo(nameParts,
      { opacity: 0, y: 30, rotationY: 45 },
      { opacity: 1, y: 0, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
    );

    gsap.fromTo(bioLines,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(socialIcons,
      { opacity: 0, scale: 0, rotation: 180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
    );

    if (profileImage) {
      gsap.fromTo(profileImage,
        { opacity: 0, scale: 0.8, rotationY: -45 },
        { opacity: 1, scale: 1, rotationY: -15, duration: 1, ease: "back.out(1.7)" }
      );
    }
  }

  animateEducationSection() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotationY: index % 2 === 0 ? -15 : 15 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.8, delay: index * 0.3, ease: "power2.out" }
      );
    });
  }

  animateExperienceSection() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, rotationY: 45, scale: 0.8 },
        { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 0.8, delay: index * 0.2, ease: "back.out(1.7)" }
      );
    });
  }

  animateSkillsSection() {
    const rpgItems = document.querySelectorAll('.rpg-item');
    
    rpgItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50, rotationY: 90, scale: 0.5 },
        { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 0.6, delay: index * 0.15, ease: "elastic.out(1, 0.5)" }
      );
    });
  }

  animateProjectsSection() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.2, ease: "power2.out" }
      );
    });
  }

  animateInstagramSection() {
    const feedPlaceholder = document.querySelector('.feed-placeholder');
    
    if (feedPlaceholder) {
      gsap.fromTo(feedPlaceholder,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
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
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
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
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        
        gsap.to(profileImage, {
          rotationY: x,
          rotationX: -y,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }

  setupNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentSection = index;
        this.scrollToSection(this.currentSection);
      });
    });
  }

  updateActiveNav(sectionIndex) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
      link.classList.remove('active');
      if (index === sectionIndex) {
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

  startMainAnimations() {
    // Initial animation for the first section
    this.animateSectionContent(0);
    this.updateActiveNav(0);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioAnimations();
});

// Add some additional CSS animations
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--primary-purple) !important;
    text-shadow: 0 0 5px rgba(111, 61, 193, 0.3) !important;
    transform: translateY(-2px) !important;
  }

  .nav-link.active::before {
    left: 100% !important;
  }

  /* Smooth transitions for section changes */
  .section {
    transition: opacity 0.3s ease;
  }

  /* Prevent text selection during scrolling */
  .main-container {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  /* Enable text selection for content */
  .section-content * {
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
  }
`;
document.head.appendChild(style);

