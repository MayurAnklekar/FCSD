import React, { useState, useEffect } from 'react'
import './Home.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const {state} = useLocation();
    const {userId} = state;


    const loadData = async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/fruit/fetchDetails');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(()=>{
        loadData();
    },[])



    return (
        <div style={{marginTop:"150px"}}>

            <Link to={`/addFruit`} state={{adminId:userId}}>
                <button className='btn btn-contact'>Add Fruit</button>
            </Link>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>Fruit Id</th>
                        <th style={{textAlign:"center"}}>Name</th>
                        <th style={{textAlign:"center"}}>Price per Kg</th>
                        <th style={{textAlign:"center"}}>Remaining Quantity</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index)=>{
                        return(
                            <tr>
                                <td style={{textAlign:"center"}}>{d.fruitId}</td>
                                <td style={{textAlign:"center"}}>{d.nameOfFruit}</td>
                                <td style={{textAlign:"center"}}>{d.priceKg}</td>
                                <td style={{textAlign:"center"}}>{d.remaining}</td>
                                <td style={{textAlign:"center"}}>
                                
                                <Link to = {`/update/${d.fruitId}`} state={{adminId:userId}}>
                                    <button className='btn btn-edit'>Update</button>
                                </Link>
                                
                                    <button className='btn btn-delete'>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home