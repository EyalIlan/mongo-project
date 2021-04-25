const express = require('express')
const body = require('body-parser')
const app = express()
const userRouth = require('./routes/usersRoute')
const MongoConnect = require('./index')
const cors = require('cors')

app.use(body.urlencoded({extended:true}))
app.use(body.json())
app.use(cors())


app.use(userRouth)

MongoConnect.mongoConnect()


app.listen(process.env.PORT || 5000,(req,res) =>{
    console.log('the server is up and running')
})