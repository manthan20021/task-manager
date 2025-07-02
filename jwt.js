const JWT = require("jsonwebtoken");

//JWT authMidellwear
const jwtAuthMidellwear = (req, res, next) => {
  //Extract jwt token from req.head
  const token = req.headers.authorization.spli(' ')[1];

  if (!token) res.status(401).json({ message: "Unauthorizationd token" });

  try {
    const decoded = JWT.verify(token, process.env.JWTZ_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token", error: error });
    console.log(error);
    
  }
};

//Function to jenret Token.

//payload
const generateToken = (userData) => {
  //genreting jwtToken : sign() function will genret the token
  return JWT.sign(userData, process.env.JWTZ_SECRET_KEY);
};

module.exports = {jwtAuthMidellwear, generateToken}
