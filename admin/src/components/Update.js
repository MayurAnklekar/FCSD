import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './Update.css'
import { useNavigate } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [remaining, setRemaining] = useState('');
    const {state} = useLocation();
    const {adminId} = state;

    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`http://localhost:5000/fruit/getDetailsById/${id}`)
            .then((res) => {
                console.log(res);
                setName(res.data[0].nameOfFruit);
                setPrice(res.data[0].priceKg);
                setRemaining(res.data[0].remaining);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(adminId);
        if (!name || !price || !remaining) {
            toast.error('Please fill all the fields');
            return;
        }
        else {
            const data = {
                fruitName: name,
                price: price,
                remaining: remaining,
                adminId: adminId
            }
            if (!id) {
                axios.post(`http://localhost:5000/fruit/addFruit`, data)
                    .then((res) => {
                        console.log(res);
                        setName('');
                        setPrice('');
                        setRemaining('');

                        toast.success('Fruit Updated Successfully');
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error('Something went wrong');
                    })
            }
            else{
                axios.put(`http://localhost:5000/fruit/update/${id}`, data)
                    .then((res) => {
                        console.log(res);
                        setName('');
                        setPrice('');
                        setRemaining('');

                        toast.success('Fruit Updated Successfully');
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error('Something went wrong');
                    })
            }

            setTimeout(() => {
                navigate('/dashboard', { state: { userId: adminId } });
            }, 1000);
        }
    }

    return (
        <div
            style={{
                marginTop: "150px"
            }}>

            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
            }}
                onSubmit={handleSubmit}
            >

                <label htmlFor='name'>Name</label>

                <input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='price'>Price/Kg</label>

                <input
                    type='text'
                    name='price'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />


                <label htmlFor='remaining'>Remaining Quantity</label>

                <input
                    type='text'
                    name='remaining'
                    id='remaining'
                    value={remaining}
                    onChange={(e) => setRemaining(e.target.value)}
                />

                <button type='submit' className='btn btn-edit'>{id ? (<>Update</>) : (<>Save</>)}</button>
            </form>

        </div>
    )
}

export default Update