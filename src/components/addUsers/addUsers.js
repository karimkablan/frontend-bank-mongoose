import React,{useState,useRef} from 'react'
import isEmail from 'validator/lib/isEmail';
import './addUsers.css';
import axios from 'axios'

const AddUsers =()=> {


const refMessage = useRef()

 const [user, setUser] = useState({
     name : '',
     email : '',
     credit: '0',
     cash: '0',
     acountId: '',
     password: ''
  })
  console.log(user);

const inputHandler = (e)=>{
 refMessage.current.innerHTML = ""
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
    console.log(user);
}

const addNewUser =  ()=>{
    if(isEmail(`${user.email}`) && user.name.length > 1 && user.acountId.toString().length === 6 && user.credit >= 0 && user.cash >= 0){
    axios.post(`http://localhost:5001/api/users/`,user).then(refMessage.current.innerHTML = "").catch((err)=>{
    console.log(err);
    refMessage.current.innerHTML = "user exists"
})

refMessage.current.innerHTML = "Add successfully"
} 
else{refMessage.current.innerHTML = "Please enter valid values"}
}

    return (
        <div className="div-addUsers">
            name : 
            <input type="text" onChange={inputHandler}  name="name"  value={user.name}  placeholder="Enter Name" /> <br/><br/>
            email:
            <input type="email" onChange={inputHandler} name="email" value={user.email} placeholder="Enter Email"/><br/><br/>
            Account Number:
            <input type="number" onChange={inputHandler} name="acountId" min="0" value={user.acountId} placeholder="Enter Account Number"/><br/><br/>
            credit:
            <input type="number" onChange={inputHandler} name="credit" min="0" value={user.credit}/><br/><br/>
            cash:
            <input type="number" onChange={inputHandler} name="cash" min="0" value={user.cash}/><br/><br/>
            password:
            <input type="password" onChange={inputHandler} name="password" min="0" value={user.password}/><br/><br/>
            <input type="button" onClick={addNewUser} value='ADD' />
            <div className="msg" ref={refMessage}></div>
        </div>
    )
}

export default AddUsers;
