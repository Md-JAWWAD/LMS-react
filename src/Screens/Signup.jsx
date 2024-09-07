import React, { useState } from 'react'
import LogoImg from '../assets/images/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import {auth, db} from '../Components/FirebaseConfig/FirebaseConfig'

const SignUpPage = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate('')

  const userAuth = {
    email,
    password
  }
  const userInfo = {
    firstName,
    lastName,
    email
  }

  const handleSubmitUser =async () => {
    
       // store in Data base
       if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === ''){
        alert('Please Fill All input')
       }
       else{
         //  Authentication
         createUserWithEmailAndPassword(auth, email, password)
         .then(async(userCredential) => {
          const uID = userCredential.user.uid;
           const userNames =await setDoc(doc(db, 'userName', uID),userInfo)
           alert('Sign Up Successfully..')
           navigate('/')
          })
          .catch((err) => console.log('error', err))
       }
  }

  return (
    <div className='SignUpPage'>
      <div className='Seminar-image'>
      <img src={LogoImg} alt="" height={70} width={70}/>
      <p>welcome to <br /> <span style={{backgroundColor: 'green' , color: 'white', padding: '5px', cursor: 'pointer'}}>learning management system</span></p>
      <div className='Seminar-bg'></div>
      </div>
      <div className='Auth-form'>
        <p className='Form-heading'>SIGN UP</p>
       <p>
       <label htmlFor="name">First Name:</label> <br />
       <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="" id="" placeholder='Enter your first name' required/>
        </p> 
       <p>
       <label htmlFor="name">Last Name:</label> <br />
       <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="" id="" placeholder='Enter your last name' required/>
       </p>
       <p>
       <label htmlFor="email">Email:</label> <br />
       <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="" id="" placeholder='Enter your email' required/>
        </p> 
       <p>
       <label htmlFor="password">Password:</label> <br />
       <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder='Enter your password' required/>
       </p>
          <button className='Submit-btn' onClick={handleSubmitUser}>Sign Up</button>
          <p style={{textAlign: 'center'}}>OR</p>
          <Link to='/' style={{textAlign: 'center', color: '#016B1F' , textDecoration: 'none' , backgroundColor: 'lightgreen', padding: '0.6rem', borderRadius: '1rem'}}>Already Signup?</Link>
      </div>
    </div>
  )
}

export default SignUpPage
