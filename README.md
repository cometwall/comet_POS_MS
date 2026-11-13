# pos_MS

Frontend del sistema POS, construido con [Nuxt 4](https://nuxt.com) + Vue 3, Pinia para el estado de autenticación y Tailwind CSS para estilos.

## Requisitos previos

- Node.js 20+
- [pnpm](https://pnpm.io/) (el proyecto usa `pnpm-lock.yaml` y `pnpm-workspace.yaml`)
- [mkcert](https://github.com/FiloSottile/mkcert) para generar certificados HTTPS locales (el servidor de desarrollo corre en HTTPS)
- La API backend corriendo (por defecto se espera en `https://localhost:7005`)

## Instalación

```bash
pnpm install
```

### 1. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la URL base de la API:

```bash
NUXT_PUBLIC_API_BASE=https://localhost:7005
```

Si no se define, por defecto usa `https://localhost:7005` (ver `nuxt.config.ts`).

### 2. Certificados HTTPS locales

El servidor de desarrollo (`nuxt.config.ts`) está configurado para levantar en HTTPS usando certificados en `./certs/`. Genera los tuyos con mkcert:

```bash
mkcert -install
mkdir certs
mkcert -cert-file certs/localhost+2.pem -key-file certs/localhost+2-key.pem localhost 127.0.0.1 ::1
```

Esto crea `certs/localhost+2-key.pem` y `certs/localhost+2.pem`, que son los nombres que espera `nuxt.config.ts`. Esta carpeta está en `.gitignore`, no se versiona.

## Servidor de desarrollo

Levanta el servidor en `https://localhost:3000`:

```bash
pnpm dev
```

## Build de producción

```bash
pnpm build
```

Previsualizar el build de producción localmente:

```bash
pnpm preview
```

Generar un sitio estático (SSG):

```bash
pnpm generate
```

Más detalles en la [documentación de despliegue de Nuxt](https://nuxt.com/docs/getting-started/deployment).

## Estructura del proyecto

```
app/
  app.vue                         # Root component (NuxtLayout + NuxtPage)
  assets/css/main.css             # Estilos globales (Tailwind)
  composables/useApi.ts           # Cliente HTTP (ofetch) con refresh automático en 401
  features/auth/components/       # Componentes del feature de autenticación (LoginForm, ...)
  layouts/
    auth.vue                      # Layout para páginas públicas (login)
    default.vue                   # Layout general de la app
  middleware/auth.global.ts       # Middleware global: exige login y rol mínimo por ruta
  pages/                          # Rutas (file-based routing de Nuxt)
    index.vue                     # Redirige a /dashboard o /login según sesión
    login.vue
    dashboard.vue
  stores/auth.ts                  # Store Pinia: usuario, login, logout, refresh, niveles de rol
  types/
    auth.ts                       # Tipos de dominio (Rol, DTOs, UsuarioAutenticado)
    route-meta.d.ts                # Extiende RouteMeta con `publico` y `rolMinimo`
```

### Autenticación y rutas protegidas

- Toda ruta es privada por defecto. Para hacerla pública, usa `definePageMeta({ publico: true })` (como en `login.vue`).
- Para exigir un rol mínimo, usa `definePageMeta({ rolMinimo: 'Cajero' | 'Admin' | 'SuperAdmin' })` (como en `dashboard.vue`). Los niveles son jerárquicos: `Cajero < Admin < SuperAdmin`.
- Si un usuario no autenticado intenta entrar a una ruta privada, `auth.global.ts` lo redirige a `/login?redirect=<ruta original>`; tras loguearse, `LoginForm.vue` lo lleva a esa ruta o, si no había ninguna, a `/dashboard`.

## Scripts disponibles

| Script           | Descripción                                  |
|------------------|-----------------------------------------------|
| `pnpm dev`       | Servidor de desarrollo con hot-reload         |
| `pnpm build`     | Build de producción (SSR)                     |
| `pnpm generate`  | Build estático (SSG)                          |
| `pnpm preview`   | Sirve el build de producción localmente       |

## Stack

- [Nuxt 4](https://nuxt.com/docs/getting-started/introduction) / Vue 3
- [Pinia](https://pinia.vuejs.org/) para estado global
- [Tailwind CSS](https://tailwindcss.com/) (`@tailwindcss/vite`)
- [Zod](https://zod.dev/) para validación de formularios
- [Vitest](https://vitest.dev/) + `@nuxt/test-utils` para pruebas
