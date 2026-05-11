# Expense Tracker

A beginner-friendly **Expense Tracker** built with **React** and **Vite**. Add expenses, see them in a list, delete items, and keep everything saved in the browser with **localStorage** — no backend required.

**Repository:** [github.com/farmanali007/expense-tracker](https://github.com/farmanali007/expense-tracker)

## Features

- **Add expenses** — Title and amount with validation (no empty fields, valid positive amounts)
- **Expense list** — Renders all entries dynamically
- **Delete** — Remove an expense (with a simple confirmation)
- **Running total** — Sum of all expense amounts
- **Persistence** — Data survives refresh via `localStorage` under the key `expenses`

## Tech stack

- [React](https://react.dev/) (functional components only)
- [Vite](https://vite.dev/) — fast dev server and build
- Plain CSS (`src/index.css`)

No TypeScript, Redux, or external state libraries.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

### Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other commands

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint               |

## Project structure

```
src/
├── components/
│   ├── ExpenseForm.jsx   # Form, validation, useRef to refocus title input
│   ├── ExpenseList.jsx   # Maps expenses to list items
│   └── ExpenseItem.jsx   # Single row + delete
├── App.jsx               # State, localStorage sync, total (reduce), add/delete
├── main.jsx
└── index.css
```

## Data shape

Each expense is a plain object:

```js
{ id: string, title: string, amount: number }
```

## Concepts used

- **`useState`** — Expense list and form fields
- **`useEffect`** — Save expenses to `localStorage` when the list changes
- **`useRef`** — Focus the title input after a successful submit
- **Props** — Data and callbacks between `App`, form, and list components
- **`map` / `filter` / `reduce`** — List rendering, delete, and total

## License

This project is for learning purposes. Use and modify freely.
