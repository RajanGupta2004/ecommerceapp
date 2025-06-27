import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL_USER || 'rg4010049@gmail.com',
    pass: process.env.EMAIL_PASS || 'ftci ivrh wlxl elnh',
  },
});

export default transporter;
