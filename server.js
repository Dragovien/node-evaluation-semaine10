import express from "express"
import dotenv from "dotenv"
import {join} from 'node:path';
import router from './router/route.js'
import session from 'express-session';

dotenv.config()

const cwd = process.cwd()
const staticPath = join(cwd, 'public')
const app = express()
app.set('view engine', 'pug')
app.use(express.static(staticPath))

app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: 'Session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(router)

app.use((req,res) => {
    res.status(404).send('page not found')
})

app.listen(8000, () => {
    console.log("Server listening at http://localhost:8000");
})