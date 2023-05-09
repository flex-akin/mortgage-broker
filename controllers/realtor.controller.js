const db = require("../models");
const Realtor = db.realtor

const {sendDetails} = require("../utils/signup.email");

exports.createRealtor = async (req, res) => {
  try {
    const password = Math.random().toString(36).substring(2)
    var unique = new Date().valueOf();
    unique = String(unique).substring(5, 13)

    const cv_URL = req.files.cv_URL[0];
    const passport_URL = req.files.passport_URL[0];
    const id_URL = req.files.id_URL[0];
    const cert_URL = req.files.cert_URL ? req.files.cert_URL[0] : null;
        
    const person = await Realtor.create({
      name: req.body.name,
      name_of_business: req.body.name_of_business,
      email: req.body.email,
      address: req.body.address,
      phone_number: req.body.phone_number,
      id_number: req.body.id_number,
      username: req.body.username,
      password: password,
      user_id: unique,
      id_type : req.body.id_type,
      cv_URL: cv_URL.location,
      passport_URL: passport_URL.location,
      id_URL: id_URL.location,
      cert_URL: cert_URL.location,
    });
    const realtor  = {
        name : req.body.name,
        password : password,
        user_id : unique,
        username : req.body.username,
        email : req.body.email
    } 
    const emailDetails = await sendDetails(realtor);
    if (emailDetails && emailDetails.success == false) {
      return res.status(422).json({
        success: false,
        message: "email could not be sent at this time",
      });
    }

    res.status(200).json({
      success: true,
      message: "Your credential have been sent to your email",
      data: person,
    });
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error.errors[0].message,
      stack: error,
    });
  }
};


exports