import userModel from "../model/users.js";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export const home = (req, res) => {
    res.status(200).render("user/register", { title: "Register" });
    return;
};

export const login = (req, res) => {
    res.status(200).render("user/login", { title: "Login" });
    return;
};

export const userLogin = (req, res) => {
    const { email, password } = req.body;

    const { method } = req;

    if (method === "POST") {
        userModel.findOne({ email: email }).then((user) => {
            if (CryptoJS.SHA256(password).toString() === user.password) {

                let token = {
                    'userId': user.id,
                    'email': email
                }

                const accessToken = jwt.sign(token, process.env.JWT_SECRET);

                req.session.token = accessToken

                res.status(200).redirect("/dashboard");
            } else {
                res.status(401).render("user/login", { wrongIdentifiers: true, title: "Login" });
                return
            }
        });
    }
    return
}

export const dashboard = (req, res) => {
    res.render("user/dashboard", {user: req.user, title: "Dashboard" });
    return;
};

export const register = async (req, res) => {
    const { method } = req;

    if (method === "POST") {
        try {
            let user = await userModel.findOne({ email: req.newUser.email });

            if (user) {
                res.status(200).render("user/register", { existingUser: true, title: "Register" });
            } else {
                await userModel.create(req.newUser);
                res.status(301).redirect("./login");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return;
};
