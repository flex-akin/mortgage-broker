const db = require("../models");
const Realtor = db.realtor
const sendToken = require("../utils/jwt")
const bcrypt = require("bcryptjs")


const {sendDetails, support} = require("../utils/signup.email");

exports.createRealtor = async (req, res) => {
  try {
    var unique = new Date().valueOf();
    unique = String(unique).substring(5, 13)

  
    const person = await Realtor.create({
      name: req.body.name,
      name_of_business: req.body.name_of_business,
      email: req.body.email,
      address: req.body.address,
      phone_number: req.body.phone_number,
      id_number: req.body.id_number,
      username: req.body.username,
      password: req.body.password,
      user_id: unique,
      id_type : req.body.id_type,
    });
    const realtor  = {
        name : req.body.name,
        password : req.body.password,
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


exports.logIn = async (req, res) => {
    try {
      const realtor = await Realtor.findOne({
        where: {
          user_id: req.body.user_id,
        },
      });
      if (!realtor) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const password = req.body.password
  
      const checkPassword = bcrypt.compareSync(password, realtor.password);
      if (!checkPassword) {
        return res.status(400).json({
          success: false,
          message: "Information Mismatch, password is invalid",
        });
      }
      const realtorDetails = {
        name: realtor.name,
        username: realtor.username,
        user_id: realtor.user_id,
        passport_URL: realtor.passport_URL,
      };
  
      const token = sendToken(realtorDetails, res);
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "JWT could not be generated",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Logged in succesffully",
        realtorDetails,
        auth_token : token
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        stack: error
      });
    }
  };

  exports.updateUplaods = async(req, res) => {
    try{
        await Realtor.update(req.body,{
            where: {
                user_id : req.params.user_id
            }
        })

    const cv_URL = req.files.cv_URL ? req.files.cv_URL[0].location : undefined;
    const passport_URL = req.files.passport_URL ? req.files.passport_URL[0].location : undefined;
    const id_URL = req.files.id_URL ? req.files.id_URL[0].location : undefined;
    const cert_URL = req.files.cert_URL ? req.files.cert_URL[0].location : undefined;


    await Realtor.update({
        cv_URL: cv_URL,
        passport_URL: passport_URL,
        id_URL: id_URL,
        cert_URL: cert_URL,
      },{
        where : {
            user_id : req.params.user_id
        }
      });

        res.status(200).json({
            success: true,
            message: "your uplaoda has been added",
          });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error
          });        
    }
  }

  exports.suportEnquiry = async(req, res) => {
    try{
        var realtor = await Realtor.findOne(
            {
                where :{
                    user_id : req.params.user_id
                }
            }
        )
        const data = {
            name : realtor.name,
            user_id : realtor.user_id,
            subject : req.body.subject,
            message : req.body.message
        }
        await support(data);


        res.status(200).json({
            success: true,
            message: "your enqiry/support has been sent",
            
          });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Email could not be sent at this time",
            stack: error
          });        
    }
  }


  exports.changePassword = async(req, res) => {
    try{
        var realtor = await Realtor.findOne(
            {
                where :{
                    user_id : req.params.user_id
                }
            }
        )
        const password = req.body.password
        const checkPassword = bcrypt.compareSync(password, realtor.password);
        if (!checkPassword) {
          return res.status(400).json({
            success: false,
            message: "your previous password is not correct",
          });
        }

        if (req.body.new_password != req.body.confirm_new_password){
          return res.status(400).json({
            success: false,
            message: "your new password doesn't match",
          });
        }
        await Realtor.update({
            password : req.body.new_password
        },
        {
            where : {
                user_id : req.params.user_id
            }
        })

        res.status(200).json({
            success: true,
            message: "password has been changed",
          });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            stack: error
          });        
    }
  }

  exports.resetProfile = async (req, res) => {
    try {
     
       await Realtor.update(req.body,{
       where: {
        user_id: req.params.user_id
       }
      });
      res.status(200).json({
        success: true,
        message: "updated",
      });
    
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || error.errors[0].message,
        stack: error,
      });
    }
  };
  
  