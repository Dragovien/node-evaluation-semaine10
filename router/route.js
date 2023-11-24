import express from 'express'
import {dashboard, home, register, login, userLogin} from '../controller/user.controller.js'
import {registerMiddleware} from '../middlewares/registerMiddleware.js'
import {loginMiddleware} from '../middlewares/loginMiddleware.js'
const router = express.Router()

router.get('/', home)
router.post('/', registerMiddleware, register)
router.get('/login', login)
router.post('/login', userLogin)
router.get('/dashboard', dashboard)

export default router;
