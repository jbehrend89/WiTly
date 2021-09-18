import express from 'express';
import passport from 'passport';
import { 
    createUserController, 
    createUserFormController, 
    loginFormController
} from '../controllers/users.js';

const router = express.Router();

router.get('/create-account', createUserFormController);
router.post('/create-account', createUserController);
router.get('/login', loginFormController);
router.post(
    '/login',
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    })
);
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

export default router;
