# Shelf – Storage Management System

A full-stack web application built using **Spring Boot**, **React**, and **MySQL** to help users organize and locate physical items stored across different rooms, shelves, and boxes.

Instead of searching through multiple storage locations manually, users can quickly find an item's exact location using the built-in search feature.

Example:

```
Passport
📍 Bedroom → Top Shelf → Blue Box
```

---

## Features

- Dashboard showing total Rooms, Shelves, Boxes, and Items
- Complete CRUD operations for
  - Rooms
  - Shelves
  - Boxes
  - Items
- Cascading dropdowns
  - Room → Shelf → Box
- Search items by
  - Name
  - Category
- Displays complete storage path
- Responsive UI
- RESTful API architecture
- Global exception handling
- Input validation

---

# Storage Hierarchy

```
Room
   │
   ▼
Shelf
   │
   ▼
Box
   │
   ▼
Item
```

Example

```
Bedroom
   └── Top Shelf
          └── Blue Box
                  └── Passport
```

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Backend | Java 21, Spring Boot 3.2 |
| ORM | Spring Data JPA (Hibernate) |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Database | MySQL 8 |
| Build Tool | Maven, npm |

---

# Project Architecture

```
React Frontend
       │
       │ HTTP (Axios)
       ▼
Spring Boot REST API
       │
Business Service Layer
       │
Spring Data JPA
       │
MySQL Database
```

The project follows a **three-tier architecture** consisting of:

- Presentation Layer (React)
- Business Logic Layer (Spring Boot Services)
- Data Layer (MySQL + JPA)

---

# Database Design

```
Room (1)
   │
   ▼
Shelf (Many)
   │
   ▼
Box (Many)
   │
   ▼
Item (Many)
```

Each level has a one-to-many relationship.

Deleting a Room automatically deletes its associated Shelves, Boxes, and Items using **ON DELETE CASCADE**.

---

# Database Schema

```
rooms
-------
id
name
description
created_at

shelves
---------
id
name
description
room_id
created_at

boxes
-------
id
name
description
shelf_id
created_at

items
-------
id
name
description
category
quantity
box_id
created_at
```

---

# REST APIs

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard/stats |

---

## Rooms

GET /api/rooms

GET /api/rooms/{id}

POST /api/rooms

PUT /api/rooms/{id}

DELETE /api/rooms/{id}

---

## Shelves

GET /api/shelves

GET /api/shelves?roomId=1

POST /api/shelves

PUT /api/shelves/{id}

DELETE /api/shelves/{id}

---

## Boxes

GET /api/boxes

GET /api/boxes?shelfId=1

POST /api/boxes

PUT /api/boxes/{id}

DELETE /api/boxes/{id}

---

## Items

GET /api/items

GET /api/items/{id}

GET /api/items/search?q=passport

POST /api/items

PUT /api/items/{id}

DELETE /api/items/{id}

---

# Sample Response

```json
{
  "id": 1,
  "name": "Passport",
  "category": "Documents",
  "quantity": 1,
  "locationPath": "Bedroom → Top Shelf → Blue Box"
}
```

---

# Project Structure

```
backend/
│
├── controller
├── service
├── repository
├── entity
├── dto
├── exception
└── config

frontend/
│
├── api
├── components
├── pages
└── assets
```

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/yourusername/shelf.git
```

---

## Backend

```bash
cd backend

mvn spring-boot:run
```

Runs on

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Configure MySQL

Create a database named

```
shelf_db
```

Import

```
schema.sql
```

Update the following values in

```
application.properties
```

```
spring.datasource.url
spring.datasource.username
spring.datasource.password
```

---

# Screenshots

> Screenshots will be added soon.

- Dashboard
- Rooms
- Shelves
- Boxes
- Items
- Search Page

---

# Future Improvements

- User Authentication
- Barcode / QR Code support
- Image upload for stored items
- Export inventory as PDF or Excel
- Pagination and sorting
- Dark mode

---

# What I Learned

Building this project helped me understand:

- Spring Boot REST APIs
- Layered Architecture
- Spring Data JPA
- Entity Relationships
- React State Management
- Axios API Integration
- CRUD Operations
- MySQL Database Design
- Exception Handling
- Full Stack Development

---

## Author

**Antik Dutta**

Built as a learning project to strengthen my understanding of full-stack development using Java Spring Boot and React.
