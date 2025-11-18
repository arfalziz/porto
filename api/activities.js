// api/activities.js - Vercel Serverless Function
// Handler untuk semua activity endpoints (GET, POST, PUT, DELETE)

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

// Activity Schema
const activitySchema = new mongoose.Schema({
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

const Activity = mongoose.model('Activity', activitySchema);

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

        // GET /api/activities - Get all activities
        if (req.method === 'GET') {
            const activities = await Activity.find().sort({ date: -1 });
            return res.status(200).json({
                success: true,
                count: activities.length,
                data: activities
            });
        }

        // POST /api/activities - Create activity
        if (req.method === 'POST') {
            const { title, date, uploadImage, description } = req.body;
            
            if (!title || !description) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and description required'
                });
            }

            const activity = new Activity({
                title,
                date: date || new Date(),
                uploadImage,
                description
            });

            await activity.save();
            return res.status(201).json({
                success: true,
                message: 'Activity created successfully',
                data: activity
            });
        }

        // PUT /api/activities/:id - Update activity
        if (req.method === 'PUT') {
            const { id } = req.query;
            const { title, date, uploadImage, description } = req.body;

            const activity = await Activity.findByIdAndUpdate(
                id,
                { title, date, uploadImage, description },
                { new: true, runValidators: true }
            );

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    message: 'Activity not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Activity updated successfully',
                data: activity
            });
        }

        // DELETE /api/activities/:id - Delete activity
        if (req.method === 'DELETE') {
            const { id } = req.query;

            const activity = await Activity.findByIdAndDelete(id);

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    message: 'Activity not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Activity deleted successfully',
                data: activity
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
