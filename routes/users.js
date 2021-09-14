import express from 'express';
import { 
    createUserController, 
    createUserFormController 
} from '../controllers/users.js';

const router = express.Router();

router.get('/create-account', createUserFormController);
router.post('/create-account', createUserController);

export default router;
