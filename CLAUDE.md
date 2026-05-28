# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (HMR via `@vitejs/plugin-react-swc`)
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint over `**/*.{js,jsx}` (config at [eslint.config.js](eslint.config.js))

There is no test runner configured in this repo.

## Architecture

This is a single-page React 18 + Vite app for an educational landing page ("EDU-Quest"). It has no router-based pages yet — [src/App.jsx](src/App.jsx) renders the home page sections in order (`Hero`, `CoursesSection`, `FAQSection`, `AboutUs`, `Testimonial`, `Footer`). `BrowserRouter` is mounted in [src/main.jsx](src/main.jsx) but route definitions don't exist yet; navbar links use in-page anchors (`#hero`, `#courses`, etc.).

### Three cross-cutting concerns wired together at the app root

1. **Theme** — `styled-components` `ThemeProvider` in [src/App.jsx](src/App.jsx) selects between `lightTheme` / `darkTheme` from [src/styles/themes.js](src/styles/themes.js). State lives in a Redux slice ([src/store/slices/themeSlice.js](src/store/slices/themeSlice.js)) where the entire slice value is the string `"light"` or `"dark"` (not an object — `useSelector(state => state.theme)` returns the string directly).
2. **Internationalization** — `react-i18next` is initialized in [src/i18n.js](src/i18n.js) with `en` and `ar` resources from `src/locales/`. There is also a Redux `languageSlice` ([src/store/slices/languageSlice.js](src/store/slices/languageSlice.js)) that mirrors the language and calls `i18n.changeLanguage()` on toggle. `App.jsx` reads the language from `useTranslation()` (not Redux) to set `dir="rtl"` for Arabic and to inject `lang` into the styled-components theme.
3. **Loader** — [src/utils/api/api.js](src/utils/api/api.js) is the axios instance. Its request/response interceptors dispatch `showLoader`/`hideLoader` to [src/store/slices/loaderSlice.js](src/store/slices/loaderSlice.js), which uses a `requestCount` so concurrent requests don't prematurely hide the spinner. `API_BASE_URL` is currently hardcoded to `http://localhost:3000/api` and `ENDPOINTS` ([src/utils/api/endPoints.js](src/utils/api/endPoints.js)) is empty — the backend integration hasn't been built out.

### Styling conventions

- Styled-components is the primary styling system. Co-locate styles next to components in a sibling `*.styles.js` file (see [src/components/homePageComponents/heroSection/hero.styles.js](src/components/homePageComponents/heroSection/hero.styles.js) alongside `Hero.jsx`).
- Reusable styled primitives live in [src/components/common/](src/components/common/): `buttons/` (`PrimaryButton`, `SecondaryButton`, plus variants like `PrimarySharedButton`) and `texts/` (`MainHeading`, `NormalText`, `SmallText`, `Titles`).
- Theme colors are read via `${({ theme }) => theme.colors.X}`. Available keys are defined in [src/styles/themes.js](src/styles/themes.js) — `darkTheme` spreads `lightTheme.colors` and overrides selectively.
- [src/styles/GlobalStyles.js](src/styles/GlobalStyles.js) sets `html { font-size: 10px }` (so `1rem = 10px`) and exposes responsive CSS variables `--big-text`, `--normal-text`, `--small-text`, `--min-text`. Use these vars rather than hardcoding font sizes.
- Bootstrap CSS is imported globally in [src/main.jsx](src/main.jsx) and `react-bootstrap` components (`Container`, `Row`, `Col`, `Navbar`) are used heavily. Wrap content in [`MyContainer`](src/components/ui/myContainer/MyContainer.jsx) instead of `Container` directly — it applies the project's responsive padding.

### Component organization

- [src/components/ui/](src/components/ui/) — chrome shared across pages (navbar, footer, container).
- [src/components/homePageComponents/](src/components/homePageComponents/) — section components specific to the home page, grouped per section with their styles and sub-components.
- [src/components/common/](src/components/common/) — reusable styled primitives.
- [src/pages/](src/pages/) — route-level pages (currently only `SignUp`, not yet wired into routing).

### Lint quirks

The ESLint config ignores unused vars whose names start with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`) — useful for unused `import Foo from ...` of styled components during refactors. `react-refresh/only-export-components` is set to `warn` with `allowConstantExport: true`.

### Notes on existing code style

- Many source files contain Arabic comments — preserve them when editing.
- Redux slices are named with the suffix `Slice` and exported as default (the reducer); actions are named exports.
- The store ([src/store/store.js](src/store/store.js)) keys are `loader`, `theme`, `lang` — match these exactly in `useSelector`.
