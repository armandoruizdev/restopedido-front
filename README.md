# RESTOPEDIDO (SPA)

Stack:
- React 18 + Vite (TypeScript)
- React Router v6
- React Query (@tanstack/react-query)
- Zustand (carrito/sesión)
- Tailwind CSS (+ listo para shadcn/ui)
- React Hook Form + Zod
- Axios (withCredentials + Sanctum)

## Desarrollo

1. Variables de entorno

Crea un `.env` en la raíz del proyecto con:

```
VITE_API_BASE_URL=http://localhost:8000
```

2. Instalar dependencias y ejecutar

```bash
npm install
npm run dev
```

## Axios + Sanctum

- El cliente `src/lib/axios.ts` está configurado con `withCredentials: true`.
- Se realiza `GET /sanctum/csrf-cookie` automáticamente antes de la primera petición.
- No se usa localStorage para tokens; la sesión viaja en cookies HttpOnly.

## Rutas base
- `/` inicio
- `/menu` catálogo
- `/cart` carrito
- `/checkout` checkout con ejemplo de formulario (RHF + Zod)

## Estado Global
- `src/stores/cart.ts`: items, totales y acciones de carrito
- `src/stores/session.ts`: usuario autenticado

## UI
- Tailwind listo. Puedes integrar componentes de shadcn/ui cuando lo desees.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
