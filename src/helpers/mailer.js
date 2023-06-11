
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: "mdfdevelopers@gmail.com", // generated ethereal user
        pass: "goudqfexwdqkikta", // generated ethereal password
        },
    });


transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

module.exports = transporter;