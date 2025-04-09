# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands
- Frontend: `npm run dev` - Run Next.js development server
- Frontend: `npm run build` - Build Next.js application
- Frontend: `npm run lint` - Run ESLint for code linting
- Backend: `./mvnw spring-boot:run` - Run Spring Boot application
- Backend: `./mvnw test` - Run all tests
- Backend: `./mvnw test -Dtest=CustomerRepositoryTests` - Run a specific test

## Code Style Guidelines
- **Frontend:** Next.js with React 19, TypeScript, Tailwind CSS
- **Backend:** Java 21 with Spring Boot, JPA, and JWT authentication
- **Naming:** Use camelCase for variables and PascalCase for components/classes
- **Imports:** Group imports by type (React, components, utils, styles)
- **Error Handling:** Use try/catch blocks with appropriate error logging
- **CSS:** Prefer Tailwind utility classes with module CSS for component-specific styles
- **Authentication:** Use cookie-based authentication with JWT tokens
- **Formatting:** 2-space indentation and single quotes in JavaScript/TypeScript