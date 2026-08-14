/**
 * Script Principal - Synnergy Lab
 * Carga de forma dinámica los componentes modulares y el cargador de datos
 * según la ruta actual, preservando la compatibilidad offline (file://).
 */

(function () {
  const root = document.documentElement;
  const THEME_STORAGE_KEY = 'synnergy-theme';

  // 1. Establecer el tema inicial de inmediato (evita destellos blancos en modo oscuro)
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    // Preferencia del sistema si no hay guardada
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const initialTheme = getInitialTheme();
  root.dataset.theme = initialTheme;

  // 2. Resolver la ruta base del script para cargar módulos de forma relativa
  const currentScript = document.currentScript || document.querySelector('script[src*="main.js"]');
  if (!currentScript) return;

  const src = currentScript.getAttribute('src');
  const basePath = src.substring(0, src.lastIndexOf('/') + 1);

  // Helper para inyectar scripts de forma asíncrona
  const loadModuleScript = (filename) => {
    const script = document.createElement('script');
    script.src = `${basePath}modules/${filename}`;
    script.defer = true;
    document.head.appendChild(script);
  };

  // 3. Cargar los Web Components de la cabecera y el pie de página
  loadModuleScript('components.js');

  // 4. Cargar el módulo de carga dinámica de JSON (se auto-ejecuta si existen contenedores)
  loadModuleScript('data-loader.js');

  // 5. Mejoras progresivas específicas; cada módulo se activa solo si encuentra su componente.
  loadModuleScript('about-interactions.js');
  loadModuleScript('contact-plan.js');
})();
