// server.js
// Entry point aplikasi Node.js/Express
// Jalankan dengan: npm start atau npm run dev

require('dotenv').config(); // Load environment variables dari .env

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const achievementRoutes = require('./routes/achievements');
const activityRoutes = require('./routes/activities');

// Inisialisasi Express app
const app = express();

// Middleware
// CORS: Izinkan request dari frontend (semua origin)
app.use(cors());

// Body Parser: Parse JSON request body
app.use(express.json({ limit: '50mb' })); // Limit 50MB untuk base64 image
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ============================================
// Routes
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: '✅ API Portfolio Backend berjalan',
        timestamp: new Date().toISOString(),
        endpoints: {
            achievements: '/api/achievements',
            activities: '/api/activities'
        }
    });
});

// API Routes
app.use('/api/achievements', achievementRoutes);
app.use('/api/activities', activityRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan',
        path: req.path
    });
});

// ============================================
// Start Server
// ============================================

const PORT = process.env.PORT || 5000;

// Start server immediately (non-blocking)
const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🚀 Server berjalan di port ${PORT}      ║
║   📱 API: http://localhost:${PORT}      ║
║   🔌 Mencoba koneksi MongoDB...        ║
╚════════════════════════════════════════╝
    `);
});

// Connect to MongoDB in background dengan retry strategy
let mongoConnectionRetries = 0;
const maxMongoRetries = 10;

const attemptMongoConnection = async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB connected successfully!');
        mongoConnectionRetries = 0; // Reset on success
    } catch (error) {
        mongoConnectionRetries++;
        if (mongoConnectionRetries < maxMongoRetries) {
            console.log(`⏳ Retry ${mongoConnectionRetries}/${maxMongoRetries} dalam 5 detik...`);
            // Retry after 5 seconds
            setTimeout(attemptMongoConnection, 5000);
        } else {
            console.warn(`⚠️ MongoDB connection failed after ${maxMongoRetries} retries. Running without DB.`);
        }
    }
};

// Start MongoDB connection attempt after server starts
setTimeout(attemptMongoConnection, 100);

// Handle errors
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err.message);
});
