import React, { useState } from 'react'
import axios from 'axios'


export default function Deposit() {

    
    const [action,SetAction] = useState('Get')
    const [email,SetEmail] = useState('')
    const [name,SetName] = useState('')
    const [cash,SetCash] = useState(0)
    const [credit,SetCredit] = useState('')
    const [email2,SetEmail2] = useState('')
    const [lock,SetLock] = useState(false)

    const  SetMode = (e) =>{
        SetAction(e.target.value)
    } 

    const RetriveData = async (url) =>{
        
        SetLock(lock)
        
        
        
        let data;
        
              data =  await axios.post(url,{
               email,
               name,
               cash,
               credit,
               email2
               
           })
       
        }
           
    
    
    
    
    const ChangeHandler = (e) =>{
    
        switch(e.target.name){

            case 'email':
         
                SetEmail(e.target.value)
                break;
                case 'name':
                SetName(e.target.value)
                break;
            case 'cash':
                SetCash(e.target.value)
                break;
            case 'credit':
                SetCredit(e.target.value)
                break;
            case 'email2':
                SetEmail2(e.target.value)
                break;
        
        }
    
    }

    let url = 'http://localhost:5000/'
    
  


    const ActiveDataAction = (e) =>{
        e.preventDefault()
        switch(action){

            case 'Get':
                RetriveData(url + 'user')
                break;
            case 'Add':
                RetriveData(url + 'add')
                break;    
            case 'Depositing':
                RetriveData(url + 'deposit')
            break;
            
            case 'Update':
                RetriveData(url + 'credit')
            break;
            case 'transaction':
                RetriveData(url + 'transferring')
            break;
    
            }



    }


    let ForumData;
   



    switch(action){

        case 'Get':
            ForumData =  <div className="user-box"   onChange={ChangeHandler}><label>Email</label><input    name ="email"  type="text" /></div>
            break;
        case 'Add':
            ForumData = (
                <div>
                <div className="user-box"  onChange={ChangeHandler}><label>Email</label><input name ="email" type="text" /></div> 
                <div className="user-box"  onChange={ChangeHandler}><label>Name</label><input type="text"  name="name"/></div>
            </div>
            )
            break;    
        case 'Depositing':
            ForumData = (
                <div>
                <div className="user-box"  onChange={ChangeHandler}><label>Email</label><input type="text" name ="email"/></div> 
                <div className="user-box"  onChange={ChangeHandler}><label>Cash</label><input type="number" name="cash"/></div>
            </div>
            )  
        break;
        
        case 'Update':
            ForumData = (
                <div>
                <div className="user-box"  onChange={ChangeHandler}><label>Email</label><input type="text" name ="email"/></div> 
                <div className="user-box"  onChange={ChangeHandler}><label>Credit</label><input type="number"  name ="credit"/></div>
            </div>
            )  
        break;
        case 'transaction':
            ForumData = (
                <div>
                <div className="user-box"  onChange={ChangeHandler}><label>User</label><input type="text" name ="email"/></div> 
                <div className="user-box"  onChange={ChangeHandler}><label>TransferUser</label><input type="text" name ="email2"/></div> 
                <div className="user-box"  onChange={ChangeHandler}><label>Cash</label><input type="number" name ="cash"/></div>
            </div>
            )  
        break;

        }



    return (

        <div className="deposit_container">

            <div className="login-box">
                <form action="">
                  
                  {ForumData}

                    <a  href = '/add' onClick={ActiveDataAction}>



                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    Submit
                   </a>

                </form>
            </div>
            <div className="Actions">

                <div className="Buttons-container">
                    
                    <button className="skewBtn blue" value="Get" onClick={SetMode}>Get User</button>
                    <button className="skewBtn blue" value="Add" onClick={SetMode}>Add User</button>
                    <button className="skewBtn blue" value="Depositing" onClick={SetMode}>Depositing</button>
                    <button className="skewBtn blue" value="Update" onClick={SetMode}>Update Credit</button>
                    <button className="skewBtn blue" value="transaction" onClick={SetMode}>transaction</button>
                </div>

            </div>
        </div>
    )
}
