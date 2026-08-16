/**
 * Mejoras progresivas para el proceso por fases y las fichas expandibles del equipo.
 */

(function () {
  const processFlow = document.querySelector('[data-process-flow]');

  if (processFlow) {
    const tabs = Array.from(processFlow.querySelectorAll('[role="tab"]'));
    const panels = Array.from(processFlow.querySelectorAll('[role="tabpanel"]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeIndex = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));
    let transitionTimer;

    const showPanel = (nextIndex, moveFocus = false) => {
      if (nextIndex === activeIndex || nextIndex < 0 || nextIndex >= tabs.length) return;

      window.clearTimeout(transitionTimer);
      const currentPanel = panels[activeIndex];
      const nextPanel = panels[nextIndex];
      const completeChange = () => {
        currentPanel.hidden = true;
        currentPanel.classList.remove('is-leaving');
        nextPanel.hidden = false;
        nextPanel.classList.add('is-entering');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => nextPanel.classList.remove('is-entering'));
        });
      };

      tabs[activeIndex].setAttribute('aria-selected', 'false');
      tabs[activeIndex].tabIndex = -1;
      tabs[nextIndex].setAttribute('aria-selected', 'true');
      tabs[nextIndex].tabIndex = 0;

      if (reducedMotion.matches) {
        completeChange();
      } else {
        currentPanel.classList.add('is-leaving');
        transitionTimer = window.setTimeout(completeChange, 150);
      }

      activeIndex = nextIndex;
      if (moveFocus) tabs[nextIndex].focus();
      tabs[nextIndex].scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = index === activeIndex ? 0 : -1;
      tab.addEventListener('click', () => showPanel(index));
      tab.addEventListener('keydown', (event) => {
        const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();

        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        showPanel(nextIndex, true);
      });
    });

    const initialPanelIndex = panels.findIndex((panel) => `#${panel.id}` === window.location.hash);
    panels.forEach((panel, index) => {
      panel.hidden = index !== activeIndex;
    });
    processFlow.classList.add('is-enhanced');

    if (initialPanelIndex >= 0 && initialPanelIndex !== activeIndex) {
      showPanel(initialPanelIndex);
    }
  }

  const setupTeamCards = () => {
    const teamGrid = document.querySelector('[data-team-grid]');
    if (!teamGrid || teamGrid.dataset.interactionsReady === 'true') return;

    const cards = Array.from(teamGrid.querySelectorAll('.team-card'));
    if (!cards.length) return;
    teamGrid.dataset.interactionsReady = 'true';
    const hideTimers = new WeakMap();
    const transitionDuration = 540;

    const closeCard = (card, restoreFocus = false) => {
      const button = card.querySelector('.team-card__toggle');
      const details = card.querySelector('.team-card__details');
      if (!button || !details) return;
      window.clearTimeout(hideTimers.get(details));
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      card.classList.remove('is-expanded');
      button.setAttribute('aria-expanded', 'false');
      if (wasOpen) {
        const timer = window.setTimeout(() => {
          if (button.getAttribute('aria-expanded') === 'false') details.hidden = true;
        }, transitionDuration);
        hideTimers.set(details, timer);
      }
      if (restoreFocus) button.focus();
    };

    cards.forEach((card) => {
      const button = card.querySelector('.team-card__toggle');
      const details = card.querySelector('.team-card__details');
      if (!button || !details) return;

      button.addEventListener('click', () => {
        const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
        cards.forEach((otherCard) => closeCard(otherCard));
        if (!shouldOpen) return;

        window.clearTimeout(hideTimers.get(details));
        button.setAttribute('aria-expanded', 'true');
        details.hidden = false;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => card.classList.add('is-expanded'));
        });
      });
    });

    teamGrid.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const expandedCard = teamGrid.querySelector('.team-card.is-expanded');
      if (expandedCard) closeCard(expandedCard, true);
    });
  };

  setupTeamCards();
  document.addEventListener('team-cards-rendered', setupTeamCards);

  const methodArticles = document.querySelector('[data-method-articles]');
  if (methodArticles) {
    const articles = Array.from(methodArticles.querySelectorAll('.method-article'));
    const hideTimers = new WeakMap();
    const transitionDuration = 520;
    const labels = document.documentElement.lang.startsWith('en')
      ? { open: 'Read more', close: 'Close' }
      : { open: 'Leer más', close: 'Cerrar' };

    const closeArticle = (article) => {
      const button = article.querySelector('.method-article__toggle');
      const details = article.querySelector('.method-article__details');
      const label = article.querySelector('.method-article__label');
      if (!button || !details || !label) return;

      window.clearTimeout(hideTimers.get(details));
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      article.classList.remove('is-expanded');
      button.setAttribute('aria-expanded', 'false');
      label.textContent = labels.open;
      if (wasOpen) {
        const timer = window.setTimeout(() => {
          if (button.getAttribute('aria-expanded') === 'false') details.hidden = true;
        }, transitionDuration);
        hideTimers.set(details, timer);
      }
    };

    articles.forEach((article) => {
      const button = article.querySelector('.method-article__toggle');
      const details = article.querySelector('.method-article__details');
      const label = article.querySelector('.method-article__label');
      if (!button || !details || !label) return;

      button.addEventListener('click', () => {
        const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
        articles.forEach((otherArticle) => closeArticle(otherArticle));
        if (!shouldOpen) return;

        window.clearTimeout(hideTimers.get(details));
        button.setAttribute('aria-expanded', 'true');
        label.textContent = labels.close;
        details.hidden = false;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => article.classList.add('is-expanded'));
        });
      });
    });
  }
})();
