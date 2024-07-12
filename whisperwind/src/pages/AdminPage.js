import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPreferences, setNewPreferences] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackImageUrl, setNewTrackImageUrl] = useState('');
  const [newTrackAudioUrl, setNewTrackAudioUrl] = useState('');
  const [newTrackCategoryName, setNewTrackCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeSection, setActiveSection] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate('/not-authorized');
        } else {
          console.error('Error fetching users', error);
        }
      }
    };

    const fetchTracks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tracks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('API Response:', response.data);
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching tracks', error);
      }
    };

    const fetchCategories = () => {
      const categories = [
        'Relaxing Waves', 'Gentle Rain', 'Forest Sounds', 'Mountain Stream', 
        'Bird Chirping', 'Ocean Breeze', 'Thunderstorm', 'Night Sounds', 
        'River Flow', 'Wind Blowing', 'Crackling Fire', 'Soft Piano', 
        'Tapping', 'Whispering', 'Brushing', 'Typing', 'Mouth Sounds', 
        'Hair Cutting'
      ];
      setCategories(categories);
    };

    fetchUsers();
    fetchTracks();
    fetchCategories();
  }, [navigate]);

  const handleEditClick = (user) => {
    setEditUser(user);
    setNewUsername(user.username);
    setNewEmail(user.email);
    setNewPreferences(user.preferences || '');
  };

  const handleDeleteClick = async (userId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/users/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', newUsername);
    formData.append('email', newEmail);
    formData.append('preferences', newPreferences);
    if (newAvatar) {
      formData.append('avatar', newAvatar);
    }

    await axios.put(`http://localhost:5000/api/users/admin/users/${editUser.id}`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });

    const updatedUser = {
      id: editUser.id,
      username: newUsername,
      email: newEmail,
      avatar: newAvatar ? URL.createObjectURL(newAvatar) : editUser.avatar,
      preferences: newPreferences,
    };

    setUsers(users.map((user) => (user.id === editUser.id ? updatedUser : user)));
    setEditUser(null);
  };

  const handleAddTrack = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newTrack = {
      title: newTrackTitle,
      imageUrl: newTrackImageUrl,
      audioUrl: newTrackAudioUrl,
      categoryName: newTrackCategoryName,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/tracks/add-to-category', newTrack, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks([...tracks, response.data]);
      alert('Track added successfully');
    } catch (error) {
      console.error('Error updating CategoryPage.js:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-menu">
        <button onClick={() => setActiveSection('users')}>User Management</button>
        <button onClick={() => setActiveSection('tracks')}>Track Management</button>
      </div>
      {activeSection === 'users' && (
        <>
          <h2>User Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editUser && (
            <div className="edit-user-modal">
              <h3>Edit User</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
                <label>
                  Username:
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </label>
                <label>
                  Preferences:
                  <input
                    type="text"
                    value={newPreferences}
                    onChange={(e) => setNewPreferences(e.target.value)}
                  />
                </label>
                <label>
                  Avatar:
                  <input
                    type="file"
                    onChange={(e) => setNewAvatar(e.target.files[0])}
                  />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
              </form>
            </div>
          )}
        </>
      )}
      {activeSection === 'tracks' && (
        <>
          <h2>Track Management</h2>
          <form onSubmit={handleAddTrack}>
            <label>
              Title:
              <input type="text" value={newTrackTitle} onChange={(e) => setNewTrackTitle(e.target.value)} />
            </label>
            <label>
              Image URL:
              <input type="text" value={newTrackImageUrl} onChange={(e) => setNewTrackImageUrl(e.target.value)} />
            </label>
            <label>
              Audio URL:
              <input type="text" value={newTrackAudioUrl} onChange={(e) => setNewTrackAudioUrl(e.target.value)} />
            </label>
            <label>
              Category Name:
              <select value={newTrackCategoryName} onChange={(e) => setNewTrackCategoryName(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <button type="submit">Add Track</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AdminPage;
