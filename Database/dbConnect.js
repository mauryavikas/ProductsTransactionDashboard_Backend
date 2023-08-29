import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config.js';

export const mogoDbConnect = () => {
    return mongoose.connect(MONGODB_URI);
}

export const mongoDbConnectionCheck = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}
