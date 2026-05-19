# Historial de lecturas — Design Spec
**Fecha:** 2026-05-19  
**Estado:** Aprobado

---

## Resumen

Agregar una página de historial personal de lecturas (`/lecturas`) accesible desde el banner del home. La página es minimalista, sin nav completo, y muestra todos los libros leídos desde que inició el book club, agrupados por año con fecha, título, autora y rating de estrellas.

---

## 1. Cambios en el banner (`index.html`)

### Bloque "Ahora leyendo (yo)"
- Cambiar texto de: `El descontento · Beatriz Serrano`
- A: `Fuego en la sangre · Beatriz Serrano`
- El dot `.reading` (lavanda) y estado activo se mantienen igual.

### Bloque "Terminé de leer"
- Cambiar texto de: `El voluntario · Jack Fairweather`
- A: `El descontento · Beatriz Serrano`
- Agregar un link pequeño debajo del título: `ver más →` que apunta a `/lecturas`
- El link debe respetar el estilo muted del bloque (opacity 0.42). Fuente ~10px, color blanco con opacidad baja, sin subrayado salvo hover.

---

## 2. Nueva página: `lecturas.html`

### Estructura general
- Sin navbar completo.
- Solo un `← volver` en la parte superior izquierda que regresa a `/` (el home).
- Mismo `<head>` que el resto del sitio: fuentes Raleway + Lora, colores CSS variables.

### Header de página
- Título: **"Mis lecturas"** (grande, peso 700, color `--ink`)
- Subtítulo: *"Todo lo que he leído desde que empezó el club"* (pequeño, color `--muted`, peso 300)

### Lista de libros
- Agrupada por año con encabezado de año (`font-size: 10px`, `letter-spacing: 0.22em`, `text-transform: uppercase`, color `--blue`, con línea divisoria inferior y contador de libros a la derecha en `--muted`).
- Cada fila de libro contiene:
  - **Fecha**: mes y año (ej. `may 2026`) — `font-size: 10px`, color `--muted`, ancho fijo ~56px
  - **Punto de color**: `5×5px`, `border-radius: 50%`, color rotatorio entre `--lavanda`, `--blue`, `#10b981`, `#fbbf24`, `#f87171`, `#a78bfa`
  - **Título**: `font-family: Lora`, `font-style: italic`, `font-size: 14px`, color `--ink`
  - **Autora**: `font-size: 11px`, color `--muted`, debajo del título
  - **Rating**: estrellas `★` rellenas y vacías `☆`, `font-size: 11px`, color `#fbbf24`, alineado a la derecha
- Separador entre filas: `border-bottom: 1px solid rgba(0,0,0,0.06)`
- Sin portadas.

### Datos de libros
Los libros del historial serán proporcionados por la usuaria antes de implementar. Formato esperado: título, autora, mes/año terminado, rating (1–5).

### Navegación de regreso
- Esquina superior izquierda: `← volver` — link a `/`
- `font-size: 11px`, `font-weight: 600`, `letter-spacing: 0.1em`, `text-transform: uppercase`, color `--muted`
- Sin más navegación en la página.

---

## 3. `vercel.json`

Agregar un rewrite para que `/lecturas` sirva `lecturas.html`:

```json
{ "source": "/lecturas", "destination": "/lecturas.html" }
```

---

## Archivos a crear / modificar

| Archivo | Acción |
|---|---|
| `index.html` | Modificar 2 bloques del banner |
| `lecturas.html` | Crear nuevo |
| `vercel.json` | Agregar rewrite `/lecturas` |

---

## Fuera de scope

- No se agrega "Mis lecturas" al nav principal.
- No hay filtros, búsqueda ni paginación en esta versión.
- No hay portadas de libros.
- La página no es una sección del home, es una página independiente.
