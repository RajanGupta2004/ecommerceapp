import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    address: [
      {
        name: String,
        mobileNo: String,
        houseNo: String,
        landMark: String,
        street: String,
        City: String,
        country: String,
        postalCode: String,
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timeStamp: true },
);

const User = mongoose.model('User', userSchema);

export default User;
