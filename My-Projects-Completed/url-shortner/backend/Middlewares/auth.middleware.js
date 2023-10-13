const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 8 });
const date = require("date-and-time");
const now = new Date();


const auth = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      let decodedToken = jwt.verify(token, "masai");
      console.log(decodedToken);
      if (decodedToken) {
        
        req.body.userID = decodedToken.userID;
        req.body.user = decodedToken.userName;
         req.body.shortID= uid.rnd();
         req.body.timeStamp= date.format(now, "MMM DD YYYY")
         req.body.visitedHistory= [];
       
        next();
      } else {
        res.send("Invalid token");
      }
    } catch (error) {
      res.send(error.message);
    }
  } else {
    res.status(200).json({message:"Please Login !!!"});
  }
};

module.exports = {
  auth,
};
