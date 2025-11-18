// api/achievements.js - Vercel Serverless Function
// Handler untuk semua achievement endpoints (GET, POST, PUT, DELETE)

import mongoose from 'mongoose';

// Initialize MongoDB connection
const mongoURI = process.env.MONGODB_URI;
let mongoConnection = null;

async function connectDB() {
    if (mongoConnection) {
        console.log('Using existing MongoDB connection');
        return mongoConnection;
    }

    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 60000,
            connectTimeoutMS: 30000,
            retryWrites: true,
            w: 'majority'
        });
        mongoConnection = conn;
        console.log('✅ MongoDB connected');
        return conn;
    } catch (error) {
        console.error('❌ MongoDB Error:', error.message);
        throw error;
    }
}

// Achievement Schema
const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title max 200 chars']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    uploadImage: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true;
                if (v.startsWith('data:')) return true;
                if (/^[A-Za-z0-9+/=]+$/.test(v)) return true;
                return false;
            },
            message: 'Invalid image format'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description max 1000 chars']
    }
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await connectDB();

        // GET /api/achievements - Get all achievements
        if (req.method === 'GET') {
            const achievements = await Achievement.find().sort({ date: -1 });
            return res.status(200).json({
                success: true,
                count: achievements.length,
                data: achievements
            });
        }

        // POST /api/achievements - Create achievement
        if (req.method === 'POST') {
            const { title, date, uploadImage, description } = req.body;
            
            if (!title || !description) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and description required'
                });
            }

            const achievement = new Achievement({
                title,
                date: date || new Date(),
                uploadImage,
                description
            });

            await achievement.save();
            return res.status(201).json({
                success: true,
                message: 'Achievement created successfully',
                data: achievement
            });
        }

        // PUT /api/achievements/:id - Update achievement
        if (req.method === 'PUT') {
            // Try to get id from query or from URL path (when routed)
            let id = req.query && req.query.id;
            if (!id) {
                try {
                    const u = new URL(req.url, 'http://localhost');
                    const parts = u.pathname.split('/').filter(Boolean);
                    id = parts[parts.length - 1];
                } catch (e) {
                    id = null;
                }
            }

            const { title, date, uploadImage, description } = req.body;

            const achievement = await Achievement.findByIdAndUpdate(
                id,
                { title, date, uploadImage, description },
                { new: true, runValidators: true }
            );

            if (!achievement) {
                return res.status(404).json({
                    success: false,
                    message: 'Achievement not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Achievement updated successfully',
                data: achievement
            });
        }

        // DELETE /api/achievements/:id - Delete achievement
        if (req.method === 'DELETE') {
            let id = req.query && req.query.id;
            if (!id) {
                try {
                    const u = new URL(req.url, 'http://localhost');
                    const parts = u.pathname.split('/').filter(Boolean);
                    id = parts[parts.length - 1];
                } catch (e) { id = null; }
            }

            const achievement = await Achievement.findByIdAndDelete(id);

            if (!achievement) {
                return res.status(404).json({
                    success: false,
                    message: 'Achievement not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Achievement deleted successfully',
                data: achievement
            });
        }

        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
