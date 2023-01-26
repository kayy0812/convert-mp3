import express from 'express';
import mp3 from './youtube/mp3.js';

const router = express.Router();

router.use('/youtube', [
    mp3
]);

export default router;