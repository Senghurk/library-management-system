# Library Management System

## Project Description

The Library Management System is for WAD Project-02 Full-Stack CRUD App, a web-based application designed to efficiently manage books, authors, and genres in a library setting. This project provides a user-friendly interface for librarians or administrators to perform CRUD (Create, Read, Update, Delete) operations on books, authors, and genres.

### Key Features:

- **Books Management**: Add, view, edit, and delete books with details such as title, author, genre, published year, and summary.
- **Authors Management**: Maintain author information including name, biography, birthdate, and nationality.
- **Genres Management**: Organize and manage book genres with descriptions.
- **Search and Filter**: Easily find books, authors, or genres using search and filter functionalities.
- **Responsive UI**: A clean and intuitive user interface that works well on various devices.

## Tech Stack

This project is built using modern web technologies to ensure performance, scalability, and ease of maintenance:

### Frontend

- **React.js**: A JavaScript library for building user interfaces
- **Next.js**: A React framework for production-grade applications
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development

### Backend

- **Next.js API Routes**: For building a serverless REST API
- **Vercel KV**: A durable serverless Redis database for data persistence

### State Management

- **React Context API**: For managing application state

### Package Manager

- **pnpm**: A fast, disk space efficient package manager

### Deployment

- **Vercel**: For deployment and hosting

### Development Tools

- **ESLint**: For identifying and reporting on patterns in JavaScript
- **Prettier**: For code formatting
- **PostCSS**: For transforming CSS with JavaScript

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Set up Vercel KV:
   - Create a Vercel KV database in your Vercel project settings
   - Add the necessary environment variables for Vercel KV connection
4. Run the development server with `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributors

- Sai Oan Hseng Hurk - 6440041
- Aung Khant         - 6511724
- Kaung Myat Min     - 6511149

## License

This project is open source and available under the [MIT License](LICENSE).