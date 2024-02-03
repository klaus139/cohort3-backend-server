import express from 'express';
import { createUser, deleteUserById, getAUser, getAllUsers, loginUser, logoutUser, updateProfile } from '../controllers/authControllers.js';
import {authenticate} from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/isAdmin.js';
const router = express.Router();

router.post('/register', createUser)
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/update-profile', authenticate, updateProfile)
router.get('/all-users', getAllUsers);
router.get('/get-user/:id', getAUser);
router.delete('/delete-user/:id', authenticate, isAdmin, deleteUserById)



export default router;