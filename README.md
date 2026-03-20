# Synnergy Dev

Sitio web base para una marca híbrida que une dos frentes complementarios:

- una **agencia de marketing** orientada a ayudar marcas a comunicar mejor, captar oportunidades y crecer;
- un perfil profesional enfocado en **desarrollo web**, pensado tanto para proyectos de la agencia como para colaboraciones freelance.

La base técnica del proyecto sigue siendo deliberadamente simple: **HTML, CSS y JavaScript puros**. La arquitectura, sin embargo, evoluciona para soportar una web más seria en responsive, identidad visual, bilingüismo y SEO.

## Visión del proyecto

El objetivo del repositorio es convertirse en un sitio profesional que:

1. presente con claridad la propuesta de valor de la agencia;
2. muestre los servicios de desarrollo web como una oferta especializada y complementaria;
3. exhiba proyectos, casos de estudio y credenciales de forma ordenada;
4. facilite el contacto con potenciales clientes de agencia, desarrollo freelance o colaboraciones mixtas;
5. mantenga una base preparada para contenido localizado y posicionamiento internacional.

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

### Código en inglés

Los nombres técnicos de archivos, funciones, variables y módulos deben mantenerse en inglés. El contenido visible puede estar en español o inglés según la versión de la página.

### SEO e internacionalización

La estructura por carpetas permite URLs limpias (`/es/servicios/`, `/en/services/`) y sienta las bases para:

- `hreflang` por idioma;
- metadatos localizados;
- enlazado interno coherente;
- ampliación futura del sitemap;
- contenido organizado por idioma.

### Responsive e identidad visual

Los estilos base ya contemplan una navegación adaptable, componentes reutilizables y un sistema visual consistente como punto de partida.

## Próximos pasos sugeridos

1. Completar el contenido real de home, servicios, agencia y contacto.
2. Poblar `content/es/` y `content/en/` con copy definitivo.
3. Añadir datos reales a proyectos, servicios y testimonios.
4. Incorporar SEO avanzado: Open Graph, datos estructurados y sitemap XML.
5. Integrar formularios y analítica sin perder simplicidad técnica.
