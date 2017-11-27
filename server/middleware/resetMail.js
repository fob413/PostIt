import nodemailer from 'nodemailer';
import logger from 'logger';

require('dotenv').config();

const postitMail = process.env.EMAIL;
const mailPassword = process.env.EMAIL_PASSWORD;

/**
 * function to send reset password link to users mail
 * @export
 * @param {string} token token to reset password
 * @param {string} email users email to send password reset link
 * @param {*} host
 * @return {void}
 */
export default (token, email, host) => {
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
    subject: 'POSTIT PASSWORD RESET',
    html: `
    <div style="width: 100%; background-color: grey; padding: 2%;">
      <div style="width: 60%; background-color: white; margin: auto;">
        <div style="height: 8%; background-color: #004d40; width:100%">
          <img height="40px" style="margin-left: 2%" src="https://github.com/fob413/PostIt/blob/chore/feedback/template/image/postitL.png?raw=true">
        </div>
        <div style="padding: 8%">
          <div class="row">
            You are receiving this because you (or someone else) have requested the reset of the password for your account.<br />Please click on the following link or paste this into your browser to complete the process:
            <p>http://${host}/reset/${token}</p>
            <p>If you did not request this, please ignore this mail and your password will remain unchanged.</p>
          </div>
          <div style="border-top: 3px solid #004d40;"></div>
          <p style="font-weight: bold; color: #004d40">PostIt</p>
        </div>
      </div>
    </div>
    `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    logger.info(`Message ${info.messageId} send: ${info.response}`);
  });
};
