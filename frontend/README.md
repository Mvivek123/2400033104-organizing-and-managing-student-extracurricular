# Extracurricular Manager Frontend

This React application provides a simple UI for managing student extracurricular activities including clubs, events, and students. It uses Material UI for styling and React Router for navigation.

## Features

- Login page with simple authentication flow and role selection (student/admin)
- Home dashboard showing stats, quick actions, profile and notifications links
- Clubs management: overview, search/filter stub, details page
- Event management: overview calendar stub, details page
- Admin features: event creation/editing and admin dashboard
- Student profile, notifications, and attendance tracking stubs
- Role‑based access control using protected routes
- Responsive UI using Material UI components

## Getting Started

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run locally**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`.
   You will be taken to the login page; enter any username/password and choose a role.
   
   Once logged in, use the navigation bar or dashboard buttons to visit:
   - Dashboard
   - Clubs (overview & details)
   - Events (overview & details)
   - Students
   - Profile
   - Notifications
   - Attendance
   - Admin (visible only when logged in as admin)

3. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

The project can be deployed using platforms like Vercel, Netlify, or Render. After building the production bundle, connect your repository and follow the platform-specific instructions. For example, on Vercel:

- Install the [Vercel CLI](https://vercel.com/docs/cli) or connect via the GitHub integration.
- Run `vercel` inside the `frontend` directory and follow prompts.

> **Example deployed link (replace with your own):** `https://extracurricular-manager.vercel.app`

Feel free to customize the UI and add backend integration as needed.
