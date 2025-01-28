// Simple Intersection Observer for fade-in animations
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
  
    const options = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          obs.unobserve(entry.target);
        }
      });
    }, options);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  