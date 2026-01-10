# AssetManager

A full-stack asset management system with role-based access control, built with React and Node.js.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Scalability Considerations](#scalability-considerations)
- [Contributing](#contributing)

## Overview

AssetManager is a modern web application designed to manage organizational assets (Hardware, Software, Documentation) with role-based access control. It provides a clean, minimalist interface with full CRUD operations and authentication features.

## Features

### Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Role-based access control** (Admin & User roles)
- Secure password hashing using bcrypt
- Protected routes on both frontend and backend
- Cookie-based session management

### Asset Management
- **Create, Read, Update, Delete** operations for assets
- Asset categorization (Hardware, Software, Documentation)
- Status tracking (Available, In Use, Maintenance)
- Asset assignment to users
- Role-specific permissions:
  - **Admin**: Full CRUD access to all assets
  - **User**: Read access to assigned assets, update own assets

### User Interface
- Clean, monospace design with dark mode support
- Responsive layout built with Tailwind CSS
- Protected routes with automatic redirection
- Real-time form validation
- Loading states and error handling

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt for password hashing
- **CORS**: Configured for cross-origin requests

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 with custom configuration
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Font**: JetBrains Mono

## Project Structure

```
zz/
├── backend/
│   ├── controllers/
│   │   ├── asset.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── index.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/
│   │   ├── asset.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── asset.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   ├── app.js
│   ├── index.js
│   ├── constants.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── CreateAsset.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/assetmanager
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=7d
```

4. Start the MongoDB server (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
node index.js
```

The backend server will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/assetmanager` |
| `CORS_ORIGIN` | Allowed origins for CORS | `*` or `http://localhost:5173` |
| `ACCESS_TOKEN_SECRET` | Secret key for access tokens | `your_secret_key` |
| `ACCESS_TOKEN_EXPIRY` | Access token expiration time | `1d` |
| `REFRESH_TOKEN_SECRET` | Secret key for refresh tokens | `your_refresh_secret` |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiration time | `7d` |

## API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "fullname": "John Doe",
  "role": "user"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "fullname": "John Doe",
    "role": "user"
  },
  "message": "User registered successfully",
  "success": true
}
```

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "...",
      "username": "johndoe",
      "email": "john@example.com",
      "fullname": "John Doe",
      "role": "user"
    },
    "accessToken": "...",
    "refreshToken": "..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

#### Logout User
```http
POST /users/logout
Authorization: Bearer <access_token>
```

#### Get Current User
```http
GET /users/me
Authorization: Bearer <access_token>
```

#### Refresh Access Token
```http
POST /users/refresh-token
Content-Type: application/json

{
  "refreshToken": "..."
}
```

### Asset Endpoints

All asset endpoints require authentication (Bearer token or cookie).

#### Get All Assets
```http
GET /assets
Authorization: Bearer <access_token>
```

**Response:**
- **Admin**: Returns all assets
- **User**: Returns only assigned assets

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "...",
      "name": "Dell Laptop",
      "category": "Hardware",
      "content": "Dell Inspiron 15, 16GB RAM",
      "status": "In Use",
      "assignedTo": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "message": "Assets fetched successfully",
  "success": true
}
```

#### Get Asset by ID
```http
GET /assets/:id
Authorization: Bearer <access_token>
```

#### Create Asset (Admin Only)
```http
POST /assets
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "MacBook Pro",
  "category": "Hardware",
  "content": "MacBook Pro 16-inch, M3 Max"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "name": "MacBook Pro",
    "category": "Hardware",
    "content": "MacBook Pro 16-inch, M3 Max",
    "status": "Available",
    "assignedTo": "..."
  },
  "message": "Asset created successfully by Admin",
  "success": true
}
```

#### Update Asset
```http
PATCH /assets/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "content": "Updated content",
  "status": "Maintenance"
}
```

**Permissions:**
- **Admin**: Can update any asset
- **User**: Can only update assets assigned to them

#### Delete Asset (Admin Only)
```http
DELETE /assets/:id
Authorization: Bearer <access_token>
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "statusCode": 400,
  "message": "Error message here",
  "success": false,
  "errors": []
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

### Postman Collection

You can import the following Postman collection to test all endpoints:

**Collection JSON:**
```json
{
  "info": {
    "name": "AssetManager API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"johndoe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\",\n  \"fullname\": \"John Doe\",\n  \"role\": \"user\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:8000/api/v1/users/register",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8000",
              "path": ["api", "v1", "users", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"johndoe\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:8000/api/v1/users/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8000",
              "path": ["api", "v1", "users", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Assets",
      "item": [
        {
          "name": "Get All Assets",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}",
                "type": "text"
              }
            ],
            "url": {
              "raw": "http://localhost:8000/api/v1/assets",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8000",
              "path": ["api", "v1", "assets"]
            }
          }
        },
        {
          "name": "Create Asset",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{accessToken}}",
                "type": "text"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Dell Laptop\",\n  \"category\": \"Hardware\",\n  \"content\": \"Dell Inspiron 15\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:8000/api/v1/assets",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8000",
              "path": ["api", "v1", "assets"]
            }
          }
        }
      ]
    }
  ]
}
```

## 💻 Usage

### Creating an Admin User

1. Register a new user through the `/register` endpoint or UI
2. Manually update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Frontend Routes

- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Main dashboard (protected, all roles)
- `/create` - Create new asset (protected, admin only)

### User Workflows

**Admin Workflow:**
1. Login with admin credentials
2. View all assets on dashboard
3. Create new assets via "Add Asset" button
4. Update any asset's status or details
5. Delete assets

**Regular User Workflow:**
1. Login with user credentials
2. View assigned assets on dashboard
3. Update status of assigned assets
4. Cannot create or delete assets

## Scalability Considerations

### Current Architecture
The application follows a monolithic architecture with separate frontend and backend services.

### Scalability Strategies

#### 1. **Horizontal Scaling**
- Deploy multiple instances of the backend behind a load balancer (NGINX, AWS ALB)
- Use sticky sessions for JWT cookie-based auth or switch to stateless tokens
- Containerize with Docker for easy deployment and scaling

#### 2. **Database Optimization**
- **Indexing**: Add indexes on frequently queried fields
  ```javascript
  // Already implemented
  username: { index: true }
  
  // Recommended additions
  assetSchema.index({ assignedTo: 1, status: 1 });
  assetSchema.index({ category: 1, createdAt: -1 });
  ```
- **Database Sharding**: Shard MongoDB by user region or asset category
- **Read Replicas**: Implement read replicas for query-heavy operations
- **Connection Pooling**: Configure MongoDB connection pooling (already handled by Mongoose)

#### 3. **Caching Strategy**
- **Redis Implementation**:
  ```javascript
  // Cache frequently accessed assets
  - Asset lists by category (TTL: 5 minutes)
  - User sessions and permissions (TTL: 1 hour)
  - Dashboard aggregations (TTL: 10 minutes)
  ```
- **CDN**: Serve static frontend assets via CloudFront or Cloudflare
- **API Response Caching**: Implement ETag headers for unchanged resources

#### 4. **Microservices Architecture**
Break down into independent services:
```
├── auth-service (User authentication & authorization)
├── asset-service (Asset CRUD operations)
├── notification-service (Email/SMS notifications)
├── analytics-service (Usage analytics and reporting)
└── api-gateway (Kong, NGINX, or AWS API Gateway)
```

Benefits:
- Independent scaling of services
- Technology diversity (different services can use different tech)
- Fault isolation
- Easier deployment and testing

#### 5. **Message Queue Integration**
- **RabbitMQ/Kafka** for async operations:
  - Asset assignment notifications
  - Audit log processing
  - Report generation
  - Email notifications

#### 6. **Performance Optimization**
- Implement pagination for asset lists
- Use GraphQL for flexible data fetching
- Enable gzip compression
- Implement rate limiting (express-rate-limit)
- Add request/response compression

#### 7. **Monitoring & Observability**
- **Application Performance Monitoring**: New Relic, DataDog
- **Error Tracking**: Sentry
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) or Winston
- **Metrics**: Prometheus + Grafana

#### 8. **Security Enhancements**
- Implement API rate limiting
- Add request validation with Joi or Zod
- Enable HTTPS with SSL certificates
- Implement CSRF protection
- Add security headers (Helmet.js)
- Regular security audits

#### 9. **CI/CD Pipeline**
```yaml
# Example GitHub Actions workflow
- Code push → Run tests
- Tests pass → Build Docker image
- Push to registry → Deploy to staging
- Manual approval → Deploy to production
- Auto-rollback on failure
```

#### 10. **Infrastructure as Code**
- Use Terraform or CloudFormation for infrastructure
- Kubernetes for container orchestration
- Auto-scaling groups based on CPU/memory metrics

### Estimated Load Capacity

**Current Setup (Single Instance):**
- ~100 concurrent users
- ~1000 requests/minute
- Database: ~50GB data

**With Optimizations:**
- Horizontal scaling: 1000+ concurrent users per instance
- Caching: 5-10x performance improvement
- Microservices: Unlimited scaling potential per service
