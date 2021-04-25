import React, { useState, useEffect } from 'react'
import './App.css';
import './animation.css'
import Axios from 'axios'
import Table from './Components/UI/Table'
import SnowFlex from './Components/UI/SnowFlex'
import DepositPage from './Components/pages/deposit'

function App() {
  
  const [users,SetUsers] = useState([])

  useEffect(() =>{
  
  const request = async () =>{
    let Data = await Axios.get('http://localhost:5000/') 
    SetUsers(Data.data)
  }

  request()


  },[])


  return (
    <div className="App">
      
      {/* <Table Users = {users}></Table> */}
      <DepositPage></DepositPage>
      <SnowFlex></SnowFlex>
    </div>
  );
}

export default App;
