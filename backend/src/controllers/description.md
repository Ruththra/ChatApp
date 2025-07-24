# Controllers Folder in Backend Development

In backend development, especially with frameworks like **Express.js** (Node.js), **Django** (Python), or **Spring Boot** (Java), the `controllers` folder is a common project structure convention.

## What is the Controllers Folder?

**Purpose:**  
The `controllers` folder contains files (called controllers) that define the logic for handling incoming HTTP requests and sending responses.

**Role:**  
Controllers act as the "traffic managers" between the client (frontend or API consumer) and the backend services (like databases or business logic).

## How Does It Work?

- When a request hits an endpoint (e.g., `/users`), the router directs it to the appropriate controller function.
- The controller processes the request, interacts with models/services if needed, and returns a response.

## Example (Node.js/Express)

Suppose you have a controller file: `controllers/userController.js`

```js
// controllers/userController.js
exports.getUsers = (req, res) => {
    // Logic to fetch users
    res.json({ users: [] });
};
```

And in your router:

```js
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
```

## Why Use Controllers?

- **Separation of concerns:** Keeps routing, business logic, and data access separate.
- **Maintainability:** Easier to manage and scale as your app grows.
- **Testability:** Logic is isolated, making unit testing simpler.

## Gotchas

- Avoid putting database logic directly in controllers; use services or models for that.
- Keep controllers focused on request/response handling.