import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrl} from '../config'



export default function AddCountry() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        nationality: '',
        flag: '',
    })

    function handleChange(e){
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(`${baseUrl}/api/countries/`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data);
            
            toast.success('Country created successfully!', {
                onClose: () => navigate('/')
            });
        } catch (error) {
            console.error('Error creating country:', error);
            toast.error('Failed to create country. Please try again.');
        }
    }


    return (
        <div className="section cream-background">
            <div className="container">
                <h1 className="title dark-text">Add Country</h1>
                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label className="label dark-text">Name</label>
                        <div className="control">
                            <input
                                className="input dark-text"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label dark-text">Nationality</label>
                        <div className="control">
                            <input
                                className="input dark-text"
                                type="text"
                                name="nationality"
                                onChange={handleChange}
                                value={formData.nationality}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label dark-text">Flag</label>
                        <div className="control">
                            <input
                                className="input dark-text"
                                type="text"
                                name="flag"
                                onChange={handleChange}
                                value={formData.flag}
                                required
                            />
                        </div>
                    </div>

                    <button className="button is-primary">Submit</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}