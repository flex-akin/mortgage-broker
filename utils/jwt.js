const jwt = require("jsonwebtoken")

const sendToken = (userDetails, res) => {
    const accessToken = jwt.sign(userDetails, process.env.JWT_ACCESS_TOKEN, {
        expiresIn : process.env.JWT_EXPIRES_TIME
      } )
      return accessToken
}

module.exports = sendToken