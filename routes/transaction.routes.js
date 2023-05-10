
const express = require("express");
const router = express.Router()
const { uploadS3 } = require("../utils/multerS3");
const { createTransaction, getTransactions } = require("../controllers/transactions.controller");

router.route('/createtransaction/:user_id').post(uploadS3.fields([
    {name : 'photos', maxCount: 10}, 
    {name : 'offer', maxCount : 1}, 
    {name: 'cv', maxCount: 1}]),
    createTransaction)

router.route("/gettransactions/:user_id").get(getTransactions)
module.exports = router

