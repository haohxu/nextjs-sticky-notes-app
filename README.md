# 📝 Sticky Notes App

A simple, interactive sticky notes application built with **Next.js App Router**, **TailwindCSS**, and **@dnd-kit** for drag-and-drop functionality. Notes are editable, draggable, and persist across sessions via `localStorage`.

---

## 🚀 Features

- ➕ Add new sticky notes
- 📝 Inline text editing
- 🟨 Realistic sticky-note UI with Tailwind
- 🖱️ Drag and drop notes anywhere
- 🔝 Automatically stack dragged or clicked notes to the top
- ❌ Delete notes easily
- 💾 Notes saved in `localStorage` (no backend needed)

---

## 🛠️ Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [@dnd-kit/core](https://docs.dndkit.com/) – modern drag-and-drop
- TypeScript

---

## 📦 Installation

```bash
git clone https://github.com/haohxu/nextjs-sticky-notes-app.git
cd sticky-notes-app
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main app page (Client Component)
│   ├── layout.tsx        # App layout
│   └── globals.css       # Tailwind styles
├── components/
│   └── Note.tsx          # Draggable, editable note component
├── hooks/
│   └── useLocalStorage.ts # Hook to sync state with localStorage
├── types/
│   └── index.ts          # Type definitions
```

---

## ✨ Future Ideas

- Add note colors or categories
- Add animations for adding/removing notes
- Implement resizable notes
- Make it a Progressive Web App (PWA) for offline use

---
