const express = require('express')
const cors = require("cors")
const connectDB = require('./src/config/mongo.config')
const shortUrlRoutes = require("./src/routes/shortUrl.route")
const { handleClicks } = require('./src/controllers/handlClicks.controller')
const authRoutes = require("./src/routes/auth.route")
const cookieParser = require('cookie-parser')
const authMiddleware = require('./src/middlewares/auth.middleware')
require('dotenv').config()

const app = express()
app.use(cors({
    origin: "https://easyjmp-xdgv.vercel.app/",
    credentials: true,
}))

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.set("trust proxy", true);

//route for register and authentication
app.use('/auth', authRoutes)

//routes for getting and setting urls
app.use('/urls',  authMiddleware, shortUrlRoutes)


//route to handleClicks and redirect
app.get("/:id", handleClicks)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})