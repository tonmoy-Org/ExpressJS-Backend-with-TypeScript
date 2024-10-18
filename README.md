# Simple CRUD Backend with Express, Mongoose, and Redis

A basic Node.js application that demonstrates simple CRUD operations for a product management system using Express, Mongoose, and Redis for caching.

## Languages and Technologies Used

1. **JavaScript/TypeScript**: The backend is built using TypeScript, a superset of JavaScript that adds static types.
2. **Node.js**: A runtime environment for executing JavaScript code on the server-side.
3. **Express.js**: A web application framework for Node.js to build the RESTful API.
4. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, allowing for easy interaction with MongoDB databases.
6. **dotenv**: A library for managing environment variables for configuration.

## Features

- **CRUD Operations**:
  - **Create**: Add new products to the database.
  - **Read**: Retrieve product details by ID or list all products.
  - **Update**: Modify existing product details.
  - **Delete**: Remove products from the database.
  
- **API Endpoints**:
  - Provides RESTful endpoints for managing products under the `/api/products` route.

- **Redis Caching**:
  - Implements caching for faster retrieval of product data.

- **Environment Configuration**:
  - Uses environment variables to manage database credentials and configuration.
