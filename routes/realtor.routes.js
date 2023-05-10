const express = require("express");
const router = express.Router()
const { uploadS3 } = require("../utils/multerS3");
const { createRealtor, logIn, resetProfile, suportEnquiry } = require("../controllers/realtor.controller");


router.route("/createrealtor").post(uploadS3.fields([
    {name : 'cv_URL', maxCount: 1}, 
    {name : 'passport_URL', maxCount : 1},
    {name : 'id_URL', maxCount : 1},
    {name : 'cert_URL', maxCount : 1}
]), createRealtor);

router.route("/login").post(logIn)
router.route("/resetprofile/:user_id").patch(resetProfile)
router.route("/support/:user_id").post(suportEnquiry)

module.exports = router

