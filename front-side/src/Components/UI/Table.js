import React, { useState, useEffect } from 'react'


export default function Table(props) {
    

    console.log(props.Users)
    return (
        <div className="table-wrapper">

        <table className="fl-table">
        <thead>
            <tr>
                <th><h1>Email</h1></th>
                <th><h1>Name</h1></th>
                <th><h1>Cash</h1></th>
                <th><h1>Credit</h1></th>
            </tr>
        </thead>
        <tbody>
        {
            props.Users.map((p,index) =>{
                                
                return <tr key={index}>
                    <td>{p.email}</td>
                    <td>{p.name}</td>
                    <td>{p.cash}</td>
                    <td>{p.credit}</td>
                    </tr>
            })
        }      
        </tbody>
    </table>
    </div>
    )
}
