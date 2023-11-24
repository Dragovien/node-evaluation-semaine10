import express from "express";
import { dashboard, home, login } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", home);

router.get("/login", login);
// router.get('/register', show)
router.get("/dashboard", dashboard);

export default router;
