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

  
  const items = document.querySelectorAll(".rpg-item");
  const tooltip = document.querySelector(".tooltip");
  
  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      tooltip.innerHTML = `<strong>${item.dataset.name} (${item.dataset.level})</strong><br>${item.dataset.effect}`;
      tooltip.style.opacity = "1";
      tooltip.style.left = `${item.getBoundingClientRect().left + window.scrollX}px`;
      tooltip.style.top = `${item.getBoundingClientRect().top - 50 + window.scrollY}px`;
    });
  
    item.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });

  