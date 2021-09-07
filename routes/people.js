import express from 'express';
import {
    fetchPeopleController,
    fetchPersonController,
} from '../controllers/people.js';

const router = express.Router();

router.get('/', fetchPeopleController);
router.get('/profile/:id', fetchPersonController);

export default router;