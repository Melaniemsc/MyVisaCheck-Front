import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
            const token = localStorage.getItem('token')
            const response = await axios.post('api/countries/', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data);
            
            toast.success('Country created successfully!', {
                onClose: () => navigate('/')
            });
        
    }


    return <div className="section">
        <div className="container">
            <h1 className="title">Add Country</h1>
            <form onSubmit={handleSubmit}>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'name'}
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Nationality</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'nationality'}
                            onChange={handleChange}
                            value={formData.nationality}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Flag</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'flag'}
                            onChange={handleChange}
                            value={formData.flag}
                        />
                    </div>
                </div>

                <button className="button">Submit</button>
                <ToastContainer />
            </form>
        </div>

    </div>
}