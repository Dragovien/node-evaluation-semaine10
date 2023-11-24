import express from 'express'
import {home} from '../controller/user.controller.js'
const router = express.Router()

router.get('/', home)
// router.get('/login', all)
// router.get('/register', show)
// router.get('/dashboard', deleteProd)

export default router;