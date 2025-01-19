import nodemailer from 'nodemailer';
import { Verification_email } from '../Template/route';


export async function sendVerificationEmail(email, Token) {
  try {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.GMAIL, 
        pass: process.env.PASS  
      }
    });

   
    const mailOptions = {
      from: 'TwistnTape@gmail.com', 
      to: email,                           
      subject: 'Verification Email | Twist n Tape',
      html: Verification_email.replace("verificationCode", Token) 
    };

    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: ' + info.response);
    
  } catch (error) {
    console.error("Error: " + error);
  }
}
