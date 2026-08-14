# Slots de imágenes editoriales

Esta carpeta está preparada para fotografías locales seleccionadas posteriormente. No se usan hotlinks ni imágenes de terceros en esta iteración.

## Slots recomendados

| Slot | Función | Orientación sugerida | Nombre base |
| --- | --- | --- | --- |
| Agencia | Mostrar el contexto de trabajo del equipo sin sustituir el contenido estratégico | Horizontal 16:9 | `agency-workspace` |
| Nosotros | Acompañar la presentación del equipo con una imagen real de colaboración | Horizontal 3:2 | `team-collaboration` |
| Servicios | Introducir visualmente el sistema que conecta los tres planes | Horizontal 16:9 | `services-system` |

## Preparación técnica

- Preferir AVIF con fallback WebP cuando se entreguen los originales.
- Usar `<picture>` dentro de `<figure class="editorial-media">`.
- Añadir `loading="lazy"` y `decoding="async"` fuera del contenido above-the-fold.
- Mantener dimensiones o `aspect-ratio` para evitar layout shift.
- Escribir `alt` según la función informativa concreta de cada imagen; si es puramente decorativa, usar `alt=""`.
