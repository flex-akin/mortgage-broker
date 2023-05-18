const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
var smtpTransporter = nodemailer.createTransport({
  port: process.env.MAIL_PORT,
  host: process.env.MAIL_HOST,
  secureConnection: true,
  auth: {
    user: process.env.AWS_SES_ACCESS_KEY_ID ,
    pass: process.env.AWS_SES_SECRET_ACCESS_KEY,
  },
  tls: {
    ciphers:'SSLv3'
},
  debug: true
});

exports.sendDetails = async(details) =>{
    try {
        const source = fs.readFileSync(path.join(__dirname, './templates/sendDetails.hbs'), "utf8")
        const template = handlebars.compile(source)
        const data = details
          var mailOptions = {
              from: "info@imperialmortgagebank.com",
              to: details.email,
              html: template(data)
            };
            mailOptions.subject = "Welcome to our Mortgage Brokerage Platform";
            const reponse = await smtpTransporter.sendMail(mailOptions)
      }catch(error){
        return {success: false, message: error}
      }
}

exports.support = async(details) =>{
    try {
        const source = fs.readFileSync(path.join(__dirname, './templates/support.hbs'), "utf8")
        const template = handlebars.compile(source)
        const data = details
          var mailOptions = {
              from: "info@imperialmortgagebank.com",
              to: "realtorsupport@imperialmortgagebank.com",
              html: template(data)
            };
            mailOptions.subject = details.subject
            const reponse = await smtpTransporter.sendMail(mailOptions)
      }catch(error){
        return {success: false, message: error}
      }
}

exports.sendAdminDetails = async(details) =>{
  try {
      const source = fs.readFileSync(path.join(__dirname, './templates/sendAdminDetails.hbs'), "utf8")
      const template = handlebars.compile(source)
      const data = details
        var mailOptions = {
            from: "info@imperialmortgagebank.com",
            to: details.email,
            html: template(data)
          };
          mailOptions.subject = "Welcome to our Mortgage Brokerage Platform";
          const reponse = await smtpTransporter.sendMail(mailOptions)
    }catch(error){
      return {success: false, message: error}
    }
}
