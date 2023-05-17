const express = require("express")
const { adminSignUp, logIn, getAllRealtors, uploadAdminDocs, getUploads } = require("../controllers/admin.controller")
const router = express.Router()
const isAdmin = require("../middlewares/verify.jwt")
const { uploadS3 } = require("../utils/multerS3");



router.route("/signup").post(adminSignUp)
router.route("/login").post(logIn)
router.route("/getallrealtors").get(isAdmin, getAllRealtors)
router.route("/adminuploads").post(isAdmin, uploadS3.single('document'), uploadAdminDocs)
router.route("/getadminuploads").get(isAdmin, getUploads)



module.exports = router