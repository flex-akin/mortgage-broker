const db = require("../models");
const Realtor = db.realtor
const Transaction_Upload = db.transaction_upload
const Transactions = db.transaction

exports.createTransaction = async (req, res) => {
  try {
    const user_id = req.params.user_id

    var unique = new Date().valueOf();
    unique = "TR" + String(unique)

    var transaction = req.body
    transaction.user_id = user_id
    transaction.transaction_code = unique
    const iTransact = await Transactions.create(transaction);
   

      const files = req.files;
  
      if (files.photos) {
        const len = req.files.photos.length;
        for (let i = 0; i < len; i++) {
          await Transaction_Upload.create({
            fileUrl: req.files.photos[i].location,
            fileUrlKey: req.files.photos[i].key,
            fileType: req.files.photos[i].fieldname,
            transaction_code: unique,
          });
        }
      }
      if (files.offer) {
        for (let i = 0; i < 1; i++) {
          await Transaction_Upload.create({
            fileUrl: req.files.offer[i].location,
            fileUrlKey: req.files.offer[i].key,
            fileType: req.files.offer[i].fieldname,
            transaction_code: unique,
          });
        }
      }
      if (files.cv) {
        for (let i = 0; i < 1; i++) {
          await Transaction_Upload.create({
            fileUrl: req.files.cv[i].location,
            fileUrlKey: req.files.cv[i].key,
            fileType: req.files.cv[i].fieldname,
            transaction_code: unique,
          });
        }
      }

    res.status(201).json({
      success: true,
      message: "Transaction created",
      data: iTransact,
    });
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error.errors[0].message,
      stack: error,
    });
  }
};

exports.getTransactions = async(req, res) => {
    try{
        const transactions = await Transactions.findAll({
            where: {
                user_id : req.params.user_id
            },
            include : [Transaction_Upload]
        })

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