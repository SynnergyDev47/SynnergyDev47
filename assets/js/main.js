const currentYearNodes = document.querySelectorAll('[data-current-year]');
const currentYear = new Date().getFullYear();
const THEME_STORAGE_KEY = 'synnergy-theme';

currentYearNodes.forEach((node) => {
  node.textContent = String(currentYear);
});

const root = document.documentElement;
const language = root.getAttribute('lang') ?? 'es';
const languageSwitcher = document.querySelector('.language-switcher');
const themeCopy =
  language.startsWith('en')
    ? { light: 'Switch to light mode', dark: 'Switch to dark mode' }
    : { light: 'Cambiar a modo claro', dark: 'Cambiar a modo oscuro' };

const setTheme = (theme) => {
  root.dataset.theme = theme;
};

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return 'light';
};

const updateToggleCopy = (button, activeTheme) => {
  const isDark = activeTheme === 'dark';
  button.textContent = isDark ? '☀️' : '🌙';
  button.setAttribute('aria-label', isDark ? themeCopy.light : themeCopy.dark);
  button.setAttribute('title', isDark ? themeCopy.light : themeCopy.dark);
};

const themeToggleButton = document.createElement('button');
themeToggleButton.type = 'button';
themeToggleButton.className = 'theme-toggle';

const initialTheme = getInitialTheme();
setTheme(initialTheme);
updateToggleCopy(themeToggleButton, initialTheme);

themeToggleButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  updateToggleCopy(themeToggleButton, nextTheme);
});

if (languageSwitcher) {
  languageSwitcher.append(themeToggleButton);
}
