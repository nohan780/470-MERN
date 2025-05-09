import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // Adjust path if needed
import cors from 'cors'; // Import cors
import therapistRoutes from './routes/therapistRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

// Enable CORS for specific origins (React app's origin)
app.use(cors({
    origin: 'http://localhost:5173',  // Update this with the correct frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // Allow specific methods
    credentials: true,  // Allow cookies to be sent with requests
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Store in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // Set to true if using HTTPS in production
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
    }),
}));

app.use('/api/users', userRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB", err);
});
