const db = require("../models");
const Admin = db.admin;
const Realtor = db.realtor;
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwt");
const { sendAdminDetails, replySupport } = require("../utils/signup.email");
const AdminUploads = db.admin_uploads;
const Transactions = db.transaction;
const SupportEnquiry = db.support_enquiry;
const Transaction_Upload = db.transaction_upload;

exports.adminSignUp = async (req, res) => {
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function generateString() {
      let result = "pwd";
      const charactersLength = characters.length;
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    }
    console.log(req.user);
    if (req.user.email != "ayo.olowookere@imperialmortgagebank.com") {
      return res.status(401).json({
        success: false,
        message: "You are unauthorized",
      });
    }

    const data = req.body;
    const password = generateString();
    data.password = password;

    const adminSignUpEmail = sendAdminDetails(data);
    if (adminSignUpEmail && adminSignUpEmail.success == false) {
      return res.status(422).json({
        success: false,
        message: "email could not be sent at this time",
      });
    }
    console.log(data);

    const admin = await Admin.create(data);

    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

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
    const password = req.body.password;

    const checkPassword = bcrypt.compareSync(password, admin.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Information Mismatch, password is invalid",
      });
    }
    const adminDetails = {
      name: admin.name,
      email: admin.email,
      id: admin.id,
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
      auth_token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.getAllRealtors = async (req, res) => {
  try {
    const realtors = await Realtor.findAll();
    res.status(200).json({
      success: true,
      realtors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.uploadAdminDocs = async (req, res) => {
  try {
    const file = req.file;

    const adminUploads = await AdminUploads.create({
      file_name: req.body.file_name,
      file_url: file.location,
    });
    res.status(201).json({
      success: true,
      adminUploads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getUploads = async (req, res) => {
  try {
    const adminUploads = await AdminUploads.findAll();
    res.status(400).json({
      success: true,
      adminUploads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.findAll();

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.transactionCompleted = async (req, res) => {
  try {
    await Transactions.update(
      {
        status: "completed",
      },
      {
        where: {
          transaction_code: req.params.transaction_code,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.getSingleTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.findOne({
      where: {
        transaction_code: req.params.transaction_code,
      },
      include: [Transaction_Upload],
    });
    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const allAdmin = await Admin.findAll();

    res.status(200).json({
      success: true,
      allAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    var admin = await Admin.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (req.user.email != admin.email) {
      return res.status(401).json({
        success: false,
      });
    }
    const password = req.body.password;
    const checkPassword = bcrypt.compareSync(password, admin.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "your previous password is not correct",
      });
    }

    await Admin.update(
      {
        password: req.body.new_password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "password has been changed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.getSingleRealtors = async (req, res) => {
  try {
    const realtor = await Realtor.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      realtor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    await AdminUploads.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      message: "deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error,
    });
  }
};

exports.getAllSupport = async (req, res) => {
  try {
    const supports = await SupportEnquiry.findAll();
    res.status(200).json({
      success: true,
      supports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Email could not be sent at this time",
      stack: error,
    });
  }
};

exports.getSingleSupport = async (req, res) => {
  try {
    const support = await SupportEnquiry.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      support,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Email could not be sent at this time",
      stack: error,
    });
  }
};

exports.replySupport = async (req, res) => {
  try {
    const support = await SupportEnquiry.findOne({
      where: {
        id: req.params.id,
      },
    });
    const data = {
      message: req.body.message,
      subject: req.body.subject,
      email: support.email,
    };

    
    await replySupport(data);
    await SupportEnquiry.update(
      {
        isReplied: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      success: true,
      data : data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Email could not be sent at this time",
      stack: error.message,
    });
  }
};