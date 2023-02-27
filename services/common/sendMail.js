const nodemailer = require("nodemailer");
const apiResponse = require("../../helpers/apiResponse");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (res, to, subject, textMessage, mailBody) => {
  try {
    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILING_USER, // generated ethereal user
        pass: process.env.MAILING_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Bookish Nearby", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: textMessage, // plain text body
      html: mailBody, // html body
    });

    console.log("Message sent: %s", info.messageId);

    // apiResponse.successResponseWithData(res, "Mail sent successfully", info);
  } catch (err) {
    apiResponse.ErrorResponse(res, err);
  }
};
