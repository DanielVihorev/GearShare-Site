# GearShare App

Welcome to the GearShare App, a modern web application for automotive professionals to find, buy, and manage auto parts. This project is built with a focus on a clean, scalable, and feature-based architecture.

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/a7723b5b-3ec9-4995-b1de-52638ac8dc19" />


## ✨ Features

- **Responsive Landing Page**: A fully responsive, modern landing page to introduce the application.
- **Multi-Page Routing**: Client-side routing set up with `react-router-dom` to handle navigation between pages.
- **Mobile-First Navigation**: Includes a fully functional "burger" menu for a seamless experience on mobile devices.
- **Authentication Flow**: Placeholder pages and components for user Login and Registration.
- **404 Not Found Page**: A user-friendly 404 page for handling invalid URLs.

## 🛠️ Tech Stack

<img width="1658" height="1610" alt="Screenshot 2025-07-24 at 9 52 40" src="https://github.com/user-attachments/assets/b84edf8c-91b1-4fb2-a07f-4bf1b7a73a35" />


This project is built using a modern, robust tech stack:

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Code Quality**: ESLint

## 📁 Project Structure

This project follows a `feature-based` directory structure to keep the codebase organized and scalable.

```
/src
|-- /app                # Global settings, providers (to be added)
|-- /assets             # Static assets like images, fonts
|-- /components         # Globally reusable, "dumb" UI components (e.g., Button, Input)
|   |-- /ui
|   |-- /icons
|-- /features           # Contains distinct application features
|   |-- /authentication # Logic and components for login/register
|   |-- /landing        # Components specific to the landing page experience
|-- /hooks              # Global, reusable custom hooks
|-- /layout             # Shared layout components (e.g., MainLayout with Header/Footer)
|-- /pages              # Top-level components for each application route
|-- /lib                # Library configurations (e.g., axios instances)
```

Best Regards,
Gear Share Tech Lead Kiril Novikov.
