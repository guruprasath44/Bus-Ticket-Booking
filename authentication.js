const jwt = require('jsonwebtoken');

const auth = function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send('Access Denied.');
    }

    try{
      const decoded = jwt.verify(token, "jwtPrivateKey");
      req.user = decoded;
      next();
    }
    catch(err){
       return res.status(403).send("Access Denied!");
    }
}

const adminCheck = function (req, res, next) {
    if (!req.user.isAdmin) 
        return res.status(403).send('Access Denied!');
    next();
}

module.exports = {
    auth: auth,
    adminCheck: adminCheck
}