import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    position: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://cybersec.onrender.com/admin/user');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:3005/admin/user', newUser);
      getUsers();
      setNewUser({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        position: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userId, updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3005/admin/${userId}`, updatedUser);
      const updatedUserIndex = users.findIndex((user) => user._id === userId);
      const updatedUsers = [...users];
      updatedUsers[updatedUserIndex] = response.data.user;
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3005/admin/${userId}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    if (editingUser) {
      setEditingUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      <h3>Create User</h3>
      <form onSubmit={createUser} className="user-form">
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={newUser.firstname}
            onChange={handleInputChange}
            className="user-input"
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={newUser.lastname}
            onChange={handleInputChange}
            className="user-input"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="user-input"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="user-input"
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={newUser.position}
            onChange={handleInputChange}
            className="user-input"
          />
        </label>
        <br />
        <button type="submit" className="user-button">
          Create
        </button>
      </form>

      <h3>User List</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="text"
                    name="firstname"
                    value={editingUser.firstname}
                    onChange={handleInputChange}
                    className="user-input"
                  />
                ) : (
                  user.firstname
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="text"
                    name="lastname"
                    value={editingUser.lastname}
                    onChange={handleInputChange}
                    className="user-input"
                  />
                ) : (
                  user.lastname
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={handleInputChange}
                    className="user-input"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="text"
                    name="position"
                    value={editingUser.position}
                    onChange={handleInputChange}
                    className="user-input"
                  />
                ) : (
                  user.position
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <>
                    <button className="save-button" onClick={() => updateUser(user._id, editingUser)}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEditUser(user)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete-button" onClick={() => deleteUser(user._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>
        {`
          .user-management-container {
            margin: 20px;
          }

          .user-form {
            display: flex;
            flex-direction: column;
            width: 300px;
            margin-bottom: 20px;
          }

          .user-form label {
            margin-bottom: 10px;
          }

          .user-input {
            padding: 6px;
            border: 1px solid #6495ed;
            border-radius: 4px;
            width: 100%;
          }

          .user-button {
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
          }

          .user-button:hover {
            background-color: #0056b3;
          }

          .user-table {
            border-collapse: collapse;
            width: 100%;
          }

          .user-table th,
          .user-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .save-button,
          .cancel-button,
          .edit-button,
          .delete-button {
            padding: 6px;
            border: none;
            cursor: pointer;
          }

          .save-button {
            background-color: #007bff;
            color: #fff;
          }

          .cancel-button {
            background-color: #dc3545;
            color: #fff;
          }

          .edit-button,
          .delete-button {
            background: none;
            border: none;
            cursor: pointer;
          }

          .edit-button:hover,
          .delete-button:hover {
            color: #007bff;
          }
        `}
      </style>
    </div>
  );
};

export default UserManagement;


