import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: '',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: '',
      pass: '',
    },
  });

  await transporter.sendMail({
    from: '', // sender address
    to, // list of receivers
    subject: 'Please reset your password!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};