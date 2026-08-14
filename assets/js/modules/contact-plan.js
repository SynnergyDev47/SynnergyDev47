/**
 * Mejora progresiva para conservar el plan elegido al llegar a Contacto.
 * Los IDs y nombres válidos se leen desde data/services.json para evitar duplicación.
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get('plan');
  if (!selectedId) return;

  const lang = document.documentElement.lang || 'es';
  const path = window.location.pathname;
  const isContactPage = path.includes('/contacto/') || path.includes('/contact/');
  if (!isContactPage) return;

  const siteRootPrefix = '../../';

  fetch(`${siteRootPrefix}data/services.json`)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to load service data');
      return response.json();
    })
    .then((services) => {
      const selectedService = services.find((service) => service.id === selectedId);
      if (!selectedService) return;

      const name = selectedService.title[lang];
      const copy = lang.startsWith('en')
        ? {
            label: 'Selected plan',
            subject: `Question about the ${name} plan`
          }
        : {
            label: 'Plan seleccionado',
            subject: `Consulta sobre el plan ${name}`
          };

      const heroCopy = document.querySelector('.hero-copy');
      const lead = heroCopy?.querySelector('.lead');
      if (heroCopy && lead) {
        const notice = document.createElement('p');
        notice.className = 'selected-plan';
        notice.innerHTML = `<span>${copy.label}</span><strong>${name}</strong>`;
        lead.insertAdjacentElement('afterend', notice);
      }

      document.querySelectorAll('a[href="mailto:synnergydev@gmail.com"]').forEach((link) => {
        link.href = `mailto:synnergydev@gmail.com?subject=${encodeURIComponent(copy.subject)}`;
      });
    })
    .catch((error) => console.error('[Contact plan] Error:', error));
})();
