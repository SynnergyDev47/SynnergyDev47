/**
 * Componentes Web Nativos para Synnergy Lab
 * Centraliza la cabecera (<site-header>) y el pie de página (<site-footer>)
 * para evitar redundancia de HTML en las diferentes rutas del sitio.
 */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupThemeToggle();
    this.setupNavToggle();
  }

  render() {
    const lang = document.documentElement.lang || 'es';
    const path = window.location.pathname;

    // 1. Detectar profundidad relativa respecto a la carpeta del idioma (/es/ o /en/)
    const subfolders = [
      '/nosotros/', '/servicios/', '/proyectos/', '/agencia/', '/contacto/',
      '/about/', '/services/', '/projects/', '/agency/', '/contact/'
    ];
    const isSubfolder = subfolders.some(folder => path.includes(folder));

    const langRootPrefix = isSubfolder ? '../' : './';
    const siteRootPrefix = isSubfolder ? '../../' : '../';

    // 2. Determinar la página activa
    let pageKey = 'home';
    if (path.includes('/servicios/') || path.includes('/services/')) pageKey = 'servicios';
    else if (path.includes('/proyectos/') || path.includes('/projects/')) pageKey = 'proyectos';
    else if (path.includes('/nosotros/') || path.includes('/about/')) pageKey = 'nosotros';
    else if (path.includes('/agencia/') || path.includes('/agency/')) pageKey = 'agencia';
    else if (path.includes('/contacto/') || path.includes('/contact/')) pageKey = 'contacto';

    // 3. Mapeo de navegación según idioma
    const navData = {
      es: {
        brandLabel: 'Synnergy Lab, inicio',
        navLabel: 'Navegación principal',
        menuOpenLabel: 'Abrir menú de navegación',
        menuCloseLabel: 'Cerrar menú de navegación',
        switchLang: 'en',
        switchLabel: 'Switch to English',
        switchText: 'EN',
        links: [
          { key: 'servicios', label: 'Servicios', path: 'servicios/' },
          { key: 'proyectos', label: 'Proyectos', path: 'proyectos/' },
          { key: 'nosotros', label: 'Nosotros', path: 'nosotros/' },
          { key: 'agencia', label: 'Agencia', path: 'agencia/' },
          { key: 'contacto', label: 'Contacto', path: 'contacto/' }
        ]
      },
      en: {
        brandLabel: 'Synnergy Lab, home',
        navLabel: 'Main navigation',
        menuOpenLabel: 'Open navigation menu',
        menuCloseLabel: 'Close navigation menu',
        switchLang: 'es',
        switchLabel: 'Cambiar a español',
        switchText: 'ES',
        links: [
          { key: 'servicios', label: 'Services', path: 'services/' },
          { key: 'proyectos', label: 'Projects', path: 'projects/' },
          { key: 'nosotros', label: 'About', path: 'about/' },
          { key: 'agencia', label: 'Agency', path: 'agency/' },
          { key: 'contacto', label: 'Contact', path: 'contact/' }
        ]
      }
    };

    // 4. Mapeo para enlace de idiomas exacto por página
    const pagePaths = {
      home: { es: '', en: '' },
      servicios: { es: 'servicios/', en: 'services/' },
      proyectos: { es: 'proyectos/', en: 'projects/' },
      nosotros: { es: 'nosotros/', en: 'about/' },
      agencia: { es: 'agencia/', en: 'agency/' },
      contacto: { es: 'contacto/', en: 'contact/' }
    };

    const currentNav = navData[lang] || navData.es;
    const oppositeLang = lang === 'es' ? 'en' : 'es';
    const oppositePath = `${siteRootPrefix}${oppositeLang}/${pagePaths[pageKey][oppositeLang]}`;

    // 5. Construir HTML de los enlaces
    const linksHtml = currentNav.links.map(link => {
      const isActive = pageKey === link.key ? ' is-active' : '';
      const href = `${langRootPrefix}${link.path}`;
      return `<li><a class="nav-link${isActive}" href="${href}">${link.label}</a></li>`;
    }).join('');

    const brandHref = langRootPrefix;

    // 6. HTML completo del header + overlay fuera del header
    this.innerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand-mark" href="${brandHref}" aria-label="${currentNav.brandLabel}">
            <img class="brand-logo brand-logo--light" src="${siteRootPrefix}assets/img/branding/synnergy-lab-logo-color.svg" alt="Synnergy Lab" />
            <img class="brand-logo brand-logo--dark" src="${siteRootPrefix}assets/img/branding/synnergy-lab-logo-white.svg" alt="Synnergy Lab" />
            <span class="brand-text">Synnergy Lab</span>
          </a>
          <nav class="site-nav" id="site-nav" aria-label="${currentNav.navLabel}">
            <ul class="nav-list">
              ${linksHtml}
            </ul>
          </nav>
          <div class="language-switcher" aria-label="${currentNav.switchLabel}">
            <a class="language-toggle" href="${oppositePath}" lang="${currentNav.switchLang}" aria-label="${currentNav.switchLabel}" title="${currentNav.switchLabel}">${currentNav.switchText}</a>
            <button type="button" class="theme-toggle" aria-label="Cambiar tema"></button>
          </div>
          <button
            type="button"
            class="nav-toggle"
            aria-controls="site-nav"
            aria-expanded="false"
            aria-label="${currentNav.menuOpenLabel}"
          >
            <span class="nav-toggle__icon" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </header>
      <div class="nav-overlay" id="nav-overlay" aria-hidden="true"></div>
    `;
  }

  setupThemeToggle() {
    const button = this.querySelector('.theme-toggle');
    if (!button) return;

    const root = document.documentElement;
    const lang = root.getAttribute('lang') || 'es';
    const THEME_STORAGE_KEY = 'synnergy-theme';

    const themeCopy = lang.startsWith('en')
      ? { light: 'Switch to light mode', dark: 'Switch to dark mode' }
      : { light: 'Cambiar a modo claro', dark: 'Cambiar a modo oscuro' };

    const updateButton = (theme) => {
      const isDark = theme === 'dark';
      button.textContent = isDark ? '☀️' : '🌙';
      button.setAttribute('aria-label', isDark ? themeCopy.light : themeCopy.dark);
      button.setAttribute('title', isDark ? themeCopy.light : themeCopy.dark);
    };

    const currentTheme = root.dataset.theme || 'light';
    updateButton(currentTheme);

    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      updateButton(nextTheme);
    });
  }

  setupNavToggle() {
    const header = this.querySelector('.site-header');
    const toggle = this.querySelector('.nav-toggle');
    const overlay = this.querySelector('#nav-overlay');
    const nav = this.querySelector('.site-nav');
    if (!header || !toggle || !nav) return;

    const lang = document.documentElement.getAttribute('lang') || 'es';
    const labels = lang.startsWith('en')
      ? { open: 'Open navigation menu', close: 'Close navigation menu' }
      : { open: 'Abrir menú de navegación', close: 'Cerrar menú de navegación' };

    const openMenu = () => {
      header.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', labels.close);
      if (overlay) {
        overlay.classList.add('is-visible');
        overlay.setAttribute('aria-hidden', 'false');
      }
      // Bloquear scroll del body mientras el menú está abierto
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', labels.open);
      if (overlay) {
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    };

    // Toggle al hacer click en el botón hamburger
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.contains('nav-open');
      isOpen ? closeMenu() : openMenu();
    });

    // Cerrar al hacer click en el overlay
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Cerrar al hacer click en cualquier enlace del menú
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        closeMenu();
        toggle.focus(); // devolver foco al botón
      }
    });

    // Cerrar si la ventana supera el breakpoint de desktop (62rem = 992px)
    const desktopMq = window.matchMedia('(min-width: 62rem)');
    desktopMq.addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const lang = document.documentElement.lang || 'es';
    const currentYear = new Date().getFullYear();

    const text = lang === 'es'
      ? 'Synnergy Lab trabaja con datos y metodología para profesionalizar tu marketing.'
      : 'Synnergy Lab is a strategic marketing agency focused on clarity, method, and results.';

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <p>${text}</p>
          <small>© <span>${currentYear}</span> Synnergy Lab</small>
        </div>
      </footer>
    `;
  }
}

// Registrar los componentes en el navegador
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
