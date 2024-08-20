import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { Link } from 'react-router-dom';
import "./user.css"

const User = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    }

    fetchData();
  }, [])

  const deleteUser = async (userID) => {
    await axios.delete(`http://localhost:8000/api/delete/${userID}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userID))
        toast.success(response.data.msg, { position: 'top-right' })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className='addButton' onClick={() => deleteUser(user._id)}>Delete</button>
                    <Link className='addButton' to={`/edit/` + user._id}>
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default User