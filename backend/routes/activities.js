// routes/activities.js
// API Routes untuk CRUD Activity

const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// ============================================
// GET /api/activities
// Deskripsi: Ambil semua activities
// ============================================
router.get('/', async (req, res) => {
    try {
        // Cari semua activities, urutkan berdasarkan tanggal (terbaru duluan)
        const activities = await Activity.find().sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil activities',
            error: error.message
        });
    }
});

// ============================================
// GET /api/activities/:id
// Deskripsi: Ambil activity berdasarkan ID
// ============================================
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil activity',
            error: error.message
        });
    }
});

// ============================================
// POST /api/activities
// Deskripsi: Buat activity baru
// Body yang dikirim dari frontend:
// {
//   "title": "Judul",
//   "date": "2025-11-15",
//   "uploadImage": "data:image/jpeg;base64,...",
//   "description": "Deskripsi"
// }
// ============================================
router.post('/', async (req, res) => {
    try {
        const { title, date, uploadImage, description } = req.body;

        // Validasi input
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title dan description harus diisi'
            });
        }

        // Buat document baru
        const activity = new Activity({
            title,
            date: date || new Date(),
            uploadImage: uploadImage || '',
            description
        });

        // Simpan ke database
        await activity.save();

        res.status(201).json({
            success: true,
            message: 'Activity berhasil ditambahkan',
            data: activity
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Gagal membuat activity',
            error: error.message
        });
    }
});

// ============================================
// PUT /api/activities/:id
// Deskripsi: Update activity berdasarkan ID
// Body: sama seperti POST
// ============================================
router.put('/:id', async (req, res) => {
    try {
        const { title, date, uploadImage, description } = req.body;

        // Validasi
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title dan description harus diisi'
            });
        }

        // Cari dan update
        const activity = await Activity.findByIdAndUpdate(
            req.params.id,
            {
                title,
                date: date || new Date(),
                uploadImage: uploadImage || '',
                description
            },
            {
                new: true, // Return document yang sudah diupdate
                runValidators: true // Jalankan validasi schema
            }
        );

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Activity berhasil diupdate',
            data: activity
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Gagal mengupdate activity',
            error: error.message
        });
    }
});

// ============================================
// DELETE /api/activities/:id
// Deskripsi: Hapus activity berdasarkan ID
// ============================================
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Activity berhasil dihapus',
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus activity',
            error: error.message
        });
    }
});

module.exports = router;
