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
    let deposit = req.body.deposit


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


const updatingUser = (req, res) => {

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

const withdrawCash = (req,res) =>{

    let id = req.params.id
    let withdraw = req.body.withdraw


    fs.readFile('users.json', (err, data) => {
        data = JSON.parse(data)
        let index = checkIndex(data,index)

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
    const transfer = req.body.transfer

    fs.readFile('users.json',(error,data) =>{

        data = JSON.parse(data)

        let index1 = checkIndex(data,id1)
        let index2 = checkIndex(data,id2)

        console.log(index1)
        console.log(index2)
        console.log(data)
        
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


module.exports = {
    addUser,
    Depositing,
    updatingUser,
    withdrawCash,
    TransferringCash
}