const jwt = require("jsonwebtoken");
const redisClient = require("../db/redis");

//---------------- Verification based on jwt token ------------------------

// const checkAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const verify = jwt.verify(token, "Secret Key");
//     req.user_id = verify.id;
//     next();
//   } catch (err) {
//     res.status(401).json({
//       message: "Invalid authorization",
//     });
//   }
// };

// --------------- Verification based on session cookie ----------------
const checkAuth = (req, res, next) => {
  console.log(req.cookies.sessionID);
  if (req.cookies.sessionID === undefined) {
    console.log("sessionID is undefined");
    res.status(401).send("Please Login");
  } else {
    const token = req.cookies.sessionID;
    console.log(token);
    redisClient.get(token, (err, verify) => {
      if (verify == null) {
        console.log("Unverified");
        res.status(401).json({
          message: "PLease login",
        });
      } else {
        req.user_id = verify;
        console.log(verify);
        next();
      }
    });
  }
};

module.exports = checkAuth;
