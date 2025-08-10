(function () {
  const STORAGE_KEY = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved || (prefersDark ? 'dark' : 'light');

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    localStorage.setItem(STORAGE_KEY, t);
    if (btnIcon) {
      btnIcon.classList.toggle('fa-moon', t === 'dark');
      btnIcon.classList.toggle('fa-sun', t !== 'dark');
      toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.title = t === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }

  // Crée un item de navbar avec une icône Font Awesome
  const toggle = document.createElement('a');
  toggle.href = 'javascript:void(0)';
  toggle.className = 'navbar-item nav-icon theme-toggle-btn';
  toggle.setAttribute('aria-label', 'Toggle theme');

  const btnIcon = document.createElement('i');
  btnIcon.className = 'fas'; // on ajoutera fa-moon / fa-sun dans setTheme()
  toggle.appendChild(btnIcon);

  toggle.addEventListener('click', () => {
    const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
    setTheme(next);
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Où injecter : à droite des icônes (GitHub / LinkedIn / Search)
    const right =
      document.querySelector('.navbar .navbar-end') ||
      document.querySelector('.navbar .navbar-right') ||
      document.querySelector('.navbar-menu .navbar-end') ||
      document.querySelector('.navbar'); // fallback

    setTheme(initial);
    if (right) right.appendChild(toggle);
    else document.body.appendChild(toggle);
  });
})();

