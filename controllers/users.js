import { createUser } from '../models/users.js';

export const createUserFormController = function (req, res) {
    return res.render('createAccount');
};

export const createUserController = async function (req, res) {
    let userData = req.body;
    const user = await createUser(userData);
    return res.render('login');
};
