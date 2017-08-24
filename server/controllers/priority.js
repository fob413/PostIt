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

export function sendResetMail(token, email, host){
  console.log('>>>>>>>>>>>>>>>>>>>>>reset mail is being sent right now');
  console.log(token);
  console.log(host);

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
      return console.log(error);
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
    console.log('>>>>>>>>>>>>>>>>>message has been sent');
  });

}