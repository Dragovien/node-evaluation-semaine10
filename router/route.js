import express from 'express'
import {dashboard, home, register, login} from '../controller/user.controller.js'
const router = express.Router()

router.get('/', home)
router.post('/register', register)
router.get('/login', login)
router.get('/dashboard', dashboard)

export default router;