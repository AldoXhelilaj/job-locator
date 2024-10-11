# Job Listings Application

This is a React application that displays job listings based on selected cities in Germany. It includes features like search functionality, filtering for remote jobs, and error handling for network issues.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)


## Features

- Search for cities in Germany.
- Filter job listings by remote status.
- Error handling for network issues.
- Responsive design.

## Technologies Used

- React
- Redux
- Redux Toolkit
- React Map GL (for map functionality)
- CSS (for styling)

## Installation

Follow these steps to set up the application locally:

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>

## Environment Variables

To run this application, you will need to create a `.env` file in the root directory of the project. 

VITE_API_URL=https://www.arbeitnow.com/api/job-board-api
VITE_ACCESS_TOKEN=(its in the email, for security reasons i cant put it here)
VITE_FIREBASE_API

## Docker Installation
To run this application using Docker, follow these steps:
Install Docker:
Ensure Docker is installed on your machine. You can download it from the official Docker website.
Navigate to Project Directory:
Open your terminal and navigate to the directory where you downloaded the project:
bash
cd path/to/your/project

Build the Docker Image:
Run the following command to build the Docker image using the provided Dockerfile:
bash
docker build -t job-listings-app .

Run the Docker Container:
After building the image, you can run it with:
bash
docker run -d --rm -p 5173:5173 --name job-listings-container job-listings-app

Access Your Application:
Open a web browser and navigate to http://localhost:5173 to access your application.
By following these instructions, you can set up and run the Job Listings Application either locally or using Docker.