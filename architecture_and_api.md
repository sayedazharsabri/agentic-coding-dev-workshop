# Architecture & APIs Decisions

## Architecture Overview

This Full Stack application adheres strictly to the **Clean Architecture** and **Modular** structural patterns. The separation of concerns guarantees easier testing, scaling, and maintenance.

### Backend Architecture layers
1. **Routing Layer (`src/routes/`):** 
   - Maps HTTP definitions, paths, and methods to specific controllers.
   - Attaches middlewares like request validation and authentication.
2. **Controller Layer (`src/controllers/`):** 
   - Acts as the orchestrator.
   - Responsible for extracting HTTP data (req.body, req.params) and delegating them to the `Service Layer`.
   - Sends the HTTP response (`res.status(...).json(...)`).
3. **Service Layer (`src/services/`):** 
   - Contains raw business logic. 
   - Operates entirely unaware of the HTTP layer (res, req), meaning this logic can be re-used elsewhere (like CLI tools or websockets).
4. **Data Access/Model Layer (`src/models/`):** 
   - Defines Mongoose Schemas.
   - Handles relationships and database indexing.

### Frontend Architecture
- **Services Pattern:** Separates standard data fetching logic (`src/services/todo.service.ts`) from React Views.
- **Custom Hooks:** Custom hooks (`src/hooks/useTodos.ts`) are used to integrate Service functions into React State.
- **Component Modularity:** Layouts map exactly against logical UX concerns (e.g. `TodoForm`, `TodoList`, `TodoItem`).

### Custom Utilities Implemented
- **Validation Pipeline:** Uses `Zod` over `Joi` or manual validation, achieving end-to-end type safety directly attached to Express Request streams via a custom middleware wrapper.
- **Logger:** A custom wrapper mapping levels (Error, Warn, Info, Debug). Ensures that Debug logs only trigger on `NODE_ENV=development`.

---

## REST API Endpoints Reference

Base URL (Development): `http://localhost:5000/api/v1`

### 1. **Get All Todos**
- **Endpoint:** `GET /todos`
- **Description:** Returns a list of all Todo items, sorted by newest first.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64abcdef1234567890",
      "title": "Buy Groceries",
      "isCompleted": false,
      "createdAt": "2023-11-20T10:00:00.000Z",
      "updatedAt": "2023-11-20T10:00:00.000Z"
    }
  ]
}
```

### 2. **Create Todo**
- **Endpoint:** `POST /todos`
- **Description:** Creates a new task.
- **Payload:**
```json
{
  "title": "Learn TypeScript",
  "description": "Understand Generics"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "64abcdf01234567891",
    "title": "Learn TypeScript",
    "description": "Understand Generics",
    "isCompleted": false,
    "createdAt": "2023-11-20T10:05:00.000Z",
    "updatedAt": "2023-11-20T10:05:00.000Z"
  }
}
```

### 3. **Get Todo by ID**
- **Endpoint:** `GET /todos/:id`
- **Description:** Fetches details of a specific Todo.

### 4. **Update Todo**
- **Endpoint:** `PUT /todos/:id`
- **Description:** Updates any field(s) of an existing Todo (e.g., toggling `isCompleted`).
- **Payload Example:**
```json
{
  "isCompleted": true
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": { ...updatedTodoObject }
}
```

### 5. **Delete Todo**
- **Endpoint:** `DELETE /todos/:id`
- **Description:** Deletes a specific Todo.
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

### Error Handling Standard Response
All validation or route errors conform to this standard response form:
```json
{
  "success": false,
  "message": "Validation Error: Title is required",
  "stack": "...(stack trace only in development)"
}
```
