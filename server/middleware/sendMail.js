import nodemailer from 'nodemailer';
import logger from 'logger';

require('dotenv').config();

const postitMail = process.env.EMAIL;
const mailPassword = process.env.EMAIL_PASSWORD;

/**
 * function to send mail
 * @export
 * @param {array} users array of users to send message to
 * @param {string} message message to be sent to users
 * @param {string} priorityHeader priority of the message
 * @return {void}
 */
export default (users, message, priorityHeader) => {
  // get email of the users
  let receivers = '';

  users.forEach((user) => {
    receivers += `${user.User.email},`;
  });

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
    to: receivers,
    subject: priorityHeader,
    html: `
    <div style="width: 100%; background-color: grey; padding: 2%;">
      <div style="width: 60%; background-color: white; margin: auto;">
        <div style="height: 8%; background-color: #004d40; width:100%">
          <img height="40px" style="margin-left: 2%" src="https://github.com/fob413/PostIt/blob/chore/feedback/template/image/postitL.png?raw=true">
        </div>
        <div style="padding: 8%">
          <div class="row">
            Hi, you have a new message:
          </div>
          <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%;">
            ${message}
          </div>
          <div style="border-top: 3px solid #004d40;"></div>
          <p style="font-weight: bold; color: #004d40;">PostIt</p>
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
    logger.info(`${info.messageId} send: ${info.response}`);
  });
}
