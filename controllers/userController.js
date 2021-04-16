const fs = require('fs')
const generateUniqueId = require('generate-unique-id');


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
        let index = data.map(p => {
            return p.id
        }).indexOf(id)

        if (index && deposit > 0) {

            // console.log(index)
            data[index].cash += deposit
            console.log(data)

            fs.writeFile('users.json', JSON.stringify(data), (err) => {
                console.log(err)
            })
            res.write(`${data[index].name} got ${data[index].cash + deposit} in his account`)
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
        let index = data.map(p => {
            return p.id
        }).indexOf(id)

        if (index && credit > 0) {

        // console.log(index)
            data[index].credit = credit
            console.log(data)

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


module.exports = {
    addUser,
    Depositing,
    updatingUser
}