import React, { useState, useEffect } from 'react';
import NavBar from "../src/components/NavBar"
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Service } from './components/Service';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  interface User {
    _id: string;
    name: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // CREATE or UPDATE
  const handleSubmit =  async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
     const url = editingUserId ? `http://localhost:3000/api/user/${editingUserId}` : 'http://localhost:3000/api/users';
     const method = editingUserId ? 'PUT' : 'POST';
         const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
 
       if(response.ok){
        const data= await response.json()
        if(editingUserId){
          setUsers((prev) => prev.map((user) => user._id == editingUserId? data.user : user))
          alert('updated users sucessfully')
        }else {
          setUsers((prev) => [...prev,data.user])
          alert('created users sucessfully')
        }
         setName(""),
         setEmail(""),
         setEditingUserId(null)
       }else {
         console.log('failed save the users')
       }
    }catch(error){
       console.log('getting error while creating the users')
    }
  }
 // READ
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (showDetails) {
      fetchUsers();
    }
  }, [showDetails]);

  // DELETE
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        alert('User deleted');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  // START EDITING
  const handleEdit = (user: User) => {
    setEditingUserId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const toggleUsers = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div>
      <div>
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
      </div>
      
      <div>
        <h3>User Deatils</h3>
        <button onClick={toggleUsers}>{showDetails ? 'Show Deatils':'Show Deatils'}</button>
        {showDetails && (
          users.length === 0 ? (
            <div>
              <p>No Users Found</p>
            </div>
          ):(
            <div>
              {users.map((user) =>(
                <div key={user._id}>
                  <p><strong>{user.name} :</strong> {user.email}</p>
                   <button onClick={() => handleEdit(user)} style={{ marginLeft: '10px' }}>
                     Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                </div>
                
              ) )}
            </div>
          )
        )}
      </div>
      <h3>{editingUserId ? 'Update Users': 'Create Users' }</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) =>setName(e.target.value)}/>
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <button type="submit">{editingUserId ? 'Update' :'Submit'}</button>
          {editingUserId && (
            <button onClick={() => {setEditingUserId(null),setName(''),setEmail('')}}>Cancel</button>
          )}
        </form>
      </div>

    </div>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "../src/components/NavBar";
// import { Home } from "../src/components/Home";
// import { About } from "../src/components/About";
// import { Service } from "../src/components/Service";
// import { Contact } from "../src/components/Contact";

// function App() {
//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/About" element={<About />} />
//         <Route path="/Service" element={<Service />} />
//         <Route path="/Contact" element={<Contact />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


