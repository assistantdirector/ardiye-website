/* cursor.js — Ardiye shared cursor tracker */
(function () {
  const outline = document.querySelector('.cursor-outline');
  if (!outline) return; // guard: mobile or element missing

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
    // GPU-composited transform instead of top/left to avoid layout reflow
    outline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;
    raf = requestAnimationFrame(animate);
  }

  // Pause when tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else animate();
  });

  animate();
})();
