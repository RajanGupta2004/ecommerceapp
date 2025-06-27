import transporter from '../config/emailConfig.js';

const sendVerificationEmail = async (email, verificationToken) => {
  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Emai verification Token...',
    text: `Please click the following link to verify your email: http://localhost:8000/api/v1/verify/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error on sending mail', error.message);
    }
    console.log('Email Sent: ' + info);
  });
};

export default sendVerificationEmail;
