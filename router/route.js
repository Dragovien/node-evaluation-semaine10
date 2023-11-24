import express from 'express'
import {dashboard, register, login} from '../controller/user.controller.js'
const router = express.Router()

router.get('/', register)
router.get('/login', login)
router.get('/dashboard', dashboard)

export default router;