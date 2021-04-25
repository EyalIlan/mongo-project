const fs = require('fs')
const Bank = require('../models/product.model')

const NumberAndAboveZero = (num) =>{

    let check = true;
    
    if(isNaN(num)){
        check = false
    }

    if(num < 0){
        check = false
    }
    return check;
}




const addUser = (req, res,next) => {

    let email = req.body.email
    let name = req.body.name



    const bank = new Bank({
        email:email,
        name:name,
        cash:0,
        credit:0
    })

    bank.save((err) =>{
        if(err){
            return res.status(402).json('Error cant save user')
        }else{
            return res.status(200).json('User is save in the database')
        }

    })


  

}

const Depositing = async (req, res) => {



    let email = req.body.email
    let deposit = req.body.cash



    if(NumberAndAboveZero(deposit)){

        
        try{
            const data = await Bank.updateOne({
                email:email
            },{
                $inc:{
                    cash:deposit
                }
            }
            ,{new:true})
        }
        catch(e) {
            throw new Error('error')
        }
        
        
    }

    // fs.readFile('users.json', (err, data) => {
    //     data = JSON.parse(data)
    //     let index = checkIndex(data,id)

  

}


const updatingCredit = async (req, res) => {

    let email = req.body.email
    let credit = req.body.credit

    if(NumberAndAboveZero(credit)){
        const data = await Bank.updateOne({email:email},{credit:credit},{new:true,runValidators:true})
        res.json(`Set Credit to ${req.body.credit}`)
    }

}


const getUser =  (req,res) =>{



    // console.log(email)
    // try{
    //     const data = await Bank.find({email:email})
    //     // res.send(data)    

    // }catch(e){
    //     res.send('Error Cant Get User')
    // }

    // fs.readFile('users.json', (err, data) => {
    //     data = JSON.parse(data)
    //     let index = checkIndex(data,id)

    //     console.log(index)



    //     if(index !== false){
    //         res.write('<h1>User</h1>')
    //         res.write('<div>')
    //         res.write(`<p>  <b>  ID :  </b>  ${data[index].id}  , <b> NAME : </b> ${data[index].name}  ,  <b>  CASH : </b> ${data[index].cash}   ,   <b> CREDIT : </b>  ${data[index].credit} </p>`)
    //         res.write('<div>')
    //     }else{
    //         res.write('user Does not exists')
    //     }
    //     res.end()
    // })
}



const withdrawCash = (req,res) =>{

    let id = req.params.id
    let withdraw = req.body.cash


    fs.readFile('users.json', (err, data) => {
        data = JSON.parse(data)
        let index = checkIndex(data,id)

        if (index  && NumberAndAboveZero(withdraw)) {

            if(data[index].cash - withdraw >= -data[index].credit){
                data[index].cash -= withdraw
            }

            fs.writeFile('users.json',JSON.stringify(data),(err) =>{
                console.log(err)
            })
            res.write(`${data[index].name} got ${data[index].cash} cash for his account`)
        } else {
            res.write('User id does not exist in the system or the deposit was negative')
        }
        res.end()
    })
}


const TransferringCash = async (req,res) =>{

    const {email,email2} = req.body
    const transfer = req.body.cash

    

    const user = await Bank.findOne({email:email})
    const user2 = await Bank.findOne({email:email2})

    
    if( user && user2 && NumberAndAboveZero(transfer)){
        

        
        if(user.cash - transfer >= -user.credit){
            
            console.log('heloo')
            
           await  Bank.updateOne({email:email},{$inc:{cash:-transfer}})
           await  Bank.updateOne({email:email2},{$inc:{cash:+transfer}})
          
        }
    
    }

   
}


const getAllUsers = (req,res) =>{

    fs.readFile('users.json',(error,data)=>{
        data = JSON.parse(data) 
        res.send(data)

    })

}




module.exports = {
    addUser,
    Depositing,
    updatingCredit,
    withdrawCash,
    TransferringCash,
    getAllUsers,
    getUser
}