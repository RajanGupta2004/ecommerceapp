import express from 'express';
import {
  AddAddress,
  getAddress,
  Login,
  Register,
  VerifyEmailVerificationToken,
} from '../controller/userControllers.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/verify/:token', VerifyEmailVerificationToken);
router.post('/address', AddAddress);
router.get('/address/:userId', getAddress);

export default router;
