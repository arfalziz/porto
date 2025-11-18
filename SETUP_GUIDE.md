## 🚀 SETUP GUIDE - Portfolio API Backend

### Keseluruhan Struktur Project

```
d:\Kuliah\Project vs code\Porto\
├── public/
│   ├── index.html (frontend - sudah terupdate)
│   ├── Logo.png
│   └── Profil.jpg
├── backend/
│   ├── models/
│   │   ├── Achievement.js (MongoDB schema)
│   │   └── Activity.js (MongoDB schema)
│   ├── routes/
│   │   ├── achievements.js (REST API routes)
│   │   └── activities.js (REST API routes)
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   ├── server.js (Entry point)
│   ├── .env (Environment variables)
│   ├── package.json (Dependencies)
│   └── node_modules/ (installed packages)
```

---

## 🔧 Sesi-sesi yang Sudah Diselesaikan

### ✅ Sesi 1: Setup Backend Project & Dependencies
- ✓ Created `backend` folder
- ✓ Initialized Node.js project (`npm init -y`)
- ✓ Installed dependencies: express, mongoose, dotenv, cors
- ✓ Created folder structure: models/, routes/, config/
- ✓ Updated package.json scripts

**Command yang dijalankan:**
```bash
cd d:\Kuliah\Project vs code\Porto
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors
mkdir models routes config
```

---

### ✅ Sesi 2: Setup MongoDB Connection & Environment
- ✓ Created `.env` file dengan MongoDB connection string
- ✓ Created `config/db.js` untuk koneksi MongoDB

**File `.env` berisi:**
```
MONGODB_URI=mongodb+srv://Profildb:Profildb123@profildb.gaawes9.mongodb.net/?appName=Profildb
PORT=5000
NODE_ENV=development
```

---

### ✅ Sesi 3: Create MongoDB Schemas
- ✓ Created `models/Achievement.js` dengan fields:
  - `title` (String, required)
  - `date` (Date, default: now)
  - `uploadImage` (String/Base64, optional)
  - `description` (String, required)
  - `timestamps` (createdAt, updatedAt otomatis)

- ✓ Created `models/Activity.js` dengan schema yang sama

**Opsi Base64 yang Digunakan: DIRECT BASE64**
- Image disimpan langsung di MongoDB sebagai string
- Format: `data:image/jpeg;base64,/9j/...` atau hanya base64
- ✅ Cocok untuk project kecil-menengah
- ✅ Semua data terpusat (no external storage)

---

### ✅ Sesi 4: Create Achievement API Routes
Dibuat file `routes/achievements.js` dengan 5 endpoint:

1. **GET /api/achievements** - Ambil semua achievements
   - Response: `{ success: true, count: N, data: [...]}`

2. **GET /api/achievements/:id** - Ambil achievement by ID
   - Response: `{ success: true, data: {...}}`

3. **POST /api/achievements** - Buat achievement baru
   - Body: `{ title, date, uploadImage, description }`
   - Response: `{ success: true, message: "...", data: {...}}`

4. **PUT /api/achievements/:id** - Update achievement
   - Body: sama seperti POST
   - Response: `{ success: true, message: "...", data: {...}}`

5. **DELETE /api/achievements/:id** - Hapus achievement
   - Response: `{ success: true, message: "...", data: {...}}`

---

### ✅ Sesi 5: Create Activity API Routes
Dibuat file `routes/activities.js` dengan struktur yang sama seperti achievements (5 endpoint CRUD)

---

### ✅ Sesi 6: Create Server Entry Point
- ✓ Created `server.js` sebagai entry point aplikasi
- ✓ Setup Express app dengan middleware:
  - CORS enabled (allow all origins)
  - JSON parser dengan limit 50MB (untuk base64 images)
- ✓ Register routes pada `/api/achievements` dan `/api/activities`
- ✓ Health check endpoint di `/`
- ✓ Error handling dan database connection retry

---

### ✅ Sesi 7: Update Frontend to Use Backend API
- ✓ Updated `public/index.html` untuk fetch dari backend API
- ✓ Changed dari localStorage ke API calls
- ✓ Updated field names: `image` → `uploadImage`, `id` → `_id`
- ✓ Integrated async form submission dengan fetch
- ✓ Updated delete handlers untuk call DELETE API
- ✓ Updated renderAchievements() & renderActivities() untuk gunakan API data

**Frontend API Configuration:**
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## 🚀 Cara Menjalankan Backend

### 1. **Terminal 1 - Jalankan Backend Server**
```bash
cd "d:\Kuliah\Project vs code\Porto\backend"
npm start
```

**Output yang diharapkan:**
```
🔌 Mencoba menghubung ke MongoDB...
✅ MongoDB terhubung berhasil!

╔════════════════════════════════════════╗
║   🚀 Server berjalan di port 5000      ║
║   📱 API: http://localhost:5000        ║
║   🗄️  Database: MongoDB Connected       ║
╚════════════════════════════════════════╝
```

### 2. **Terminal 2 - Jalankan Frontend**
```bash
# Buka file public/index.html di browser
# atau gunakan Live Server extension di VS Code
```

---

## 🧪 Testing API Endpoints

### Menggunakan cURL atau Postman:

**1. Test Health Check**
```bash
curl http://localhost:5000/
```

**2. GET All Achievements**
```bash
curl http://localhost:5000/api/achievements
```

**3. POST New Achievement**
```bash
curl -X POST http://localhost:5000/api/achievements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Juara Kompetisi",
    "date": "2025-11-15",
    "uploadImage": "data:image/jpeg;base64,/9j/...",
    "description": "Menang kompetisi programming"
  }'
```

**4. UPDATE Achievement**
```bash
curl -X PUT http://localhost:5000/api/achievements/[MONGODB_ID] \
  -H "Content-Type: application/json" \
  -d '{...}'
```

**5. DELETE Achievement**
```bash
curl -X DELETE http://localhost:5000/api/achievements/[MONGODB_ID]
```

---

## 📊 MongoDB Data Structure

Setelah menambahkan achievement/activity, data di MongoDB akan terlihat seperti:

```json
{
  "_id": "ObjectId('...')",
  "title": "Juara Kompetisi",
  "date": "2025-11-15T00:00:00.000Z",
  "uploadImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "description": "Menang kompetisi programming",
  "createdAt": "2025-11-15T19:05:30.123Z",
  "updatedAt": "2025-11-15T19:05:30.123Z",
  "__v": 0
}
```

---

## 🔗 API Response Format

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Achievement berhasil ditambahkan",
  "data": {
    "_id": "...",
    "title": "...",
    "date": "...",
    "uploadImage": "...",
    "description": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "message": "Gagal menyimpan achievement",
  "error": "Error message details"
}
```

---

## 🔐 Environment Variables (.env)

```dotenv
# MongoDB Connection String
MONGODB_URI=mongodb+srv://Profildb:Profildb123@profildb.gaawes9.mongodb.net/?appName=Profildb

# Port untuk server
PORT=5000

# Environment
NODE_ENV=development
```

**⚠️ PENTING:** Jangan commit file `.env` ke GitHub! Tambahkan ke `.gitignore`

---

## 📝 Frontend Integration

Frontend sudah terupdate untuk:
1. ✅ Fetch achievements/activities saat page load
2. ✅ POST new achievement/activity ke API
3. ✅ PUT (edit) achievement/activity
4. ✅ DELETE achievement/activity
5. ✅ Display data dari API dengan proper formatting

**API URL di Frontend:**
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## 🛠️ Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution:**
1. Verifikasi internet connection
2. Check MongoDB Atlas credentials di `.env`
3. Whitelist IP address di MongoDB Atlas network access
4. Verify MongoDB cluster status

### Problem: "Module not found: require('express')"
**Solution:**
```bash
cd backend
npm install
```

### Problem: CORS errors di frontend
**Solution:** CORS sudah enabled di server.js, tapi pastikan:
1. Backend running di `http://localhost:5000`
2. Frontend fetching dari URL yang benar
3. Content-Type header adalah `application/json`

### Problem: Port 5000 already in use
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID [PID_NUMBER] /F

# Or change PORT di .env
PORT=3000
```

---

## 📚 File Reference

### Backend Files
- `server.js` - Main server entry point
- `config/db.js` - MongoDB connection
- `models/Achievement.js` - Achievement schema
- `models/Activity.js` - Activity schema
- `routes/achievements.js` - Achievement CRUD endpoints
- `routes/activities.js` - Activity CRUD endpoints
- `.env` - Environment variables
- `package.json` - Project dependencies

### Frontend File
- `public/index.html` - Updated dengan API integration

---

## 🎯 Next Steps

1. **Jalankan backend:** `npm start` dari folder backend
2. **Test API:** Gunakan curl atau Postman untuk test endpoints
3. **Open frontend:** Buka `index.html` di browser
4. **Test CRUD:** Tambah, edit, delete achievement/activity dari admin panel
5. **Verify MongoDB:** Cek data di MongoDB Atlas cloud console

---

## 📞 Support

Jika ada error, cek:
1. Terminal output untuk error messages
2. Browser console (F12 → Console tab)
3. MongoDB Atlas Network Access settings
4. Firewall/antivirus blocking port 5000

---

**Created:** November 15, 2025
**Status:** Backend dan Frontend Integration Complete ✅
