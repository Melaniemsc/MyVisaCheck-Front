import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrl} from '../config'

export default function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`${baseUrl}/api/auth/register/`, formData)
            toast.success('Signup was successful!', {
                onClose: () => navigate('/login')
            });
        } catch (err) {
            toast.error(err.message)
        }
    }

    return <div className="section">
        <div className="container">
        <ToastContainer />
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'username'}
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'first_name'}
                            onChange={handleChange}
                            value={formData.first_name}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'last_name'}
                            onChange={handleChange}
                            value={formData.last_name}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'password'}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'password_confirmation'}
                            onChange={handleChange}
                            value={formData.password_confirmation}
                        />
                    </div>
                </div>

                <button className="button">Submit</button>
            </form>
        </div>
    </div>
}