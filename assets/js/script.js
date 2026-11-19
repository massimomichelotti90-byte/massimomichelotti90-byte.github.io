(() => {
  const themeToggle = document.querySelector('#theme-toggle');
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch (error) {}

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    if (!themeToggle) return;

    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Attiva tema chiaro' : 'Attiva tema scuro');
    themeToggle.innerHTML = `<span class="theme-icon" aria-hidden="true">${dark ? '☀' : '☾'}</span><span>${dark ? 'Tema chiaro' : 'Tema scuro'}</span>`;
  };

  setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      try { localStorage.setItem('portfolio-theme', nextTheme); } catch (error) {}
    });
  }

  const filterButtons = document.querySelectorAll('.filter');
  const projectCards = document.querySelectorAll('.card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectCards.forEach((card) => {
        card.hidden = filter !== 'tutti' && card.dataset.category !== filter;
      });
    });
  });

  const lightbox = document.querySelector('#lightbox');
  const largeImage = lightbox?.querySelector('img');
  if (lightbox && largeImage && typeof lightbox.showModal === 'function') {
    document.querySelectorAll('.image-gallery figure img').forEach((img) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'image-zoom';
      button.setAttribute('aria-label', `Ingrandisci immagine: ${img.alt}`);
      img.before(button);
      button.append(img);
      button.addEventListener('click', () => {
        largeImage.src = img.src;
        largeImage.alt = img.alt;
        lightbox.showModal();
      });
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
