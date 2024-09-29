import express from 'express';
import { addSong, listSong, removeSong, downloadSong } from '../controllers/songController.js';
import upload from '../middleware/multer.js';

const songRouter = express.Router()

songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);
songRouter.get('/list',listSong);
songRouter.post('/remove',removeSong)
songRouter.get('/download/:id', downloadSong);

export default songRouter;