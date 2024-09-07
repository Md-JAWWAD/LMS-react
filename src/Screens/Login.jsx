import React, { useState } from 'react'
import LogoImg from '../assets/images/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Components/FirebaseConfig/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate('')

  const handleLogin =async () => {
    await signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential)=> {
      const uID = userCredential.user.uid;
      const getSingleData =await getDoc(doc(db, 'userName', uID))
      localStorage.setItem('userInfo', JSON.stringify(getSingleData.data()))
      localStorage.setItem('userId', uID)
      alert('Login Successfully..')
      navigate('/student/studentList', {replace: true})
    })
    .then((err) => console.log(err))
  }


  return (
    <div className='LoginPage'>
      <div className='Seminar-image'>
        <img src={LogoImg} alt="" height={70} width={70}/>
        <p>welcome to <br /> <span style={{backgroundColor: 'green' , color: 'white', padding: '5px', cursor: 'pointer'}}>learning management system</span></p>
        <div className='Seminar-bg'></div>
      </div>
      <div className='Auth-form'>
        <p className='Form-heading'>LOGIN</p>
       <p>
       <label htmlFor="Email">Email:</label> <br />
       <input onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" placeholder='Enter your email'/>
        </p> 
       <p>
       <label htmlFor="Email">Password:</label> <br />
       <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder='Enter your password'/>
       </p>
          <p style={{display: 'flex', justifyContent: 'space-between', fontSize: 14}}>
            <span><input type="checkbox" name="" id="" /> Remember me</span>
          </p>
          <button className='Submit-btn' onClick={handleLogin}>Login</button>
          <p style={{textAlign: 'center'}}>OR</p>
          <Link to='/signUp' style={{textAlign: 'center', color: '#016B1F' , textDecoration: 'none' , backgroundColor: 'lightgreen', padding: '0.6rem', borderRadius: '1rem'}}>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginPage
