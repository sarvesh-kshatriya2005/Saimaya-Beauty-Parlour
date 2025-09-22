# Saimaya Beauty Parlour - Beauty Services Platform

## Overview

Saimaya Beauty Parlour is a comprehensive beauty services platform that combines a luxury beauty salon with a professional makeup academy. The application features an elegant frontend for service bookings and inquiries, with an admin dashboard for managing appointments and contact requests. The platform showcases premium beauty services including bridal makeup, hair styling, nail art, and skincare treatments, while also offering professional certification courses through their academy program.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, featuring a component-based architecture with the following design patterns:
- **Component Library**: Utilizes shadcn/ui components built on Radix UI primitives for consistent, accessible UI elements
- **Routing**: Uses wouter for lightweight client-side routing with dedicated pages for different service sections
- **State Management**: Implements TanStack Query for server state management and caching
- **Styling**: TailwindCSS with custom design system based on luxury beauty brand aesthetics (soft rose, deep plum, cream white color palette)
- **Typography**: Google Fonts integration with Playfair Display (serif) for headings and Inter (sans-serif) for body text

### Backend Architecture
The backend follows an Express.js REST API pattern with the following structure:
- **Server Framework**: Express.js with TypeScript for type safety
- **API Routes**: RESTful endpoints for contact inquiries and appointment bookings
- **Data Storage**: In-memory storage implementation with interface-based architecture for future database migration
- **Development Setup**: Vite integration for development with hot module replacement

### Data Storage Solutions
Currently implements an in-memory storage system with well-defined interfaces:
- **Storage Interface**: `IStorage` defines CRUD operations for users, contact inquiries, and appointments
- **Database Schema**: PostgreSQL schema defined using Drizzle ORM with tables for users, contact inquiries, and appointments
- **Migration Ready**: Drizzle configuration prepared for PostgreSQL database deployment

### Authentication and Authorization
Basic user schema implemented with username/password fields, preparing for future authentication implementation.

### Form Handling and Validation
- **Form Library**: React Hook Form with Zod for schema validation
- **Validation**: Shared validation schemas between frontend and backend using Drizzle-Zod integration
- **Error Handling**: Comprehensive error handling with user-friendly messages

### UI/UX Design System
- **Design Guidelines**: Comprehensive design system documented in `design_guidelines.md` with luxury beauty brand aesthetics
- **Component Consistency**: shadcn/ui component library ensures consistent styling and behavior
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: Built-in accessibility features through Radix UI primitives

## External Dependencies

### Core Technologies
- **React 18** with TypeScript for component-based UI development
- **Express.js** for backend API server
- **Vite** as build tool and development server with HMR support

### Database & ORM
- **Drizzle ORM** for type-safe database operations and migrations
- **PostgreSQL** as the target production database (via DATABASE_URL environment variable)
- **Neon Database** serverless PostgreSQL integration for cloud deployment

### UI & Styling
- **TailwindCSS** for utility-first styling with custom design tokens
- **shadcn/ui** component library built on Radix UI primitives
- **Radix UI** for accessible, unstyled UI components
- **Google Fonts** for typography (Playfair Display, Inter, Dancing Script)

### State Management & Data Fetching
- **TanStack Query** for server state management, caching, and synchronization
- **React Hook Form** with Hookform Resolvers for form state management
- **Zod** for runtime type validation and schema definition

### Development Tools
- **TypeScript** for static type checking across the entire application
- **ESBuild** for fast production builds
- **PostCSS** with Autoprefixer for CSS processing

### Asset Management
- Static image assets stored in `attached_assets/generated_images/` directory
- Vite alias configuration for clean asset imports (`@assets`)

### Session & Storage
- **connect-pg-simple** for PostgreSQL session storage (prepared for future auth implementation)
- Interface-based storage abstraction allowing easy migration from in-memory to database storage