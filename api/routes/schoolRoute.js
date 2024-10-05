import express from 'express';
import {
  createSchool,
  loginSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool
} from '../controllers/schoolController.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// Public routes
router.post('/register', createSchool);
router.post('/login', loginSchool);

// Protected routes
router.get('/', verifyToken, getAllSchools);
router.get('/:id', verifyToken, getSchoolById);
router.put('/:id', verifyToken, updateSchool);
router.delete('/:id', verifyToken, deleteSchool);

export default router;
