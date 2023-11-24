import userModel from "../model/users.js";
import CryptoJS from "crypto-js";

const onError = (res) => {
  return (err) => {
    console.log("Something broke with DB:");
    console.log(err.message);
    res.status(501).json({ message: err.message });
  };
};

export const home = (req, res) => {
  res.render("user/register", { title: "Register" });
  return;
};

export const login = (req, res) => {
  res.render("user/login", { title: "Login" });
  const { email, password } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (CryptoJS.SHA256(password).toString() === user.password) {
      res.status(200);
      res.redirect("/dashboard");
    } else {
      res.status(301);
      res.redirect("/");
    }
  });

  return;
};

export const dashboard = (req, res) => {
  res.render("user/dashboard", { title: "Dashboard" });
  return;
};

export const register = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    try {
      let user = await userModel.findOne({ email: req.newUser.email });

      if (user) {
        res.render("user/register", { existingUser: true, title: "Register" });
      } else {
        await userModel.create(req.newUser);
        res.redirect("./login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return;
};
