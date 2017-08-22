import nodemailer from 'nodemailer';

export function sendMail(users, message){
  console.log('send the mail');
  console.log(`the following users ${users}`);

  // get email of the users
  let receivers = '';

  users.forEach((user) => {
    receivers += `${user.User.email},`;
  });
  console.log('before receivers');
  console.log(receivers);
  console.log('after receivers');

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    service: "Gmail",
    auth: {
      user: 'fob1493@gmail.com',
      pass: 'OuoeBlgn413'
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt" <fob1493@gmail.com>',
    to: receivers,
    subject: 'URGENT',
    text: message,
    html: message
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });


  
}

export function sendSMS(users){
  console.log('send an sms');
  console.log(`critical priority users of ${users}`);
}