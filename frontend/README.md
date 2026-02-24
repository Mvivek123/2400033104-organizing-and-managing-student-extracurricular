# CampusConnect – Student Extracurricular Management System

CampusConnect is a modern React web application built with Create React App and Tailwind CSS.
It helps students discover, join and manage extracurricular clubs and events through a clean, responsive dashboard interface.
All data is stored in browser local storage or mocked JSON; there is no backend required.

## Core technologies

- React (Create React App)
- Tailwind CSS for styling
- React Router for navigation
- Local storage for persistence
- Context API for shared state (auth, clubs, events, notifications)

## Features summary

- **Authentication:** login, signup, logout with student/admin roles
- **Dashboard:** personalized greeting, stats (clubs joined, upcoming events, notifications, badges)
- **Navigation bar:** Home, Clubs, Events, Notifications, Profile, and a prominent “Create Event” button for admins
- **Clubs module:** browse/search/filter by category, club detail pages, join/leave, member counts, admin roles
- **Events module:** list/calendar view, create/edit/delete events (admin), register/unregister for events, full event details
- **Notifications:** read/unread indicators, mark individual or all read
- **Profile:** update basic info, upload avatar placeholder, track participation
- **Reusable components:** Navbar, Sidebar, Card, Button, Modal, FormInput
- **Responsive design:** mobile-first layout, Tailwind utilities
- **Mock persistence:** all data persisted in `localStorage` keys

## Getting started

```bash
cd frontend
npm install
npm run dev   # or npm start
```

Open `http://localhost:3000` in your browser. The first screen is the login/signup form. After logging in you can navigate around the app using the top bar.

## Project structure

```
frontend/
  node_modules/
  public/
  src/
    components/       # reusable presentational components
    context/          # React contexts for auth, clubs, events, notifications
    pages/            # route components (Login, Dashboard, Clubs, Events, etc.)
    App.js            # router and provider setup
    index.css         # includes Tailwind directives
    tailwind.config.js
    postcss.config.js
    ...
```

## Running in development

- `npm run dev` or `npm start` – start development server
- `npm run build` – create production build
- `npm test` – run tests (if added later)

## Notes

- All authentication and data operations are purely client-side and for demo purposes only.
- You can clear local storage in developer tools if you need to reset the application state.
- Feel free to extend with backend API calls, more complex validation, and polished UI later.

Enjoy building and customizing CampusConnect!
