const express = require("express");
const router = express.Router()
const { uploadS3 } = require("../utils/multerS3");
const { createRealtor, logIn, resetProfile, suportEnquiry, changePassword, updateUplaods } = require("../controllers/realtor.controller");


router.route("/createrealtor").post(createRealtor);
router.route("/resetprofile/:user_id").patch(resetProfile);


router.route("/login").post(logIn)
router.route("/updateuploads/:user_id").patch(uploadS3.fields([
    {name : 'cv_URL', maxCount: 1}, 
    {name : 'passport_URL', maxCount : 1},
    {name : 'id_URL', maxCount : 1},
    {name : 'cert_URL', maxCount : 1}
]), updateUplaods)
router.route("/support/:user_id").post(suportEnquiry)
router.route("/changepassword/:user_id").patch(changePassword)


module.exports = router

