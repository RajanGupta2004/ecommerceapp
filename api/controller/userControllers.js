import User from '../model/user.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import sendVerificationEmail from '../utils/sendEmailVerificationOTP.js';
import Order from '../model/order.js';

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All field are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User Already exist....' });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');

    // encrypt password

    // create user
    const newUser = new User({ name, email, password, verificationToken });

    // save the user
    await newUser.save();

    // send verification mail to user

    sendVerificationEmail(newUser.email, newUser.verificationToken);
    return res.status(200).json({ message: 'Registration successfull...' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error ' });
  }
};

export const VerifyEmailVerificationToken = async (req, res) => {
  try {
    const token = req.params?.token;

    if (!token) {
      return res.status(400).json({ message: 'token is required...' });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({ message: 'Email verified successfully....' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error ', error: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All field are required....' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User are not register...' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password...' });
    }

    // generate token
    const secratCode = 'qwertyuikkjhhg';
    const token = jwt.sign({ userId: user._id }, secratCode);
    return res.status(200).json({ message: 'Login successfull', token });
  } catch (error) {
    console.log('Error in Login:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error ', error: error });
  }
};

export const AddAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Userid is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User Not found' });
    }

    user.address.push(address);

    await user.save();
    return res.status(201).json({ message: 'Address created successfully...' });
  } catch (error) {
    console.log('Error in Add Arddress:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error ', error: error });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User Not found' });
    }

    const address = user.address;

    return res.status(200).json({ address, message: 'Success' });
  } catch (error) {
    console.log('Error in get Address', error);
    return res
      .status(500)
      .json({ message: 'Internal server error ', error: error });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, cartItem, paymentMethod, shippingAddress, totalPrice } =
      req.body;

    if (!userId || !cartItem || !shippingAddress || !totalPrice) {
      return res.status(400).json({
        message: 'All fields are required.',
        requiredFields: ['userId', 'cartItem', 'shippingAddress', 'totalPrice'],
      });
    }

    if (!Array.isArray(cartItem) || cartItem.length === 0) {
      return res.status(400).json({ message: 'Cart cannot be empty.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const products = cartItem.map(item => ({
      name: item?.title,
      image: item.image,
      quantity: item.quantity,
      price: item?.price,
    }));

    const newOrder = new Order({
      user: userId,
      products,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    await newOrder.save();

    user.orders.push(newOrder._id);
    await user.save();

    return res.status(200).json({ message: 'Order created successfully.' });
  } catch (error) {
    console.error('Error creating order:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Userid is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User Not found' });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log('Error in  getUserProfile:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error ', error: error });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Userid is required' });
    }

    const user = await User.findById(userId).populate('orders');

    if (!user) {
      return res.status(404).json({ message: 'User Not found' });
    }

    return res.status(200).json({ orders: user.orders });
  } catch (error) {
    console.log('Error in  getOrderDetails:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error ', error: error });
  }
};
