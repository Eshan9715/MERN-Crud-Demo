import React, {useState, useEffect} from 'react';
import "./App.css"
import Axios from "axios"

function App() {
  const[name, setName] = useState('');
  const[age, setAge] = useState('');
  const[username, setUsername] = useState('');

  const[userlist, setUserlist] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:8070/getUsers").then((response)=>{
      setUserlist(response.data)
    })

  },[])
  
  const handleBtn = ()=>{
    console.log(name + age + username)
    Axios.post("http://localhost:8070/createUser",
    {
      name:name,
      age:age,
      username:username
    }).then(()=>{
      setUserlist([...userlist,{name:name, age:age, username:username}])
    })
  }

  const updateUser = (id)=>{
    const newAge = prompt("Enter new age")
    const newUsername = prompt("Enter new username")

    Axios.put("http://localhost:8070/updateUser",
    {
      newAge : newAge,
      newUsername : newUsername,
      id:id
    }).then(()=>{
      setUserlist(userlist.map((val)=>{
        return val._id === id ? {_id:id,name: val.name, age:newAge, username:newUsername} : val;
      }))
    })

  }

  const deleteUser = (id)=>{
    Axios.delete("http://localhost:8070/delete/${id}").then(()=>{
      setUserlist(userlist.filter((val)=>{
        return val._id = id;
      }))
    })

  }

  return (
    <>
      <h1>Mern Crud App</h1>
      <div className='App'>
        <div className='left'>
          <label>Name</label>
          <input type='text' onChange ={(e)=>{
              setName(e.target.value)
          }}/>
          <label>Age</label>
          <input type='number' onChange ={(e)=>{
              setAge(e.target.value)
          }}/>
          <label>Userame</label>
          <input type='text' onChange ={(e)=>{
              setUsername(e.target.value)
          }}/>
          <button onClick={handleBtn}>Submit</button>
        </div>
        <div className='right'>
          <table>
            <thead>
              <th>Name</th>
              <th>Age</th>
              <th>Username</th>
            </thead>
            <tbody>
              {userlist.map((user,key)=>{
                return <tr key={key}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.username}</td>
                  <td><button onClick={updateUser(user._id)}>Edit</button></td>
                  <td><button onClick={deleteUser(user._id)}>Delete</button></td>

                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
      
     )
}

export default App;


