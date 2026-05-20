# Historial de Lecturas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar el banner con la lectura actual y agregar una página `/lecturas` con el historial personal de libros terminados.

**Architecture:** Sitio estático HTML/CSS/JS puro. Sin build step — los cambios van directo a los archivos y se hace push. Tres archivos afectados: `index.html` (banner), `lecturas.html` (nueva), `vercel.json` (rewrite).

**Tech Stack:** HTML, CSS, sin frameworks. Google Fonts (Raleway + Lora). Deploy en Vercel vía push a `main`.

---

## Files

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `index.html` | Modificar | Actualizar 2 bloques del banner + agregar link "ver más" |
| `lecturas.html` | Crear | Página de historial completa |
| `vercel.json` | Modificar | Agregar rewrite `/lecturas` |

---

## Task 1: Actualizar el banner en `index.html`

**Files:**
- Modify: `index.html:342-373`

**Cambios:**
1. Bloque "Ahora leyendo": *El descontento* → *Fuego en la sangre*
2. Bloque "Terminé de leer": *El voluntario* → *El descontento*, agregar link "ver más →"
3. Agregar estilo CSS `.banner-ver-mas` en el `<style>` del head

- [ ] **Step 1: Agregar estilo del link "ver más" al CSS**

Buscar en `index.html` el bloque de estilos del banner (alrededor de línea 57-63) y agregar justo después de `.banner-value em { ... }`:

```css
.banner-ver-mas { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.6); text-decoration: none; margin-top: 3px; display: inline-block; transition: color 0.2s; }
.banner-ver-mas:hover { color: #fff; }
```

- [ ] **Step 2: Actualizar bloque "Ahora leyendo"**

Encontrar (líneas ~342-348):
```html
  <div class="banner-block">
    <div class="banner-dot reading"></div>
    <div class="banner-text">
      <span class="banner-label">Ahora leyendo (yo)</span>
      <span class="banner-value">El descontento · <em>Beatriz Serrano</em></span>
    </div>
  </div>
```

Reemplazar por:
```html
  <div class="banner-block">
    <div class="banner-dot reading"></div>
    <div class="banner-text">
      <span class="banner-label">Ahora leyendo (yo)</span>
      <span class="banner-value">Fuego en la sangre · <em>Beatriz Serrano</em></span>
    </div>
  </div>
```

- [ ] **Step 3: Actualizar bloque "Terminé de leer" y agregar link**

Encontrar (líneas ~366-372):
```html
  <div class="banner-block muted">
    <div class="banner-dot done"></div>
    <div class="banner-text">
      <span class="banner-label">Terminé de leer</span>
      <span class="banner-value">El voluntario · <em>Jack Fairweather</em></span>
    </div>
  </div>
```

Reemplazar por:
```html
  <div class="banner-block muted">
    <div class="banner-dot done"></div>
    <div class="banner-text">
      <span class="banner-label">Terminé de leer</span>
      <span class="banner-value">El descontento · <em>Beatriz Serrano</em></span>
      <a href="/lecturas" class="banner-ver-mas">ver más →</a>
    </div>
  </div>
```

- [ ] **Step 4: Verificar en navegador**

Abrir `index.html` en el browser local. Confirmar:
- Banner muestra "Fuego en la sangre · Beatriz Serrano" en el slot activo
- Banner muestra "El descontento · Beatriz Serrano" en "Terminé de leer"
- El link "ver más →" es visible (sutil, opacity baja) y hace hover a blanco
- El link "ver más →" lleva a `/lecturas` (redirigirá a 404 hasta el siguiente task)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Update banner: Fuego en la sangre now reading, El descontento done + ver más link"
```

---

## Task 2: Crear `lecturas.html`

**Files:**
- Create: `lecturas.html`

Nota: El mes exacto de *El voluntario* no está confirmado — se usa `abr 2026` como estimado. Se puede ajustar directamente en el HTML después.

- [ ] **Step 1: Crear el archivo `lecturas.html`**

Crear `/Users/danielacardona/Documents/Apps/ChapterOne/lecturas.html` con el siguiente contenido completo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mis lecturas · chapter one.</title>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --blue:    #1A47B8;
      --lavanda: #7B74D4;
      --navy:    #1A1A2E;
      --bg:      #FAFAFA;
      --ink:     #16162a;
      --muted:   #6b7280;
      --border:  #e5e4f0;
      --serif:   'Lora', Georgia, serif;
      --sans:    'Raleway', sans-serif;
    }
    body { background: var(--bg); color: var(--ink); font-family: var(--sans); font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }

    .back-nav { padding: 28px 40px 0; }
    .back-link { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
    .back-link:hover { color: var(--ink); }

    .page-wrap { max-width: 640px; margin: 0 auto; padding: 48px 40px 100px; }

    .page-title { font-size: 32px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
    .page-sub { font-size: 14px; font-weight: 300; color: var(--muted); margin-bottom: 48px; }

    .year-header { display: flex; justify-content: space-between; align-items: baseline; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--blue); padding-bottom: 8px; border-bottom: 1.5px solid var(--blue); margin-bottom: 4px; margin-top: 32px; }
    .year-count { font-weight: 400; color: var(--muted); letter-spacing: 0; text-transform: none; font-size: 10px; }

    .book-row { display: flex; align-items: baseline; gap: 14px; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
    .book-date { font-size: 10px; color: var(--muted); width: 58px; flex-shrink: 0; }
    .book-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
    .book-main { flex: 1; min-width: 0; }
    .book-title { font-family: var(--serif); font-style: italic; font-size: 14px; color: var(--ink); font-weight: 400; line-height: 1.3; }
    .book-author { font-size: 11px; color: var(--muted); margin-top: 2px; }
    .book-stars { font-size: 11px; color: #fbbf24; white-space: nowrap; flex-shrink: 0; }

    @media (max-width: 600px) {
      .back-nav { padding: 20px 20px 0; }
      .page-wrap { padding: 36px 20px 80px; }
      .page-title { font-size: 26px; }
    }
  </style>
</head>
<body>

<div class="back-nav">
  <a href="/" class="back-link">← volver</a>
</div>

<div class="page-wrap">
  <h1 class="page-title">Mis lecturas</h1>
  <p class="page-sub">Todo lo que he leído desde que empezó el club</p>

  <div class="year-header">
    <span>2026</span>
    <span class="year-count">2 libros</span>
  </div>

  <div class="book-row">
    <span class="book-date">may 2026</span>
    <div class="book-dot" style="background:#7B74D4"></div>
    <div class="book-main">
      <div class="book-title">El descontento</div>
      <div class="book-author">Beatriz Serrano</div>
    </div>
    <span class="book-stars">★★★★★</span>
  </div>

  <div class="book-row">
    <span class="book-date">abr 2026</span>
    <div class="book-dot" style="background:#1A47B8"></div>
    <div class="book-main">
      <div class="book-title">El voluntario</div>
      <div class="book-author">Jack Fairweather</div>
    </div>
    <span class="book-stars">★★★★☆</span>
  </div>

</div>

</body>
</html>
```

- [ ] **Step 2: Verificar en navegador**

Abrir `lecturas.html` directamente en el browser (file://). Confirmar:
- El link `← volver` está visible arriba a la izquierda en color muted
- El título "Mis lecturas" se ve grande y bold
- El subtítulo en muted debajo
- Encabezado "2026" con borde azul y contador "2 libros" a la derecha
- Dos filas: El descontento (★★★★★) y El voluntario (★★★★☆)
- Puntos de color: lavanda para el primero, azul para el segundo
- Se ve bien en mobile (si puedes probar con DevTools)

- [ ] **Step 3: Commit**

```bash
git add lecturas.html
git commit -m "Add lecturas.html: reading history page"
```

---

## Task 3: Agregar rewrite en `vercel.json`

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Agregar rewrite para `/lecturas`**

El archivo actual es:
```json
{
  "rewrites": [
    { "source": "/shop",       "destination": "/shop.html" },
    { "source": "/blog",       "destination": "/blog.html" },
    { "source": "/blog-abril", "destination": "/blog-abril.html" },
    { "source": "/blog-cinco", "destination": "/blog-cinco.html" }
  ]
}
```

Reemplazar por:
```json
{
  "rewrites": [
    { "source": "/shop",       "destination": "/shop.html" },
    { "source": "/blog",       "destination": "/blog.html" },
    { "source": "/blog-abril", "destination": "/blog-abril.html" },
    { "source": "/blog-cinco", "destination": "/blog-cinco.html" },
    { "source": "/lecturas",   "destination": "/lecturas.html" }
  ]
}
```

- [ ] **Step 2: Commit y push**

```bash
git add vercel.json
git commit -m "Add /lecturas rewrite to vercel.json"
git push
```

- [ ] **Step 3: Verificar en producción**

Después del deploy en Vercel (automático al push a `main`):
- Abrir el site en producción
- Confirmar que el banner muestra "Fuego en la sangre" como lectura activa
- Confirmar que "ver más →" aparece en el bloque "Terminé de leer"
- Hacer click en "ver más →" → debe abrir `/lecturas` con el historial
- Confirmar que `← volver` regresa al home

---

## Notas para después

- El mes de *El voluntario* está marcado como `abr 2026` — ajustar en `lecturas.html` si la fecha es otra.
- Cuando termines un nuevo libro, agregar una fila en `lecturas.html` y actualizar el banner. El contador del año también se actualiza manualmente.
