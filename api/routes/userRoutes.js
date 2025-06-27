import express from 'express';
import {
  Login,
  Register,
  VerifyEmailVerificationToken,
} from '../controller/userControllers.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/verify/:token', VerifyEmailVerificationToken);

export default router;
