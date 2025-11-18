# 🚀 PORTFOLIO BACKEND - QUICK START GUIDE

## ✅ Status: COMPLETE & RUNNING

Backend API server is **successfully running** on `http://localhost:5000`
MongoDB is **successfully connected** to your cloud database

---

## 📋 Project Structure

```
Porto/
├── backend/                 ← Node.js/Express Server
│   ├── config/
│   │   └── db.js           (MongoDB connection config)
│   ├── models/
│   │   ├── Achievement.js  (Achievement schema)
│   │   └── Activity.js     (Activity schema)
│   ├── routes/
│   │   ├── achievements.js (Achievement CRUD API)
│   │   └── activities.js   (Activity CRUD API)
│   ├── server.js           (Express server entry point)
│   ├── .env                (Environment variables)
│   └── package.json        (Dependencies)
│
└── public/                 ← Frontend
    ├── index.html          (Updated with API integration)
    ├── Logo.png
    └── Profil.jpg
```

---

## 🎯 What Was Created

### Backend Files (7 files):
1. **server.js** - Express server running on port 5000
2. **config/db.js** - MongoDB connection handler
3. **models/Achievement.js** - Achievement MongoDB schema
4. **models/Activity.js** - Activity MongoDB schema
5. **routes/achievements.js** - Achievement CRUD endpoints (GET, POST, PUT, DELETE)
6. **routes/activities.js** - Activity CRUD endpoints (GET, POST, PUT, DELETE)
7. **.env** - MongoDB credentials & configuration

### Frontend Update:
- **public/index.html** - Updated to fetch data from API instead of localStorage

---

## 🔧 How to Run

### Terminal 1: Start Backend Server
```bash
cd "d:\Kuliah\Project vs code\Porto\backend"
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   🚀 Server berjalan di port 5000      ║
║   📱 API: http://localhost:5000        ║
║   🔌 Mencoba koneksi MongoDB...        ║
╚════════════════════════════════════════╝

🔌 Mencoba menghubung ke MongoDB...
✅ MongoDB terhubung berhasil!
```

### Terminal 2: Open Frontend
```bash
# Option 1: Use VS Code Live Server
# Right-click public/index.html → Open with Live Server

# Option 2: Use Python http.server
cd "d:\Kuliah\Project vs code\Porto\public"
python -m http.server 8000

# Then open browser: http://localhost:8000/index.html
```

---

## 🧪 Testing API Endpoints

### Health Check
```bash
curl http://localhost:5000/
```
Response:
```json
{
  "message": "✅ API Portfolio Backend berjalan",
  "timestamp": "2025-11-15T...",
  "endpoints": {
    "achievements": "/api/achievements",
    "activities": "/api/activities"
  }
}
```

### Get All Achievements
```bash
curl http://localhost:5000/api/achievements
```

### Create New Achievement
```bash
curl -X POST http://localhost:5000/api/achievements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Juara Kompetisi",
    "date": "2025-11-15",
    "uploadImage": "data:image/jpeg;base64,...",
    "description": "Menang kompetisi programming nasional"
  }'
```

### Update Achievement
```bash
curl -X PUT http://localhost:5000/api/achievements/[MONGODB_ID] \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "description": "..."}'
```

### Delete Achievement
```bash
curl -X DELETE http://localhost:5000/api/achievements/[MONGODB_ID]
```

### Same endpoints for Activities
```bash
GET    /api/activities           - Get all
POST   /api/activities           - Create
PUT    /api/activities/:id       - Update
DELETE /api/activities/:id       - Delete
```

---

## 📊 API Response Format

### Success (200/201)
```json
{
  "success": true,
  "message": "Achievement berhasil ditambahkan",
  "count": 5,
  "data": {
    "_id": "674f1a2b3c4d5e6f7g8h9i0j",
    "title": "Juara Kompetisi",
    "date": "2025-11-15T00:00:00.000Z",
    "uploadImage": "data:image/jpeg;base64,...",
    "description": "Menang kompetisi programming",
    "createdAt": "2025-11-15T19:05:30.123Z",
    "updatedAt": "2025-11-15T19:05:30.123Z"
  }
}
```

### Error (400/500)
```json
{
  "success": false,
  "message": "Title dan description harus diisi",
  "error": "Error details"
}
```

---

## 🔑 Important Notes

### Frontend Configuration
In `public/index.html` line 1589:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### MongoDB Connection
Your connection string (in `.env`):
```
mongodb+srv://Profildb:Profildb123@profildb.gaawes9.mongodb.net/?appName=Profildb
```

### Image Storage Format
Images are stored as **Base64 strings** in MongoDB:
- Format: `data:image/jpeg;base64,/9j/4AAQSkZJRg...`
- Field name: `uploadImage`
- Max size: 50MB (configured in server.js)

---

## ✨ Features Implemented

✅ **Backend API**
- Express.js server on port 5000
- RESTful CRUD operations for Achievements & Activities
- MongoDB cloud database integration
- CORS enabled for frontend requests
- Error handling & validation

✅ **Frontend Integration**
- Fetch achievements/activities from API on page load
- Create new achievement/activity via API POST
- Edit (UPDATE) achievement/activity via API PUT
- Delete achievement/activity via API DELETE
- Real-time UI updates after API operations
- Base64 image upload & display

✅ **Database**
- MongoDB cloud (Atlas) connected
- Mongoose schemas with validation
- Automatic timestamps (createdAt, updatedAt)

---

## 🔄 Admin Panel Workflow

1. **Login** with credentials (admin/123456)
2. **Click "Add Achievement"** or **"Add Activity"** button
3. **Fill form** with title, date, image (file upload), and description
4. **Click "Save"** button
5. **API** sends data to backend
6. **Backend** saves to MongoDB
7. **Frontend** fetches updated list from API
8. **Display** updates automatically

---

## 📱 Database Collections

### Collections Created Automatically:
- `achievements` - Stores all achievement documents
- `activities` - Stores all activity documents

### Example Document:
```json
{
  "_id": ObjectId("674f1a2b3c4d5e6f7g8h9i0j"),
  "title": "Juara Kompetisi",
  "date": ISODate("2025-11-15T00:00:00.000Z"),
  "uploadImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "description": "Menang kompetisi programming nasional",
  "createdAt": ISODate("2025-11-15T19:05:30.123Z"),
  "updatedAt": ISODate("2025-11-15T19:05:30.123Z"),
  "__v": 0
}
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to port 5000" | Kill process: `taskkill /F /IM node.exe` |
| "MongoDB connection failed" | Check internet, verify credentials in .env |
| "CORS error in browser" | CORS is enabled, check frontend API_URL matches backend |
| "Image not showing" | Ensure image is valid Base64 format |
| "Infinity request pending" | Backend not running, start with `npm start` |

---

## 📚 File Reference

### Core Backend Files
- `d:\Kuliah\Project vs code\Porto\backend\server.js`
- `d:\Kuliah\Project vs code\Porto\backend\config\db.js`
- `d:\Kuliah\Project vs code\Porto\backend\models\Achievement.js`
- `d:\Kuliah\Project vs code\Porto\backend\models\Activity.js`
- `d:\Kuliah\Project vs code\Porto\backend\routes\achievements.js`
- `d:\Kuliah\Project vs code\Porto\backend\routes\activities.js`

### Configuration
- `d:\Kuliah\Project vs code\Porto\backend\.env`
- `d:\Kuliah\Project vs code\Porto\backend\package.json`

### Frontend
- `d:\Kuliah\Project vs code\Porto\public\index.html` (Updated)

---

## 🎓 What You Learned

1. **Backend Development**
   - Created Express.js server from scratch
   - Built RESTful API with CRUD operations
   - Implemented MongoDB integration with Mongoose

2. **Database Design**
   - Designed MongoDB schemas with validation
   - Configured cloud database (MongoDB Atlas)
   - Implemented automatic timestamps

3. **Frontend-Backend Integration**
   - Converted localStorage to API calls
   - Implemented async form submission
   - Real-time data refresh after operations

4. **API Design**
   - Standard REST conventions
   - Proper HTTP methods (GET, POST, PUT, DELETE)
   - Consistent response format
   - Error handling

---

## 🚀 Next Steps (Optional)

1. **Add Authentication** - Protect admin endpoints with token auth
2. **Add Pagination** - Limit results per page
3. **Add Search/Filter** - Find achievements by title or date
4. **Add Sorting** - Sort by date, title, etc.
5. **Deploy** - Push to Heroku, Railway, or Vercel
6. **Add Image Optimization** - Compress images before storing
7. **Add File Upload** - Use Multer for actual file uploads
8. **Add Logging** - Winston or Morgan for request logging

---

**Created:** November 15, 2025
**Status:** ✅ COMPLETE & TESTED
**Backend:** Running on port 5000
**Database:** MongoDB Atlas Connected
