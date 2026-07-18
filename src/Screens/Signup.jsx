import React, { useState } from 'react'
import LogoImg from '../assets/images/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'  // ✅ Removed unused imports
import { auth, db } from '../Components/FirebaseConfig/FirebaseConfig'

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // ✅ Added loading state

  const navigate = useNavigate() // ✅ Fixed: removed empty string

  const handleSubmitUser = async () => {
    // ✅ Trim all inputs for validation
    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    // ✅ Validate all fields
    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedPassword) {
      alert('Please fill in all fields')
      return // ✅ Stop execution if validation fails
    }

    // ✅ Password strength validation (optional but recommended)
    if (trimmedPassword.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    setLoading(true) // ✅ Show loading state

    try {
      // ✅ Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        trimmedEmail, 
        trimmedPassword
      )
      
      const uID = userCredential.user.uid
      
      // ✅ Store user info in Firestore
      const userInfo = {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        createdAt: new Date().toISOString(), // ✅ Added timestamp
        uid: uID // ✅ Store uid for reference
      }

      await setDoc(doc(db, 'users', uID), userInfo) // ✅ Changed collection name to 'users'
      
      alert('Sign Up Successful!')
      navigate('/login') // ✅ Navigate to login page instead of home
      
    } catch (error) {
      console.error('Signup error:', error)
      
      // ✅ User-friendly error messages
      let errorMessage = 'Signup failed. Please try again.'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please login instead.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use at least 6 characters.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please check and try again.'
      }
      alert(errorMessage)
      
    } finally {
      setLoading(false) // ✅ Reset loading state
    }
  }

  return (
    <div className='SignUpPage'>
      <div className='Seminar-image'>
        <img src={LogoImg} alt="Logo" height={70} width={70}/>
        <p>
          welcome to <br /> 
          <span style={{
            backgroundColor: 'green', 
            color: 'white', 
            padding: '5px', 
            cursor: 'pointer'
          }}>
            learning management system
          </span>
        </p>
        <div className='Seminar-bg'></div>
      </div>
      
      <div className='Auth-form'>
        <p className='Form-heading'>SIGN UP</p>
        
        <p>
          <label htmlFor="firstName">First Name:</label> <br />
          <input 
            id="firstName" // ✅ Added id for accessibility
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            type="text" 
            placeholder='Enter your first name' 
            required
            disabled={loading} // ✅ Disable during loading
          />
        </p>
        
        <p>
          <label htmlFor="lastName">Last Name:</label> <br />
          <input 
            id="lastName"
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            type="text" 
            placeholder='Enter your last name' 
            required
            disabled={loading}
          />
        </p>
        
        <p>
          <label htmlFor="email">Email:</label> <br />
          <input 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder='Enter your email' 
            required
            disabled={loading}
          />
        </p>
        
        <p>
          <label htmlFor="password">Password:</label> <br />
          <input 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder='Enter your password' 
            required
            disabled={loading}
          />
        </p>
        
        <button 
          className='Submit-btn' 
          onClick={handleSubmitUser}
          disabled={loading} // ✅ Disable during loading
        >
          {loading ? 'Signing Up...' : 'Sign Up'} {/* ✅ Show loading text */}
        </button>
        
        <p style={{textAlign: 'center'}}>OR</p>
        
        <Link 
          to='/login'  // ✅ Changed from '/' to '/login'
          style={{
            textAlign: 'center', 
            color: '#016B1F', 
            textDecoration: 'none', 
            backgroundColor: 'lightgreen', 
            padding: '0.6rem', 
            borderRadius: '1rem',
            display: 'block' // ✅ Better styling
          }}
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage
