import nodemailer from 'nodemailer';

require('dotenv').config();

const postitMail = process.env.EMAIL;
const mailPassword = process.env.EMAIL_PASSWORD;

/**
 * function to send mail
 * @param {array} users array of users to send message to
 * @param {string} message message to be sent to users
 * @param {string} priorityHeader priority of the message
 * @return {void}
 */
export function sendMail(users, message, priorityHeader) {
  // get email of the users
  let receivers = '';

  users.forEach((user) => {
    receivers += `${user.User.email},`;
  });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    service: 'Gmail',
    auth: {
      user: postitMail,
      pass: mailPassword
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt" <fob1493@gmail.com>',
    to: receivers,
    subject: priorityHeader,
    text: message,
    html: message
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`${info.messageId} send: ${info.response}`);
  });
}

/**
 * function to send sms to users
 * @param {array} users array of users
 * @return {void}
 */
// export function sendSMS(users) {
//   console.log('send an sms');
//   console.log(`critical priority users of ${users}`);
// }

/**
 * function to send reset password link to users mail
 * @param {string} token token to reset password
 * @param {string} email users email to send password reset link
 * @param {*} host
 * @return {void}
 */
export function sendResetMail(token, email, host) {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    service: 'Gmail',
    auth: {
      user: postitMail,
      pass: mailPassword
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt" <fob1493@gmail.com>',
    to: email,
    subject: 'POSTIT PASSWORD RESET',
    text: `You are receiving this because you (or someone else) 
    have requested the reset of the password for your account.\n\n
    Please click on the following link or paste this into your browser 
    to complete the process: \n\n
    http://${host}/reset/${token}\n\n
    If you did not request this, please ignore this mail and your 
    password will remain unchanged.`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });
}

/**
 * send message on successful reset of users password
 * @param {string} email users email address
 * @return {void}
 */
export function sendSuccessfulResetMail(email) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: postitMail,
      pass: mailPassword
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt" <fob1493@gmail.com>',
    to: email,
    subject: 'POSTIT PASSWORD CHANGE SUCCESSFUL',
    text: `This email confirms that your new POSTIT password has been set.\n\n
    You can now access your Account.`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });
}
