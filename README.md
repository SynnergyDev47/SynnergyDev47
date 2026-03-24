# Synnergy Lab

Sitio web base para **Synnergy Lab**, una agencia de marketing estratégico enfocada en ayudar a mipymes a convertir su presencia digital en crecimiento empresarial sostenible.

La base técnica del proyecto se mantiene deliberadamente simple: **HTML, CSS y JavaScript puros**. La arquitectura, sin embargo, está preparada para soportar una web profesional con identidad visual definida, bilingüismo y una base de SEO limpia.

## Visión del proyecto

El objetivo del repositorio es convertirse en un sitio profesional que:

1. presente con claridad la propuesta de valor de Synnergy Lab;
2. explique los servicios de diagnóstico, estrategia, implementación y optimización de marketing;
3. prepare un espacio para resultados y casos reales sin inventar métricas ni promesas;
4. facilite el contacto con potenciales clientes mediante el diagnóstico estratégico como CTA principal;
5. mantenga una estructura ordenada para contenido localizado y futuras mejoras de SEO.

## Arquitectura actual

```text
/
├── index.html                     # Entrada neutra que redirige al idioma por defecto
├── es/
│   ├── index.html                # Home en español
│   ├── servicios/
│   │   └── index.html
│   ├── proyectos/
│   │   └── index.html
│   ├── sobre-mi/
│   │   └── index.html
│   ├── agencia/
│   │   └── index.html
│   └── contacto/
│       └── index.html
├── en/
│   ├── index.html                # Home en inglés
│   ├── services/
│   │   └── index.html
│   ├── projects/
│   │   └── index.html
│   ├── about/
│   │   └── index.html
│   ├── agency/
│   │   └── index.html
│   └── contact/
│       └── index.html
├── assets/
│   ├── css/
│   │   ├── base/
│   │   ├── components/
│   │   ├── sections/
│   │   └── main.css
│   ├── js/
│   │   ├── modules/
│   │   └── main.js
│   ├── img/
│   └── fonts/
├── content/
│   ├── es/
│   └── en/
├── data/
│   ├── projects.json
│   ├── services.json
│   └── testimonials.json
└── docs/
    ├── sitemap.txt
    ├── content-plan.md
    └── brand-guide.md
```

## Decisiones clave

### Español por defecto con raíz neutra

El español sigue siendo el idioma por defecto, pero ahora vive en `/es/`. La raíz del sitio (`/`) se reserva como entrada neutra para redirigir de forma explícita a la versión principal y evitar asimetrías entre idiomas.

Las rutas históricas en español en la raíz (`/servicios/`, `/proyectos/`, `/sobre-mi/`, `/agencia/`, `/contacto/`) se mantienen únicamente como alias legacy con redirección inmediata a sus equivalentes canónicos bajo `/es/`, evitando contenido duplicado sin romper enlaces anteriores.

### Código en inglés

Los nombres técnicos de archivos, funciones, variables y módulos deben mantenerse en inglés. El contenido visible puede estar en español o inglés según la versión de la página.

### SEO e internacionalización

La estructura por carpetas permite URLs limpias (`/es/servicios/`, `/en/services/`) y sienta las bases para:

- `hreflang` por idioma;
- metadatos localizados;
- enlazado interno coherente;
- ampliación futura del sitemap;
- contenido organizado por idioma.

### Identidad visual

La identidad visual actual toma como base:

- `#0a2e5a` como color principal;
- `#7b1ba4` como acento secundario;
- `#f2f2f2` como neutro de apoyo;
- **Exo 2** para titulares;
- **Montserrat** para cuerpo de texto.

## Próximos pasos sugeridos

1. Incorporar los logos definitivos en `assets/img/branding/`.
2. Añadir casos reales y testimonios validados.
3. Integrar formulario de contacto y analítica.
4. Incorporar SEO avanzado: Open Graph, datos estructurados y sitemap XML.
5. Ajustar la cabecera para mostrar el logo visual una vez se entreguen los archivos finales.
