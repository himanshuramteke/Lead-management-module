# Lead Management System

A full-stack web application for managing sales leads with a modern React frontend and Express.js backend.

## Tech Stack

### Frontend

- **React 19.1.1** - Modern UI library
- **Vite 7.1.2** - Fast build tool and dev server
- **TailwindCSS 4.1.12** - Utility-first CSS framework
- **React Router 7.8.2** - Client-side routing
- **Axios 1.11.0** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** with **Express 5.1.0** - Web framework
- **MongoDB** with **Mongoose 8.18.0** - Database and ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-restart

## Features

- Create, read, update, and delete leads
- Modern responsive UI with TailwindCSS
- Real-time form validation
- Toast notifications for user feedback
- RESTful API architecture
- MongoDB database integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Lead-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb_url
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server

### Backend

- `npm run dev` - Start development server with nodemon

## API Endpoints

The backend provides RESTful API endpoints for lead management:

- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

### Thanks
