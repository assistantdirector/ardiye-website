/* ==========================================
   GLOBAL SPA MODAL FUNCTIONS (History API / Hash Based)
   ========================================== */
window.openModal = function(id) {
  // Sadece modalı açmak yerine URL'ye hash ekliyoruz. 
  // Bu, tarayıcının geçmişine kayıt düşer ve "Geri" tuşunu aktif eder.
  window.location.hash = id;
};

window.closeModal = function(id) {
  // Ekranın en tepesine zıplamadan URL'deki hash'i temizler.
  history.replaceState(null, null, ' '); 
  
  // İlgili modalı manuel olarak kapatır
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
};

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

  // 3. Browser Back Button & Direct Link Logic (Hashchange Listener)
  function handleHashChange() {
    const hash = window.location.hash.substring(1); // Baştaki '#' işaretini siler
    
    // Öncelikle açık olan tüm modalları gizle
    document.querySelectorAll('.overlay').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.classList.remove('modal-open');

    // Eğer URL'deki hash bir modal ID'si ise, onu aç
    if (hash && hash.startsWith('modal-')) {
      const modal = document.getElementById(hash);
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        modal.scrollTop = 0; // Modalı en tepeden başlat
      }
    }
  }

  // Kullanıcı farenin/tarayıcının "Geri" veya "İleri" tuşuna bastığında tetiklenir
  window.addEventListener('hashchange', handleHashChange);

  // Site ilk yüklendiğinde çalıştır (Birisinin doğrudan modal linkiyle gelme ihtimaline karşı)
  handleHashChange();

});
