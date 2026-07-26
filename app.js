/* ==========================================
   DOM LOADED INTERACTIVITY
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Cursor Logic
  const outline = document.querySelector('.cursor-outline');
  if (outline) {
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
    let raf;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
    
    function animate() {
      const speed = 0.2;
      outlineX += (mouseX - outlineX) * speed;
      outlineY += (mouseY - outlineY) * speed;
      outline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;
      raf = requestAnimationFrame(animate);
    }
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else animate();
    });
    
    animate();
  }

  // 2. Mobile Menu Logic
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
    
    drawer.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
