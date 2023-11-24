import userModel from "../model/users.js";

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
  const { method } = req;
  const { email, password } = req.body;

  let user = userModel.findOne({ email: email });
  console.log(user);
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
