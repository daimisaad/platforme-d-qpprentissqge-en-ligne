import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect (() => {
    axios.get('http://127.0.0.1:8000/api/users')
     .then(response => setUsers(response.data))
     .catch(error => console.error(error));
  }, []);
  
  return (
<>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {users.length > 0 && users.map((user) =><tr>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    </tr>)}
  </tbody>
</table>
</>
  )
}

export default App
