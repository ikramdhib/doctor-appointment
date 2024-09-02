# Doctor Appointment Management System

This project is a Doctor Appointment Management System built with Angular 17 for the frontend and Node.js (Express) for the backend. The system allows doctors to manage their availability, patients to book appointments, and both parties to receive notifications.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- **Doctor Management**: Doctors can define their availability (date, time, mode: online/in-person).
- **Appointment Booking**: Patients can book appointments based on the doctor's availability.
- **Notifications**: Real-time notifications for both doctors and patients regarding appointment status.
- **Calendar Integration**: View and manage appointments via a calendar interface.
- **Responsive Design**: User-friendly design optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: Angular 17, TypeScript, Angular Material
- **Backend**: Node.js, Express, MongoDB
- **Real-time Communication**: WebSockets
- **Database**: MongoDB with Mongoose
- **Styling**: SCSS, CSS

## Getting Started

### Prerequisites

- **Node.js** (v18.x or higher)
- **Angular CLI** (v17.x)
- **MongoDB** (local or cloud instance)

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ikramdhib/doctor-appointment.git
   
2. Install dependencies:

   ```bash
   npm install
   
3. Start the Angular development server:

   ```bash
   ng serve
   
## Running the Application

1. Ensure both the frontend and backend servers are running. (clone backend project from [https://github.com/ikramdhib/doctor-appointment-backend.git])
2. Open your browser and navigate to http://localhost:4200 to access the application.

## Project Structure

### Frontend 

    
      frontend/
      ├── src/
      │   ├── app/
      │   ├── assets/
      │   ├── environments/
      │   ├── index.html
      │   ├── main.ts
      │   ├── styles.scss
      ├── angular.json
      ├── package.json

## Contributing 

Contributions are welcome! Please follow the guidelines in the CONTRIBUTING.md file.

  
