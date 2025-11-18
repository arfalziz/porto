# 🚀 DEPLOYMENT GUIDE - Vercel

## Prasyarat
- GitHub account (https://github.com)
- Vercel account (https://vercel.com) - bisa daftar dengan GitHub
- MongoDB Atlas cluster (sudah ada: Profildb)

---

## STEP 1: Setup GitHub Repository

### 1.1 Inisialisasi Git (jika belum)
```bash
cd "d:\Kuliah\Project vs code\Porto"
git init
git add .
git commit -m "Initial commit: Portfolio with MongoDB backend"
```

### 1.2 Create Repository di GitHub
1. Buka https://github.com/new
2. Repository name: `porto` (atau nama lain)
3. Description: "Portfolio website with achievements and activities"
4. Pilih Public (agar Vercel bisa akses)
5. Click **Create repository**

### 1.3 Push ke GitHub
Ikuti instruksi yang muncul di GitHub setelah create:
```bash
git remote add origin https://github.com/USERNAME/porto.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Setup Environment Variables di Vercel

Sebelum deploy, setup environment variable untuk MongoDB connection string.

### 2.1 Buka Vercel
1. Buka https://vercel.com
2. Login dengan GitHub (jika belum)

### 2.2 Create Project
1. Click **Add New** → **Project**
2. Pilih repository `porto`
3. Click **Import**

### 2.3 Environment Variables
1. Di halaman project setup, scroll ke **Environment Variables**
2. Click **Add**
3. Tambahkan:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://Profildb:Profildb123@profildb.gaawes9.mongodb.net/?appName=Profildb`
4. Click **Add**

### 2.4 Deploy
1. Click **Deploy**
2. Tunggu ~2-3 menit hingga selesai

---

## STEP 3: Update MongoDB Whitelist (PENTING!)

Tambahkan IP Vercel ke MongoDB Atlas whitelist:

1. Buka https://cloud.mongodb.com
2. Login ke account Profildb
3. Pilih cluster **Profildb**
4. Klik **Network Access** (sidebar)
5. Klik **ADD IP ADDRESS**
6. Masukkan: `0.0.0.0/0` (allow semua IP - untuk production)
   - Atau tunggu Vercel deploy error, copy IP dari error, dan whitelist IP tersebut
7. Klik **Confirm**

---

## STEP 4: Test Deployment

Setelah deploy selesai:

1. Buka URL yang diberikan Vercel (contoh: `https://porto.vercel.app`)
2. Coba login admin: username=`admin`, password=`123456`
3. Coba tambah achievement/activity
4. Cek apakah data tersimpan di MongoDB

---

## Testing Endpoints

Untuk verify API berfungsi:

```bash
# Replace VERCEL_URL dengan URL Vercel Anda
# Contoh: https://porto.vercel.app

# Test health check
curl https://porto.vercel.app/

# Test GET achievements
curl https://porto.vercel.app/api/achievements

# Test POST achievement
curl -X POST https://porto.vercel.app/api/achievements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Achievement",
    "date": "2025-11-18",
    "uploadImage": "",
    "description": "Test from Vercel"
  }'
```

---

## Troubleshooting

### Error: "Cannot connect to MongoDB"
**Solusi:**
- Pastikan MONGODB_URI sudah diset di Environment Variables
- Pastikan IP Vercel di-whitelist di MongoDB Atlas (0.0.0.0/0)
- Check status MongoDB Atlas cluster (harus online)

### Error: "Module not found"
**Solusi:**
- Pastikan `package.json` di root folder (bukan di backend/)
- Run: `npm install` di root

### Error: "API_URL is not correct"
**Solusi:**
- Frontend auto-detect production URL dari `window.location.origin`
- Tidak perlu update API_URL manual jika deploy di Vercel

---

## Update Kode & Redeploy

Setiap kali update code:

```bash
cd "d:\Kuliah\Project vs code\Porto"
git add .
git commit -m "Update: [description]"
git push origin main
```

Vercel auto-redeploy saat push ke GitHub.

---

## Custom Domain (Optional)

Untuk pakai domain custom (contoh: myportfolio.com):

1. Di Vercel project settings
2. Klik **Domains**
3. Masukkan domain Anda
4. Update DNS records sesuai instruksi Vercel
5. DNS propagation ~24 jam

---

## Rollback ke Versi Lama

Jika ada masalah:

1. Buka Vercel project
2. Klik **Deployments**
3. Pilih deployment yang stabil
4. Click **...** → **Promote to Production**

---

## Backup MongoDB

Backup data MongoDB secara berkala:

1. Di MongoDB Atlas
2. Cluster → **Backup**
3. Click **Take Snapshot** (manual backup)

---

## Performance Tips

1. **Image Optimization:** Kompres image sebelum upload (~200KB max)
2. **CDN:** Vercel automatically serve static files via CDN
3. **Serverless:** Function timeout ~60 detik, pastikan upload tidak >50MB

---

## Next Steps

Setelah production live:
- Monitor Vercel dashboard untuk errors
- Setup GitHub Actions untuk automated testing (optional)
- Implement user authentication (optional)
- Setup automated backups (optional)
