const nodemailer = require("nodemailer");

// sendemail using nodemailer
const sendEmail = async (option) => {
  const transport = nodemailer.createTransport({
    // this is the sender mail and password  for login
    host: "smtp.example.com",
    port: 587,
    secure: true,
    service: process.env.EMAIL_SERVICE,   
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    }
  });
  const mailoptions = {
    // this object contain all the option like --> sender,resiver and text message
    form: process.env.SENDER_EMAIL,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transport.sendMail(mailoptions);
};

module.exports = sendEmail;
