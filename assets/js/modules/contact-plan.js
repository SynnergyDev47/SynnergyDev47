/**
 * Contacto sin backend: precarga un plan permitido y convierte el formulario
 * validado en un mensaje localizado que la persona decide enviar por WhatsApp.
 */

(function () {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;

  const whatsappNumber = '5355172713';
  const allowedPlans = new Set(['nueva-marca', 'campana', 'integral', 'retainer']);
  const planSelect = form.querySelector('#contact-plan');
  const eligibilityNote = form.querySelector('#retainer-eligibility');
  const isEnglish = document.documentElement.lang.startsWith('en');
  const copy = isEnglish
    ? {
        greeting: "Hello, I'd like to contact Synnergy Lab.",
        name: 'Name',
        company: 'Company/project',
        plan: 'Plan',
        need: 'Primary need',
        context: 'Context and objective',
        attempts: 'What has been tried',
        unspecified: 'Not specified'
      }
    : {
        greeting: 'Hola, quiero contactar con Synnergy Lab.',
        name: 'Nombre',
        company: 'Empresa/proyecto',
        plan: 'Plan',
        need: 'Necesidad principal',
        context: 'Contexto y objetivo',
        attempts: 'Qué se ha intentado',
        unspecified: 'No especificado'
      };

  const updateRetainerNote = () => {
    if (!planSelect || !eligibilityNote) return;
    eligibilityNote.hidden = planSelect.value !== 'retainer';
  };

  const selectedId = new URLSearchParams(window.location.search).get('plan');
  if (planSelect && selectedId && allowedPlans.has(selectedId)) {
    planSelect.value = selectedId;
  }
  updateRetainerNote();
  planSelect?.addEventListener('change', updateRetainerNote);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const selectedPlan = planSelect?.selectedOptions[0]?.textContent.trim() || copy.unspecified;
    const message = [
      copy.greeting,
      '',
      `${copy.name}: ${String(data.get('name')).trim()}`,
      `${copy.company}: ${String(data.get('company')).trim()}`,
      `${copy.plan}: ${selectedPlan}`,
      `${copy.need}: ${String(data.get('need')).trim()}`,
      '',
      `${copy.context}:`,
      String(data.get('context')).trim(),
      '',
      `${copy.attempts}:`,
      String(data.get('attempts')).trim() || copy.unspecified
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();
