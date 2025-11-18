// models/Activity.js
// Schema untuk menyimpan data activity (kegiatan) di MongoDB

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
    {
        // Judul activity
        title: {
            type: String,
            required: [true, 'Judul activity harus diisi'],
            trim: true,
            maxlength: [200, 'Judul tidak boleh lebih dari 200 karakter']
        },

        // Tanggal activity
        date: {
            type: Date,
            required: [true, 'Tanggal activity harus diisi'],
            default: Date.now
        },

        // Base64 encoded image
        // Format yang sama dengan Achievement:
        // 1. Data URL: "data:image/jpeg;base64,..."
        // 2. Base64 string: "/9j/4AAQSkZJRg..."
        uploadImage: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    if (!v) return true; // Optional
                    if (v.startsWith('data:')) return true;
                    if (/^[A-Za-z0-9+/=]+$/.test(v)) return true;
                    return false;
                },
                message: 'Image harus berformat base64 atau data URL'
            }
        },

        // Deskripsi activity
        description: {
            type: String,
            required: [true, 'Deskripsi activity harus diisi'],
            trim: true,
            maxlength: [1000, 'Deskripsi tidak boleh lebih dari 1000 karakter']
        }
    },
    {
        timestamps: true // Otomatis tambah createdAt dan updatedAt
    }
);

// Buat dan export model Activity
module.exports = mongoose.model('Activity', activitySchema);
