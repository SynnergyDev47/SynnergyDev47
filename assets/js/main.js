const currentYearNodes = document.querySelectorAll('[data-current-year]');
const currentYear = new Date().getFullYear();

currentYearNodes.forEach((node) => {
  node.textContent = String(currentYear);
});
