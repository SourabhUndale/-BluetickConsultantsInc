import React, { useState } from 'react';

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

interface UserFormProps {
  user?: User;
  onSave: (user: User) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState<User>(
    user || {
      id: Date.now(),
      first_name: '',
      last_name: '',
      username: '',
      age: 0,
      marital_status: '',
      is_employed: false,
      is_founder: false,
     
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value; // Handle checkbox for boolean fields
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="user-form">
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Marital Status:</label>
        <input
          type="text"
          name="marital_status"
          value={formData.marital_status}
          onChange={handleChange}
          required
        />
        <label>
          Employed:
          <input
            type="checkbox"
            name="is_employed"
            checked={formData.is_employed}
            onChange={handleChange}
          />
        </label>

        <label>
          Founder:
          <input
            type="checkbox"
            name="is_founder"
            checked={formData.is_founder}
            onChange={handleChange}
          />
        </label>

        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
