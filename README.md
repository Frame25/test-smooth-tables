# Smooth Tables - Technical Assessment Project

## Overview

This project was created as part of a technical assessment for a hiring company. The task was to develop a responsive interface for managing and displaying tables with various data types.

## Key Requirements

### Technical Stack

- **React**: Used as the primary UI library (React 19)
- **Redux**: Implemented with Redux Toolkit for state management
- **TypeScript**: For type safety throughout the application
- **ESLint & Prettier**: For code quality and consistent formatting
- **Vite**: For fast development and optimized builds
- **TailwindCSS**: For styling components

### Table Functionality

- Create, view, and manage multiple tables
- Support for different data types (text, number, boolean, select)
- Responsive grid layout that adapts to screen size
- Tables stretch to fill available width
- Maximum of 3 tables per row on larger screens
- Automatic resizing based on viewport

## Project Structure

The project follows a feature-based architecture:

```
src/
├── app/            # Application setup, store configuration
├── entities/       # Business entities (tables, etc.)
├── pages/          # Page components
├── shared/         # Shared utilities, UI components
└── widgets/        # Composite components
```

## Key Features

- **Dynamic Tables**: Create and manage tables with different field types
- **Responsive Layout**: Tables automatically adjust to fill the available space
- **Mock Data**: Pre-generated sample data for demonstration purposes
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean, accessible interface with modern design patterns

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Performance Optimizations

The project includes several optimizations:

- Chunk splitting for better loading performance
- Vendor bundle separation
- Optimized asset loading
- Responsive design for all screen sizes
