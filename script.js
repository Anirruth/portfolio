(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'dark');
  }

  applyTheme(getPreferredTheme());

  toggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Only follow system changes if the user hasn't picked manually
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navlink');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--ink)' : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();
