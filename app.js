/* ==========================================
   APP.JS - INTERACTIVITY & NAVIGATION DRAWER
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navDrawer = document.getElementById('nav-drawer');

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navDrawer.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close drawer when clicking a link inside it
    navDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Custom Cursor Outline Tracker
  const cursor = document.querySelector('.cursor-outline');
  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });

    // Hover effect for interactive elements
    const interactables = document.querySelectorAll('a, button, .artist-card, .work-item');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }
});
