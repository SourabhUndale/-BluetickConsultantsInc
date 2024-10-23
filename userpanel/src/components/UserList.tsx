import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setIsAdding(false);
  };

  // Handle editing an existing user
  const handleEditUser = (editedUser: User) => {
    setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
    setIsEditing(false);
    setSelectedUserIndex(null);
  };

  // Handle deleting a user
  const handleDeleteUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="user-list-container">
      <h1>User Management</h1>
      <button  className="add-user-btn"  onClick={() => setIsAdding(true)}>Add New User</button>

      <div className="user-card-container">
        {users.map((user, index) => (
          <div key={user.id} className="user-card">
            <h2>{user.first_name} {user.last_name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Marital Status:</strong> {user.marital_status}</p>
            <p><strong>Employed:</strong> {user.is_employed ? 'Yes' : 'No'}</p>
            <p><strong>Founder:</strong> {user.is_founder ? 'Yes' : 'No'}</p>
            <div className="user-card-actions">
              <button onClick={() => { setSelectedUserIndex(index); setIsEditing(true); }}>Edit</button>
              <button onClick={() => handleDeleteUser(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* User Form for Adding */}
      {isAdding && (
        <UserForm onSave={handleAddUser} onClose={() => setIsAdding(false)} />
      )}

      {/* User Form for Editing */}
      {isEditing && selectedUserIndex !== null && (
        <UserForm
          user={users[selectedUserIndex]}
          onSave={handleEditUser}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default UserList;
