import express from 'express';
import mp3 from './youtube/mp3.js';
import audio from './soundcloud/audio.js';

const router = express.Router();

router.use('/youtube', [
    mp3
]);

router.use('/soundcloud', [
    audio
]);

export default router;