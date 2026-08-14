/**
 * Cargador de Datos Dinámico - Synnergy Lab
 * Consume archivos JSON en segundo plano (fetch) y renderiza tarjetas
 * de servicios, proyectos y testimonios según el idioma del documento.
 * Los estilos se aplican exclusivamente mediante clases CSS del sistema.
 */

(function () {
  const lang = document.documentElement.lang || 'es';
  const path = window.location.pathname;

  // 1. Detectar profundidad relativa para resolver ruta de datos
  const subfolders = [
    '/nosotros/', '/servicios/', '/proyectos/', '/agencia/', '/contacto/',
    '/about/', '/services/', '/projects/', '/agency/', '/contact/'
  ];
  const isSubfolder = subfolders.some(folder => path.includes(folder));
  const siteRootPrefix = isSubfolder ? '../../' : '../';

  // 2. Cargar Servicios si el contenedor existe
  const servicesContainer = document.getElementById('dynamic-services');
  if (servicesContainer) {
    const pricingCopy = lang.startsWith('en')
      ? { demo: 'Demo price', cta: 'Ask about this plan', features: 'What it includes' }
      : { demo: 'Precio demo', cta: 'Consultar este plan', features: 'Qué incluye' };
    const contactPath = lang.startsWith('en') ? '../contact/' : '../contacto/';

    fetch(`${siteRootPrefix}data/services.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar servicios JSON');
        return res.json();
      })
      .then((data) => {
        servicesContainer.innerHTML = data
          .map((item) => `
            <article class="card pricing-card${item.featured ? ' pricing-card--featured' : ''}" id="service-${item.id}">
              ${item.featured ? `<p class="pricing-card__badge">${item.featuredLabel[lang]}</p>` : ''}
              <div class="pricing-card__header">
                <p class="section-kicker">${item.kicker[lang]}</p>
                <h3 class="pricing-card__title">${item.title[lang]}</h3>
                <div class="pricing-card__price" aria-label="${item.pricingStatus === 'prototype' ? `${pricingCopy.demo}: ` : ''}${item.price.prefix[lang]} ${item.price.currency} ${item.price.amount}">
                  ${item.pricingStatus === 'prototype' ? `<span class="pricing-card__status">${pricingCopy.demo}</span>` : ''}
                  <span class="pricing-card__prefix">${item.price.prefix[lang]}</span>
                  <strong><span class="pricing-card__currency">${item.price.currency}</span> ${item.price.amount}</strong>
                </div>
                <p class="card__body">${item.description[lang]}</p>
              </div>
              <div class="pricing-card__details">
                <p class="pricing-card__features-label">${pricingCopy.features}</p>
                <ul class="pricing-card__features">
                  ${item.features[lang].map((feature) => `<li>${feature}</li>`).join('')}
                </ul>
              </div>
              <a class="button button-primary pricing-card__cta" href="${contactPath}?plan=${encodeURIComponent(item.id)}">${pricingCopy.cta}</a>
            </article>
          `)
          .join('');
      })
      .catch((err) => console.error('[Loader] Error en servicios:', err));
  }

  // 3. Cargar Proyectos si el contenedor existe
  const projectsContainer = document.getElementById('dynamic-projects');
  if (projectsContainer) {
    fetch(`${siteRootPrefix}data/projects.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar proyectos JSON');
        return res.json();
      })
      .then((data) => {
        projectsContainer.innerHTML = data
          .map((item) => `
            <article class="card content-card project-card" id="project-${item.id}">
              <div class="project-card__photo">
                <img src="${siteRootPrefix}${item.image.src}" alt="${item.image.alt[lang]}" loading="lazy" />
              </div>
              <div class="project-card__content">
                <h3 class="card__title">${item.title[lang]}</h3>
                <p class="card__body">${item.description[lang]}</p>
              </div>
            </article>
          `)
          .join('');
      })
      .catch((err) => console.error('[Loader] Error en proyectos:', err));
  }

  // 4. Cargar Testimonios si el contenedor existe
  const testimonialsContainer = document.getElementById('dynamic-testimonials');
  if (testimonialsContainer) {
    fetch(`${siteRootPrefix}data/testimonials.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar testimonios JSON');
        return res.json();
      })
      .then((data) => {
        testimonialsContainer.innerHTML = data
          .map((item) => `
            <article class="card content-card testimonial-card" id="testimonial-${item.id}">
              <blockquote class="testimonial-card__quote">
                "${item.quote[lang]}"
              </blockquote>
              <div class="testimonial-card__author">
                <strong class="testimonial-card__name">${item.name}</strong>
                <small class="testimonial-card__position">${item.position[lang]}</small>
              </div>
            </article>
          `)
          .join('');
      })
      .catch((err) => console.error('[Loader] Error en testimonios:', err));
  }
})();
