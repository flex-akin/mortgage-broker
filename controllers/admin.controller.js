const db = require("../models")
const Admin = db.admin
const Realtor = db.realtor
const bcrypt = require("bcryptjs")
const sendToken = require("../utils/jwt")
const AdminUploads = db.admin_uploads
const Transactions = db.transaction
const Transaction_Upload = db.transaction_upload




exports.adminSignUp = async(req, res) => {
    try{
        const admin = await Admin.create(req.body)

        res.status(201).json({
            success : true,
            admin
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error
    })
}
}


exports.logIn = async (req, res) => {
    try {
      const admin = await Admin.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const password = req.body.password
  
      const checkPassword = bcrypt.compareSync(password, admin.password);
      if (!checkPassword) {
        return res.status(400).json({
          success: false,
          message: "Information Mismatch, password is invalid",
        });
      }
      const adminDetails = {
        name: admin.name,
        email: admin.email
      };
  
      const token = sendToken(adminDetails, res);
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "JWT could not be generated",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Logged in succesffully",
        adminDetails,
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


  exports.getAllRealtors = async (req, res) => {
    try {
       const realtors = await Realtor.findAll()
       res.status(200).json({
        success: true,
        realtors,
      });

    }
    catch (error){
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error
          });     
    }
  }

  exports.uploadAdminDocs = async(req, res)=>{
    try{
      const file = req.file
      
      const adminUploads = await AdminUploads.create({
        file_name : req.body.file_name,
        file_url : file.location,
      })
      res.status(201).json({
        success : true,
        adminUploads
      })
  
    }
    catch(error){
      return res.status(500).json({
        success : false,
        message : "Internal server error",
        error : error.message
      })
    }
  }
  

  exports.getUploads = async(req, res) => {
    try{
        const adminUploads = await AdminUploads.findAll()
        res.status(400).json({
            success : true,
            adminUploads
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
          })
    }
  }

  exports.getTransactions = async(req, res) => {
    try{
        const transactions = await Transactions.findAll()

        res.status(200).json({
            success: true,
            transactions
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


exports.transactionCompleted = async(req, res) => {
    try{
        await Transactions.update({
            status : "completed",
        },{
            where : {
                transaction_code : req.params.transaction_code
            }
        })
        res.status(200).json({
            success : true,
            message : 'updated'
        })
    }
    catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
                stack: error
              });        
    }
}



exports.getSingleTransaction = async(req, res) => {
    try{
       const transaction = await Transactions.findOne(
        {
            where : {
                transaction_code : req.params.transaction_code
            },
            include : [Transaction_Upload]
        })
        res.status(200).json({
            success : true,
            transaction
        })
    }
    catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
                stack: error
              });        
    }
}
