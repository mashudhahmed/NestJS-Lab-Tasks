# NestJS Lab Tasks

This repository contains **three independent NestJS projects** developed as part of a university lab assignment. Each project demonstrates different NestJS concepts, from basic CRUD operations to advanced dependency injection and database integration with TypeORM.

## 📁 Projects Overview

| Project Folder | Tasks Covered | Key Concepts |
|----------------|---------------|---------------|
| `CourseManagementAPI` | Lab Tasks 01 & 02 | Basic CRUD, DTO validation, File upload (multer) |
| `UniversitySystemAPI` | Lab Task 03 | Dependency Injection (Intra-module, Inter-module, Circular) |
| `ProductInventoryAPI` | Lab Task 04 | TypeORM with PostgreSQL, Full CRUD, Search, Filtering |

---

## 🚀 How to Run Each Project

Each project is self-contained. Follow these steps inside any project folder.

### 1. Navigate to the project folder
```bash
cd CourseManagementAPI   # or UniversitySystemAPI / ProductInventoryAPI
```
### 2. Install dependencies
```bash
npm install
```
### 3. Set up environment variables (only for `ProductInventoryAPI`)
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_DATABASE=product_inventory_db
```

### 4. Start the development server
```bash
npm run start:dev
```
The API will be available at `http://localhost:3000`

### 📌 Project Details
### 1. CourseManagementAPI (Tasks 01 & 02)
#### Features:


- CRUD operations for courses (GET, POST, PUT, PATCH, DELETE)

- Input validation using class-validator DTOs

- File upload for course materials (images, PDFs) – max 2MB

- Global validation pipe with whitelist & forbidNonWhitelisted

### Endpoints:

```bash
text
GET    /course
GET    /course/:id
POST   /course
PUT    /course/:id
PATCH  /course/:id
DELETE /course/:id
POST   /course/:id/upload
```

### Example Request:

```bash
json
POST /course
{
  "name": "NestJS Fundamentals",
  "code": "CS101",
  "instructor": "John Doe",
  "credits": 3,
  "description": "Learn NestJS basics"
}
```
### 2. UniversitySystemAPI (Task 03)
#### Features:

- Demonstrates three types of Dependency Injection

- Intra-module: CourseController uses CourseService

- Inter-module: EnrollmentService uses CourseService (exported)

- Circular: EnrollmentService ↔ NotificationService (solved with forwardRef())

### Endpoints:

```bash
# Course Module
GET    /course
GET    /course/:id
POST   /course          (Body: { "name": "...", "code": "..." })

# Enrollment Module
GET    /enrollment
POST   /enrollment      (Body: { "studentName": "...", "courseId": "..." })

# Notification Module
POST   /notification/send    (Body: { "studentName": "...", "message": "..." })
POST   /notification/check   (Body: { "studentName": "...", "courseId": "..." })
```
### Expected Response Example (Inter-module):

```bash
json
{
  "message": "Student enrolled successfully",
  "student": "John Doe",
  "course": { "message": "Course fetched", "id": "101" },
  "notification": { "message": "Notification sent to John Doe: Enrolled in course 101" }
}
```

### 3. ProductInventoryAPI (Task 04)
#### Features:

- Full CRUD with TypeORM and PostgreSQL

- DTO validation for create, update (full), and partial update

- Search by product name (case‑insensitive, ILike)

- Filter by category

- Toggle product active status

- Automatic timestamps (@CreateDateColumn, @UpdateDateColumn)

### Endpoints:
```bash
text
POST   /products                     Create product
GET    /products                     Get all (newest first)
GET    /products/search?keyword=...  Search by name
GET    /products/category/:cat       Filter by category
GET    /products/:id                 Get single product
PATCH  /products/:id                 Partial update
PUT    /products/:id                 Full replacement
DELETE /products/:id                 Delete product
PATCH  /products/:id/toggle          Toggle isActive
```

### Example Request (Create):
```bash
json
POST /products
{
  "name": "iPhone 15",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics"
}
Example Response:

json
{
  "message": "Product created successfully",
  "data": { "id": 1, "name": "iPhone 15", ... }
}
```

### 🛠️ Technologies Used
- NestJS – Framework

- TypeScript – Language

- TypeORM – ORM (Task 04)

- PostgreSQL – Database (Task 04)

- class-validator / class-transformer – Validation

- Multer – File upload (Task 02)

### @nestjs/config – Environment variables (Task 04)

### 📂 Folder Structure (Root)
```bash
NestJS-Lab-Tasks/
├── CourseManagementAPI/
│   ├── src/
│   │   ├── course/
│   │   │   ├── dto/
│   │   │   ├── course.controller.ts
│   │   │   ├── course.service.ts
│   │   │   └── course.module.ts
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── uploads/                (created automatically for file uploads)
│   ├── package.json
│   └── .env (optional, not used)
│
├── UniversitySystemAPI/
│   ├── src/
│   │   ├── course/
│   │   ├── enrollment/
│   │   ├── notification/
│   │   ├── main.ts
│   │   └── app.module.ts
│   └── package.json
│
├── ProductInventoryAPI/
│   ├── src/
│   │   ├── products/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.module.ts
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── .env                    (create this file)
│   └── package.json
│
└── README.md                   (this file)
```
### ✅ Testing with Postman
Import the provided endpoints (listed above) into Postman.
For Task 04, make sure PostgreSQL is running and the database product_inventory_db exists.

### Example Validation Errors (expected 400):
- Missing required fields

- Price negative or zero

- Credits > 6 (Task 02)

- Uploading .exe or .txt file (Task 02)

- Extra unknown fields (when forbidNonWhitelisted is true)

### 📝 Notes
- No database is used for Tasks 01–03 – all responses are mocked in the service layer.

- For Task 04, set synchronize: true only for development – never in production.

- File uploads are saved to ./uploads inside each project folder (created automatically).

## Each project runs independently on port 3000 – you cannot run two at the same time unless you change the port.

📧 Contact
For any questions, please reach out to the course instructor or the repository owner.
