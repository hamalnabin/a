import express from 'express';
import {
  createSchool,
  loginSchool,
  getSchoolById,

} from '../controllers/schoolController.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// Public routes
router.post('/register', createSchool);
router.post('/login', loginSchool);


router.get('/:id', verifyToken, getSchoolById);


export default router;
