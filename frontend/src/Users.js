import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Users() {

    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/users')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8081/users/'+id)
            window.location.reload()
        } catch (err){
            console.log(err);
        }
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <Link to="/create" className='btn btn-success'>Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data, i) => (
                            <tr key={i}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.pwd}</td>
                                <td>
                                    <Link to={`/update/${data.id_user}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.id_user)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users