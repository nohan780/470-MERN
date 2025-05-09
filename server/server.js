import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import moodRoutes from './routes/moodRoutes.js'; // ✅ New route
import cors from 'cors';
import therapistRoutes from './routes/therapistRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import postRoutes from './routes/postRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',  // Update this with the correct frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // Allow specific methods
    credentials: true,  // Allow cookies to be sent with requests
}));

app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
    }),
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/moods', moodRoutes); // ✅ Mount new mood feature routes
app.use('/api/therapists', therapistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/posts', postRoutes);
app.use(quoteRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB", err);
});
