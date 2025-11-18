// config/db.js
// File ini menghubungkan aplikasi dengan MongoDB menggunakan Mongoose

const mongoose = require('mongoose');
const dns = require('dns');

// Set DNS lookup optimization - gunakan Google DNS untuk SRV lookup yang lebih cepat
dns.setServers(['8.8.8.8', '8.8.4.4']);

let isConnecting = false;

const connectDB = async () => {
    // Jika sedang mencoba koneksi, jangan coba lagi (cegah race condition)
    if (isConnecting) {
        console.log('⏳ Koneksi MongoDB sedang berlangsung...');
        return;
    }

    isConnecting = true;

    try {
        // Ambil connection string dari environment variable (.env)
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error('MONGODB_URI tidak ditemukan di file .env');
        }

        console.log('🔌 Mencoba menghubung ke MongoDB...');

        // Koneksi ke MongoDB dengan Mongoose
        // Gunakan timeout yang lebih besar dan settings yang lebih robust
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 45000,  // 45 detik (lebih lama untuk DNS/SRV)
            socketTimeoutMS: 60000,            // 60 detik untuk socket operations
            connectTimeoutMS: 30000,           // 30 detik untuk initial connect
            retryWrites: true,
            w: 'majority',
            family: 4                          // Prefer IPv4
        });

        console.log('✅ MongoDB terhubung berhasil!');
        isConnecting = false;
        return mongoose.connection;

    } catch (error) {
        isConnecting = false;
        console.error('❌ MongoDB Error:', error.message);
        console.error('   (Akan coba koneksi ulang dalam 5 detik...)');
        throw error; // Lempar error, biarkan server.js handle retry
    }
};

module.exports = connectDB;
