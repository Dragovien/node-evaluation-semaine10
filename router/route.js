import express from "express";
import { register, login } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", register);

router.get("/login", login);
// router.get('/register', show)
// router.get('/dashboard', deleteProd)

export default router;
