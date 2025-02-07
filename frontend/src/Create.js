import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleSubmit (event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', {name, email, password})
        .then(res => {
            console.log(res);
            navigate('/users');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter name' className='form-control'
                    onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type='email' placeholder='Enter email' className='form-control'
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Password</label>
                    <input type='password' placeholder='Enter password' className='form-control'
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create