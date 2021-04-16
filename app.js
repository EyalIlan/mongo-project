const express = require('express')
const body = require('body-parser')
const path = require('path')
const userRouth = require('./routes/usersRoute')

const app = express()
app.use(body.urlencoded({extended:true}))
app.use(body.json())

app.use(userRouth)


app.listen(3000,(req,res) =>{
    console.log('the server is up and running')
})