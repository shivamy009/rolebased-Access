const express = require('express')

const app = express()
const cors=require('cors')
app.use(cors())

require('dotenv').config()
app.use(express.json())
const database=require('./config/database')
const authRoute=require('./routers/authRoute')

database()

app.use('/api/v1/auth',authRoute)
app.use('/ty',(req,res)=>{
    res.send("Hello")
})
 
const PORT = process.env.PORT || 8001
app.use('/ty',(req,res)=>{
    res.send("Hell")
})
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})