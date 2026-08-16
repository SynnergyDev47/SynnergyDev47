/**
 * Cargador de Datos Dinámico - Synnergy Lab
 * Consume archivos JSON en segundo plano (fetch) y renderiza tarjetas
 * de servicios, equipo, proyectos y testimonios según el idioma del documento.
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
  const locale = lang.startsWith('en') ? 'en' : 'es';

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  // 2. Cargar Servicios si el contenedor existe
  const servicesContainer = document.getElementById('dynamic-services');
  if (servicesContainer) {
    const pricingCopy = lang.startsWith('en')
      ? { demo: 'Demo price', cta: 'Ask about this plan', features: 'Included phases' }
      : { demo: 'Precio demo', cta: 'Consultar este plan', features: 'Fases incluidas' };
    const contactPath = lang.startsWith('en') ? '../contact/' : '../contacto/';
    const planOrder = ['nueva-marca', 'campana', 'integral'];

    fetch(`${siteRootPrefix}data/services.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar servicios JSON');
        return res.json();
      })
      .then((data) => {
        servicesContainer.innerHTML = data
          .slice()
          .sort((a, b) => planOrder.indexOf(a.id) - planOrder.indexOf(b.id))
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

  const retainerContainer = document.getElementById('dynamic-retainer');
  if (retainerContainer) {
    const retainerCopy = locale === 'en'
      ? { phase: 'Primary phase', flow: 'Initial project → measurement → Retainer' }
      : { phase: 'Fase principal', flow: 'Proyecto inicial → medición → Retainer' };
    const contactPath = locale === 'en' ? '../contact/' : '../contacto/';

    fetch(`${siteRootPrefix}data/retainer.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar Retainer JSON');
        return res.json();
      })
      .then((item) => {
        retainerContainer.innerHTML = `
          <article class="retainer-card">
            <div class="retainer-card__intro">
              <p class="section-kicker">${escapeHtml(item.kicker[locale])}</p>
              <h2>${escapeHtml(item.title)}</h2>
              <p>${escapeHtml(item.description[locale])}</p>
              <p class="retainer-card__eligibility">${escapeHtml(item.eligibility[locale])}</p>
              <p class="retainer-card__flow">${escapeHtml(retainerCopy.flow)}</p>
            </div>
            <div class="retainer-card__scope">
              <p class="pricing-card__features-label">${retainerCopy.phase}</p>
              <h3>${escapeHtml(item.phase[locale])}</h3>
              <ul class="pricing-card__features">
                ${item.items[locale].map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}
              </ul>
              <p class="retainer-card__price">${escapeHtml(item.price[locale])}</p>
              <a class="button button-primary" href="${contactPath}?plan=retainer">${escapeHtml(item.cta[locale])}</a>
            </div>
          </article>
        `;
      })
      .catch((err) => console.error('[Loader] Error en Retainer:', err));
  }

  // 3. Cargar Equipo desde una única fuente bilingüe.
  const teamContainer = document.getElementById('dynamic-team');
  if (teamContainer) {
    const teamCopy = locale === 'en'
      ? {
          toggle: (name) => `View ${name}'s extended profile`,
          certification: 'Certification',
          education: 'Education',
          experience: 'Experience',
          skills: 'Skills / areas of expertise'
        }
      : {
          toggle: (name) => `Ver perfil ampliado de ${name}`,
          certification: 'Certificación',
          education: 'Formación',
          experience: 'Experiencia',
          skills: 'Habilidades / áreas de especialización'
        };

    fetch(`${siteRootPrefix}data/team.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar equipo JSON');
        return res.json();
      })
      .then((data) => {
        teamContainer.innerHTML = data
          .map((item) => {
            const highlightKey = ['certification', 'education', 'experience']
              .find((key) => item[key]?.[locale]);
            const skills = item.skills?.[locale] || [];
            const profileId = `team-profile-${item.id}`;

            return `
              <article class="card team-card">
                <div class="team-card__summary">
                  <div class="team-card__photo">
                    <img src="${siteRootPrefix}${escapeHtml(item.image.src)}" alt="${escapeHtml(item.image.alt[locale])}" loading="lazy" decoding="async" />
                  </div>
                  <div class="team-card__info">
                    <h3 class="card__title">${escapeHtml(item.name)}</h3>
                    <p class="team-card__role">${escapeHtml(item.role[locale])}</p>
                  </div>
                  <button class="team-card__toggle" type="button" aria-expanded="false" aria-controls="${profileId}" aria-label="${escapeHtml(teamCopy.toggle(item.name))}">
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                <div class="team-card__details" id="${profileId}" hidden>
                  <div class="team-card__details-inner">
                    <p class="team-card__description">${escapeHtml(item.description[locale])}</p>
                    ${highlightKey ? `
                      <div class="team-card__highlight">
                        <p class="team-card__detail-label">${teamCopy[highlightKey]}</p>
                        <p>${escapeHtml(item[highlightKey][locale])}</p>
                      </div>
                    ` : ''}
                    ${skills.length ? `
                      <div class="team-card__skills">
                        <p class="team-card__detail-label">${teamCopy.skills}</p>
                        <ul>${skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join('')}</ul>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </article>
            `;
          })
          .join('');
        teamContainer.setAttribute('aria-busy', 'false');
        document.dispatchEvent(new CustomEvent('team-cards-rendered'));
      })
      .catch((err) => {
        teamContainer.setAttribute('aria-busy', 'false');
        console.error('[Loader] Error en equipo:', err);
      });
  }

  // 4. Cargar Proyectos si el contenedor existe
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

  // 5. Cargar Testimonios si el contenedor existe
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
