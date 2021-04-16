const fs = require('fs')
const generateUniqueId = require('generate-unique-id');


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



const checkIndex = (data,id) =>{
    let index = data.map(p => {
        return p.id
    }).indexOf(id)

    if(index === -1){
        return false
    }else{
        return index
    }

}


const addUser = (req, res) => {

    const id = generateUniqueId();

    let name = req.body.name

    fs.readFile('users.json', (error, data) => {
        data = JSON.parse(data)
        data.push({ id: id, name: name, cash: 0, credit: 0 })

        console.log(data)

        fs.writeFile('users.json', JSON.stringify(data), err => console.log(err))

    })

}

const Depositing = (req, res) => {

    let id = req.params.id
    let deposit = req.body.cash


    fs.readFile('users.json', (err, data) => {
        data = JSON.parse(data)
        let index = checkIndex(data,id)

        if (index && NumberAndAboveZero(deposit)) {

            // console.log(index)
            data[index].cash += deposit

            fs.writeFile('users.json', JSON.stringify(data), (err) => {
                console.log(err)
            })
            res.write(`${data[index].name} got ${data[index].cash } in his account`)
        } else {
            res.write('User id does not exist in the system or the deposit was negative')
        }
        res.end()
    })

}


const updatingCredit = (req, res) => {

    let id = req.params.id
    let credit = req.body.credit

    fs.readFile('users.json', (err, data) => {
        data = JSON.parse(data)
        let index =  checkIndex(data,id)

        if (index && NumberAndAboveZero(credit)) {

            data[index].credit = credit
            fs.writeFile('users.json',JSON.stringify(data),(err) =>{
                console.log(err)
            })
            res.write(`${data[index].name} got ${data[index].credit} credit for his account`)
        } else {
            res.write('User id does not exist in the system or the deposit was negative')
        }
        res.end()
    })
}


const getUser = (req,res) =>{

    const id = req.params.id
    fs.readFile('users.json', (err, data) => {
        data = JSON.parse(data)
        let index = checkIndex(data,id)

        console.log(index)



        if(index !== false){
            res.write('<h1>User</h1>')
            res.write('<div>')
            res.write(`<p>  <b>  ID :  </b>  ${data[index].id}  , <b> NAME : </b> ${data[index].name}  ,  <b>  CASH : </b> ${data[index].cash}   ,   <b> CREDIT : </b>  ${data[index].credit} </p>`)
            res.write('<div>')
        }else{
            res.write('user Does not exists')
        }
        res.end()
    })
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


const TransferringCash = (req,res) =>{

    const {id1,id2} = req.params
    const transfer = req.body.cash

    fs.readFile('users.json',(error,data) =>{

        data = JSON.parse(data)

        let index1 = checkIndex(data,id1)
        let index2 = checkIndex(data,id2)

        
        if(index1 !== false && index2 !==false && NumberAndAboveZero(transfer)){
            
            
            if(data[index1].cash - transfer >= -data[index1].credit){
                
                data[index1].cash -= transfer
                data[index2].cash += transfer
            }

            // console.log(data)

            fs.writeFile('users.json',JSON.stringify(data),err => console.log(err))

        }

    })

}


const getAllUsers = (req,res) =>{

    fs.readFile('users.json',(error,data)=>{
        data = JSON.parse(data)
        res.write('<h1> All Users </h1>')
        
        data.forEach(p =>{
            res.write('<div>')
            res.write(`<p>  <b>  ID :  </b>  ${p.id}  , <b> NAME : </b> ${p.name}  ,  <b>  CASH : </b> ${p.cash}   ,   <b> CREDIT : </b>  ${p.credit} </p>`)
            res.write('<div>')
        })

        
        res.write('<h2>methods</h2>')
        res.write('<h3>Get All Users -> Routh -> /</h3>')
        res.write('<h3>Add User -> Routh -> /add , body -> name , method -> post</h3>')
        res.write('<h3>Depositing -> Routh -> /Depositing/:id , body -> cash , method -> post</h3>')
        res.write('<h3>updatingCredit -> Routh -> /credit/:id , body -> credit , method -> post</h3>')
        res.write('<h3>withdrawCash -> Routh -> /withdraw/:id , body -> cash , method -> post</h3>')
        res.write('<h3>TransferringCash -> Routh -> /transferring/:id1/:id2 , body -> cash , method -> post</h3>')
        
        res.end()


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