📦 ScootWise Backend API

Smart Electric Scooter Fleet Management System
Built with Node.js, Express, MongoDB, Socket.IO

🚀 Overview

ScootWise Backend is a RESTful API + real-time server that powers a smart scooter fleet management platform.
It handles authentication, scooter management, ride lifecycle, maintenance reporting, and real-time updates using WebSockets.

🧠 Tech Stack

Node.js
Express.js
MongoDB (Mongoose)
Socket.IO (Real-time communication)
JWT Authentication
bcrypt (Password hashing)
dotenv (Environment variables)
cors, helmet, morgan (Security & logging)

⚙️ Features
🔐 Authentication

JWT-based login/register
Role-based access control (Rider / Admin)

🛴 Scooter Management

Create / update / delete scooters
Track scooter status:
AVAILABLE
IN_RIDE
MAINTENANCE
Update scooter location in real-time

🚴 Ride System

Start ride
End ride
Automatic cost calculation based on duration
Ride history tracking

🔧 Maintenance System

Report scooter issues
Admin view of maintenance reports
Resolve maintenance and restore scooter availability

⚡ Real-Time System (Socket.IO)

Live scooter location updates
Ride started / ended events
Scooter status updates
Battery updates (simulation ready)

📁 Project Structure

scootwise-backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── socket.js          # Socket.IO setup
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── scooter.controller.js
│   │   ├── ride.controller.js
│   │   └── maintenance.controller.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Scooter.model.js
│   │   ├── Ride.model.js
│   │   └── Maintenance.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── scooter.routes.js
│   │   ├── ride.routes.js
│   │   └── maintenance.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── socket/
│   │   ├── index.js            # Socket server init
│   │   ├── ride.socket.js      # Ride events
│   │   └── scooter.socket.js   # Scooter events
│   │
│   ├── utils/
│   │   └── pricing.js          # Ride cost calculation
│   │
│   ├── app.js                  # Express app config
│   └── server.js              # Entry point
│
├── .env
├── package.json
└── README.md


🔌 API Endpoints

Auth
POST /api/auth/register
POST /api/auth/login
Scooters
POST   /api/scooters        (Admin only)
GET    /api/scooters        (Authenticated users)
PUT    /api/scooters/:id/location
Rides
POST   /api/rides/start
PUT    /api/rides/end/:id
GET    /api/rides/history
Maintenance
POST   /api/maintenance
GET    /api/maintenance     (Admin only)
PUT    /api/maintenance/resolve/:id

⚡ Socket.IO Events

Client → Server (optional)
test:event
Server → Client
ride:started
ride:ended
scooter:locationUpdated
scooter:statusUpdated
scooter:batteryUpdated

🧪 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/scootwise
JWT_SECRET=your_secret_key

🚀 Installation & Setup

1. Clone repo
git clone https://github.com/your-repo/scootwise-backend.git
2. Install dependencies
npm install
3. Run development server
npm run dev

Server runs on:

http://localhost:5000
🧠 Architecture Summary

ScootWise Backend is designed using a modular architecture:

REST API handles core business logic
Socket.IO handles real-time updates
MongoDB stores persistent data
Middleware ensures authentication & role control

This separation ensures scalability, maintainability, and production readiness.

🔒 Security Features
JWT authentication
Role-based route protection
Password hashing with bcrypt
CORS protection
Helmet security headers
📈 Future Improvements
Redis caching for real-time data
Live GPS simulation engine
Payment integration (Stripe simulation)
Admin analytics dashboard APIs
AI-based predictive maintenance
👨‍💻 Author

Karim Chebbi
Full-Stack Developer & Instructor (GoMyCode)

🏁 Conclusion

This backend is a production-ready foundation for a smart mobility SaaS platform, combining REST APIs and real-time communication for scalable scooter fleet management.