import userModel from "../model/users.js";
import jwt from 'jsonwebtoken';

export const loginMiddleware = async (req, res, next) => {

  if (!req.session || !req.session.token) {
    console.log("No token or no session")
    res.render("user/login", { noSession: true, title: "Login" });
    return
  } else {
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);

    const user = await userModel.findOne({_id: decoded.userId, email: decoded.email})

    if (user) {
      console.log('authorized')
      req.user = user
      next();
    } else {
      console.log('invalid token')
      res.status(401).render("user/login", { wrongToken: true, title: "Login" });
      return
    }
  }
};
