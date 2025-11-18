// routes/achievements.js
// API Routes untuk CRUD Achievement

const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// ============================================
// GET /api/achievements
// Deskripsi: Ambil semua achievements
// ============================================
router.get('/', async (req, res) => {
    try {
        // Cari semua achievements, urutkan berdasarkan tanggal (terbaru duluan)
        const achievements = await Achievement.find().sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: achievements.length,
            data: achievements
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil achievements',
            error: error.message
        });
    }
});

// ============================================
// GET /api/achievements/:id
// Deskripsi: Ambil achievement berdasarkan ID
// ============================================
router.get('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        
        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: achievement
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil achievement',
            error: error.message
        });
    }
});

// ============================================
// POST /api/achievements
// Deskripsi: Buat achievement baru
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
        const achievement = new Achievement({
            title,
            date: date || new Date(),
            uploadImage: uploadImage || '',
            description
        });

        // Simpan ke database
        await achievement.save();

        res.status(201).json({
            success: true,
            message: 'Achievement berhasil ditambahkan',
            data: achievement
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Gagal membuat achievement',
            error: error.message
        });
    }
});

// ============================================
// PUT /api/achievements/:id
// Deskripsi: Update achievement berdasarkan ID
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
        const achievement = await Achievement.findByIdAndUpdate(
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

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Achievement berhasil diupdate',
            data: achievement
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Gagal mengupdate achievement',
            error: error.message
        });
    }
});

// ============================================
// DELETE /api/achievements/:id
// Deskripsi: Hapus achievement berdasarkan ID
// ============================================
router.delete('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Achievement berhasil dihapus',
            data: achievement
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus achievement',
            error: error.message
        });
    }
});

module.exports = router;
