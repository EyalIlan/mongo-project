
const fs = require('fs')

let id = 0

const addUser = (req,res) =>{
    
    id++;
    let name = req.body.name
    
    fs.readFile('users.json',(error,data)=>{
        data = JSON.parse(data)
        data.push({id:id,name:name,cash:0,credit:0})

        console.log(data)

        fs.writeFile('users.json',JSON.stringify(data),err => console.log(err))
            

    })

}

module.exports = {
    addUser
}