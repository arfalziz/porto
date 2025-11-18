// models/Achievement.js
// Schema untuk menyimpan data achievement (prestasi) di MongoDB

const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
    {
        // Judul achievement
        title: {
            type: String,
            required: [true, 'Judul achievement harus diisi'],
            trim: true,
            maxlength: [200, 'Judul tidak boleh lebih dari 200 karakter']
        },

        // Tanggal achievement
        date: {
            type: Date,
            required: [true, 'Tanggal achievement harus diisi'],
            default: Date.now
        },

        // Base64 encoded image
        // OPSI: Anda bisa gunakan salah satu format:
        // 1. "data:image/jpeg;base64,/9j/4AAQSkZJRg..." (dengan MIME type)
        // 2. "/9j/4AAQSkZJRg..." (hanya base64, tanpa MIME type)
        // REKOMENDASI: Gunakan opsi 1 (dengan MIME type) agar lebih fleksibel saat rendering
        uploadImage: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    // Accept: data URL, base64 string, atau empty
                    if (!v) return true; // Optional field
                    if (v.startsWith('data:')) return true;
                    if (/^[A-Za-z0-9+/=]+$/.test(v)) return true;
                    return false;
                },
                message: 'Image harus berformat base64 atau data URL'
            }
        },

        // Deskripsi achievement
        description: {
            type: String,
            required: [true, 'Deskripsi achievement harus diisi'],
            trim: true,
            maxlength: [1000, 'Deskripsi tidak boleh lebih dari 1000 karakter']
        }
    },
    {
        timestamps: true // Otomatis tambah createdAt dan updatedAt
    }
);

// Buat dan export model Achievement
module.exports = mongoose.model('Achievement', achievementSchema);
