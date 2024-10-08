import express from 'express';
import { createContact, deleteContact, getAllContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post('/create-contact', createContact);
router.delete('/:id', deleteContact);
router.get('/all', getAllContacts);

export default router;