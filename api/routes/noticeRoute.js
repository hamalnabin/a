import express from 'express';
import multer from 'multer';
import { createNotice, getNotices, deleteNotice } from '../controllers/noticeController.js';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// Route to create a new notice with file upload
router.post('/create', upload.single('image'), createNotice);



// Route to get all notices
router.get('/all', getNotices);



// Route to delete a notice by ID
router.delete('/:id', deleteNotice);

export default router;
