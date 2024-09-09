# jeremymark.ca

**jeremymark.ca** is my portfolio website where I showcase my [projects](https://jeremymark.ca/projects) and [experiences](https://jeremymark.ca/experiences).

## Links

- [GitHub Repository](https://github.com/JeremyTubongbanua/jeremymark_ca)
- [Live Site](https://jeremymark.ca)

## Technologies

This project leverages several modern technologies for a seamless user experience and robust infrastructure. Here's a breakdown of the tools and technologies used:

### Web Application

- **React**: The frontend is built using React, with functional components and hooks, providing an interactive user interface.
- **Tailwind CSS**: Tailwind is used to style the components with utility-first CSS, allowing for rapid UI development.
- **Vite**: Vite is used as the build tool for a faster development experience, allowing Hot Module Replacement (HMR) and optimized builds.

### Backend and API Integration

- **Spotify API**: The website features a "Currently Playing" section, integrated with the Spotify API, which shows the song I am currently listening to on Spotify.
- **Node.js/Express**: The backend is built with Node.js and Express, which serves the necessary endpoints for both the web application and the Spotify API.

### Containerization

- **Docker**: The entire project is containerized using Docker. Both the web application and the Spotify API run inside their respective containers, ensuring consistent environments for both development and production.
- **Docker Compose**: Docker Compose is used to manage the multi-container setup, with both services running on a Docker network bridge for easy communication between them.

### Web Server

- **Nginx**: Nginx serves as the reverse proxy for handling incoming traffic to the web application, ensuring scalability and performance.
- **HTTPS**: The site uses HTTPS for secure communication, and SSL certificates are managed using Let's Encrypt.
