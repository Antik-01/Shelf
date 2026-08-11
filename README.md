# Shelf – Storage Management System

A full-stack web application that helps users organize physical items stored in different locations. Built with **Java Spring Boot** and **React**.

## Storage Hierarchy

```
Room → Shelf → Box → Item
```

**Example:**  
Searching for "Passport" displays: `Bedroom → Top Shelf → Blue Box`

---

## Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Backend  | Java 21, Spring Boot 3.2, Spring Data JPA     |
| Frontend | React 18, Vite 5, Tailwind CSS 3, Axios       |
| Database | MySQL 8                                        |
| Build    | Maven (backend), npm (frontend)                |

---

## Prerequisites

- **Java 21** (JDK)
- **Maven 3.8+**
- **Node.js 18+** and **npm**
- **MySQL 8** (running on `localhost:3306`)

---

## Features

| Feature           | Description                                      |
| ----------------- | ------------------------------------------------ |
| Dashboard         | Overview with total Rooms, Shelves, Boxes, Items  |
| Room Management   | CRUD operations for rooms                         |
| Shelf Management  | CRUD with room assignment                         |
| Box Management    | CRUD with cascading room → shelf selectors        |
| Item Management   | CRUD with full location selectors                 |
| Search            | Search by name or category, shows full path       |

---

## Database Schema

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  rooms   │ 1:N │ shelves  │ 1:N │  boxes   │ 1:N │  items   │
├──────────┤────▸├──────────┤────▸├──────────┤────▸├──────────┤
│ id       │     │ id       │     │ id       │     │ id       │
│ name     │     │ name     │     │ name     │     │ name     │
│ desc     │     │ desc     │     │ desc     │     │ desc     │
│ created  │     │ room_id  │     │ shelf_id │     │ category │
└──────────┘     │ created  │     │ created  │     │ quantity │
                 └──────────┘     └──────────┘     │ box_id   │
                                                   │ created  │
                                                   └──────────┘
```

All foreign keys use `ON DELETE CASCADE`.

---

## REST API Documentation

### Dashboard

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/api/dashboard/stats` | Get aggregate counts  |

### Rooms

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/rooms`      | List all rooms     |
| GET    | `/api/rooms/:id`  | Get room by ID     |
| POST   | `/api/rooms`      | Create a room      |
| PUT    | `/api/rooms/:id`  | Update a room      |
| DELETE | `/api/rooms/:id`  | Delete a room      |

### Shelves

| Method | Endpoint                      | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| GET    | `/api/shelves`                | List all shelves             |
| GET    | `/api/shelves?roomId=1`       | Filter shelves by room       |
| GET    | `/api/shelves/:id`            | Get shelf by ID              |
| POST   | `/api/shelves`                | Create a shelf               |
| PUT    | `/api/shelves/:id`            | Update a shelf               |
| DELETE | `/api/shelves/:id`            | Delete a shelf               |

### Boxes

| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/api/boxes`                   | List all boxes               |
| GET    | `/api/boxes?shelfId=1`         | Filter boxes by shelf        |
| GET    | `/api/boxes/:id`               | Get box by ID                |
| POST   | `/api/boxes`                   | Create a box                 |
| PUT    | `/api/boxes/:id`               | Update a box                 |
| DELETE | `/api/boxes/:id`               | Delete a box                 |

### Items

| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/api/items`                   | List all items               |
| GET    | `/api/items/:id`               | Get item by ID               |
| GET    | `/api/items/search?q=passport` | Search by name or category   |
| POST   | `/api/items`                   | Create an item               |
| PUT    | `/api/items/:id`               | Update an item               |
| DELETE | `/api/items/:id`               | Delete an item               |

### Sample Request / Response

**POST** `/api/items`

```json
{
  "name": "Passport",
  "description": "Indian passport",
  "category": "Documents",
  "quantity": 1,
  "boxId": 1
}
```

**Response** `201 Created`

```json
{
  "id": 1,
  "name": "Passport",
  "description": "Indian passport",
  "category": "Documents",
  "quantity": 1,
  "boxId": 1,
  "boxName": "Blue Box",
  "shelfId": 1,
  "shelfName": "Top Shelf",
  "roomId": 1,
  "roomName": "Bedroom",
  "locationPath": "Bedroom → Top Shelf → Blue Box",
  "createdAt": "2026-08-12T02:00:00"
}
```

---

## Project Structure

```
shelf/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/shelfapp/
│       ├── ShelfApplication.java
│       ├── config/
│       │   └── CorsConfig.java
│       ├── controller/
│       │   ├── DashboardController.java
│       │   ├── RoomController.java
│       │   ├── ShelfController.java
│       │   ├── BoxController.java
│       │   └── ItemController.java
│       ├── dto/
│       │   ├── DashboardDTO.java
│       │   ├── RoomDTO.java
│       │   ├── ShelfDTO.java
│       │   ├── BoxDTO.java
│       │   └── ItemDTO.java
│       ├── entity/
│       │   ├── Room.java
│       │   ├── Shelf.java
│       │   ├── Box.java
│       │   └── Item.java
│       ├── exception/
│       │   ├── GlobalExceptionHandler.java
│       │   └── ResourceNotFoundException.java
│       ├── repository/
│       │   ├── RoomRepository.java
│       │   ├── ShelfRepository.java
│       │   ├── BoxRepository.java
│       │   └── ItemRepository.java
│       └── service/
│           ├── DashboardService.java
│           ├── RoomService.java
│           ├── ShelfService.java
│           ├── BoxService.java
│           └── ItemService.java
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── api/
│       │   ├── axios.js
│       │   ├── dashboardService.js
│       │   ├── roomService.js
│       │   ├── shelfService.js
│       │   ├── boxService.js
│       │   └── itemService.js
│       ├── components/
│       │   ├── Layout.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Modal.jsx
│       │   └── Toast.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Rooms.jsx
│       │   ├── Shelves.jsx
│       │   ├── Boxes.jsx
│       │   ├── Items.jsx
│       │   └── Search.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── schema.sql
├── .gitignore
└── README.md
```

---

## License

This project is open source and available for educational purposes.
