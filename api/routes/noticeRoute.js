import express from 'express';
import multer from 'multer';
import { createNotice, getNotices, getNoticeById, deleteNotice, updateNotice } from '../controllers/noticeController.js';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// Route to create a new notice with file upload
router.post('/create', upload.single('image'), createNotice);

// Route to update a notice (with optional file upload)
router.put('/update/:id', upload.single('image'), updateNotice);

// Route to get all notices
router.get('/all', getNotices);

// Route to get a single notice by ID
router.get('/:id', getNoticeById);

// Route to delete a notice by ID
router.delete('/:id', deleteNotice);

export default router;
