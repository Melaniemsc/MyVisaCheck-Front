import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrl} from '../config'

export default function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/api/auth/login/`, formData);
            const token = data.token;

            localStorage.setItem('token', token);

            navigate('/summary')

        } catch (err) {
            toast.error(err.message)
        }
    }


    return (
        <div className="section">
            <div className="container">
                <h1 className="title dark-text">Login</h1>
                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label className="label dark-text">Email</label>
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
                        <label className="label dark-text">Password</label>
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

                    <button className="button">Submit</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}