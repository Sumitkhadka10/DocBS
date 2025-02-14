import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

// app config
const app = express()
const port = process.env.port || 4000
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

// api end point

app.get('/', (req, res) => {
    res.send('Summit')
})

app.listen(port, ()=> console.log("Server Started",port))
