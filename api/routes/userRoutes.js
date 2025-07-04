import express from 'express';
import {
  AddAddress,
  createOrder,
  getAddress,
  getOrderDetails,
  getUserProfile,
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
router.get('/user/:userId', getUserProfile);
router.post('/order', createOrder);
router.get('/order/:userId', getOrderDetails);

export default router;
