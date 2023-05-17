const jwt = require("jsonwebtoken");

const isAuthorizedUser = (req, res, next) =>{

  const token = req.headers.auth_token
  if (!token){
    return res.status(404).json({
      success: false,
      message: "Token not found"
    })
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    if (!decoded){
      return res.status(401).json({
        success: false,
        message: "You are not authorized"
      })
    }
    req.user = decoded
    next()
  }
  catch(error){
    return res.status(400).json({
      success: false,
      message: error
    })
  }
}


module.exports = isAuthorizedUser;
