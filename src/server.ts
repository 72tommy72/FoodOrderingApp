import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
dotenv.config();
const port = process.env.PORT || 3000; // Changed from 5000 to 3000
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(` Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', (error as Error).message);
        process.exit(1); 
    }
};

startServer();
