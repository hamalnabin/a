import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import schoolRouter from './routes/schoolRoute.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import contactRoutes from './routes/contactRoute.js';
import noticeRouter from './routes/noticeRoute.js';
import path from 'path';

// Load environment variables
dotenv.config();

// Database connection
connectDB();

const app = express();

// Security middleware with CSP customization
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Add any script sources if needed
                styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles or adjust as needed
            },
        },
    })
);

// CORS configuration
const corsOptions = {
    origin: [
        "https://sitamavi.vercel.app",
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

// Compression middleware to reduce response sizes
app.use(compression());

// Body parsing middleware
app.use(express.json());

// HTTP request logging
app.use(morgan('dev'));

// API routes
app.use('/v1/api/school', schoolRouter);
app.use('/v1/api/contact', contactRoutes);
app.use('/v1/api/notice', noticeRouter);

// Resolve __dirname for static file serving
const __dirname = path.resolve();

// Serve static files from the client build folder (e.g., React)
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

// Fallback to serve `index.html` for Single Page Application routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});

// Server initialization
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    server.close(() => {
        console.log('Server closed. Exiting process...');
        process.exit(0);
    });
});

// Error handling for server startup
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
