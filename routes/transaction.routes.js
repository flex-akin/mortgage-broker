
const express = require("express");
const router = express.Router()
const { uploadS3 } = require("../utils/multerS3");

router.route('/property').post(uploadS3.fields([
    {name : 'photos', maxCount: 10}, 
    {name : 'flier', maxCount : 1}, 
    {name: 'video', maxCount: 1}]),
    postPropertyDetails)




router.route("/login").post(logIn)
module.exports = router

