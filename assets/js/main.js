// Selecciona todos los elementos marcados con `data-current-year` para mantener el año actualizado en el pie y otras zonas del sitio.
const currentYearNodes = document.querySelectorAll('[data-current-year]');
// Calcula el año actual una sola vez para reutilizarlo de forma consistente en toda la página.
const currentYear = new Date().getFullYear();
// Define la clave única de localStorage para recordar el tema visual elegido por la persona usuaria.
const THEME_STORAGE_KEY = 'synnergy-theme';

// Recorre cada nodo que necesita el año actual para inyectar el valor dinámicamente.
currentYearNodes.forEach((node) => {
  // Convierte el año a texto y lo asigna al contenido visible del elemento.
  node.textContent = String(currentYear);
});

// Obtiene el elemento raíz `<html>`, punto central para aplicar variables globales como idioma y tema.
const root = document.documentElement;
// Lee el atributo `lang` del documento para adaptar textos del UI; si no existe, asume español.
const language = root.getAttribute('lang') ?? 'es';
// Busca el contenedor donde se inserta el selector de idioma y, junto a él, el botón de tema.
const languageSwitcher = document.querySelector('.language-switcher');
// Prepara los textos accesibles del botón de tema según el idioma activo del sitio (EN o ES).
const themeCopy =
  // Si el idioma empieza por `en`, usa mensajes en inglés para mantener coherencia global de la interfaz.
  language.startsWith('en')
    ? { light: 'Switch to light mode', dark: 'Switch to dark mode' }
    // En cualquier otro caso (objetivo principal del proyecto: público hispanohablante), usa mensajes en español.
    : { light: 'Cambiar a modo claro', dark: 'Cambiar a modo oscuro' };

// Define una función utilitaria que aplica el tema al documento completo mediante `data-theme`.
const setTheme = (theme) => {
  // Escribe el tema en el dataset del `<html>` para que el CSS global cambie colores y estilos del sitio entero.
  root.dataset.theme = theme;
};

// Define la lógica de arranque para saber con qué tema inicial debe cargarse todo el sitio web.
const getInitialTheme = () => {
  // Intenta recuperar de localStorage la última preferencia guardada por la persona usuaria.
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  // Valida que el valor guardado sea uno de los temas soportados para evitar estados inválidos.
  if (storedTheme === 'dark' || storedTheme === 'light') {
    // Si es válido, lo devuelve y así se preserva la experiencia personalizada entre visitas.
    return storedTheme;
  }

  // Si no hay valor previo o es incorrecto, usa modo claro como base estable del proyecto.
  return 'light';
};

// Define una función para actualizar icono y textos accesibles del botón según el tema activo.
const updateToggleCopy = (button, activeTheme) => {
  // Comprueba si el tema actual es oscuro para decidir el siguiente estado sugerido al usuario.
  const isDark = activeTheme === 'dark';
  // Muestra un sol cuando está activo el modo oscuro (porque al pulsar cambiará a claro) y luna en caso contrario.
  button.textContent = isDark ? '☀️' : '🌙';
  // Ajusta `aria-label` para accesibilidad, explicando la acción del botón a lectores de pantalla.
  button.setAttribute('aria-label', isDark ? themeCopy.light : themeCopy.dark);
  // Ajusta también el `title` para reforzar el mensaje al pasar el cursor.
  button.setAttribute('title', isDark ? themeCopy.light : themeCopy.dark);
};

// Crea dinámicamente el botón de cambio de tema para no depender de HTML repetido en múltiples páginas.
const themeToggleButton = document.createElement('button');
// Declara el tipo `button` para evitar envíos accidentales si alguna vez se integra dentro de un formulario.
themeToggleButton.type = 'button';
// Asigna la clase CSS que lo integra visualmente con el sistema de estilos global del sitio.
themeToggleButton.className = 'theme-toggle';

// Calcula el tema inicial al cargar la página según preferencias guardadas.
const initialTheme = getInitialTheme();
// Aplica inmediatamente ese tema al documento para evitar inconsistencias visuales en la interfaz.
setTheme(initialTheme);
// Sincroniza el icono y los textos del botón con el tema que acaba de establecerse.
updateToggleCopy(themeToggleButton, initialTheme);

// Escucha clics del usuario para alternar entre modo oscuro y claro en cualquier página del proyecto.
themeToggleButton.addEventListener('click', () => {
  // Determina el próximo tema invirtiendo el tema actual almacenado en el dataset del `<html>`.
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  // Aplica el nuevo tema para actualizar la apariencia global al instante.
  setTheme(nextTheme);
  // Guarda la preferencia en localStorage para mantener la elección en futuras visitas.
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  // Vuelve a actualizar icono y textos del botón para reflejar correctamente el nuevo estado.
  updateToggleCopy(themeToggleButton, nextTheme);
});

// Verifica que exista el contenedor de controles de idioma antes de insertar el botón de tema.
if (languageSwitcher) {
  // Inserta el botón en la interfaz para que el control de tema quede accesible en la navegación principal.
  languageSwitcher.append(themeToggleButton);
}
