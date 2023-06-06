import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import bodyParser from 'body-parser'



const app = express()

dotenv.config()
app.use(bodyParser.json({ extended: true, limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_DB, { useNewURLParser: true, useUnifiedTopology: true }).then(() => app.listen(port, () => console.log(`node server started at ${port}`))).catch((error) => console.log(error))


app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)