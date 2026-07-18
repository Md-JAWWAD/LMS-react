import React, { useState } from 'react'
import LogoImg from '../assets/images/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../Components/FirebaseConfig/FirebaseConfig'

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('') // ✅ Added error state

  const navigate = useNavigate()

  const handleSubmitUser = async (e) => {
    e.preventDefault() // ✅ Prevent form default behavior
    
    // Clear previous errors
    setError('')

    // Trim all inputs
    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    // Validation
    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedPassword) {
      setError('Please fill in all fields')
      return
    }

    if (trimmedPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      console.log('Attempting to create user with email:', trimmedEmail)
      
      // Step 1: Create user authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      )
      
      console.log('User created successfully:', userCredential.user.uid)
      
      const uID = userCredential.user.uid
      
      // Step 2: Store user data in Firestore
      const userInfo = {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        createdAt: serverTimestamp(), // ✅ Use Firestore server timestamp
        uid: uID,
        role: 'student' // ✅ Add default role
      }

      console.log('Attempting to save user data to Firestore...')
      
      // ✅ Use setDoc with merge option for safety
      await setDoc(doc(db, 'users', uID), userInfo, { merge: true })
      
      console.log('User data saved successfully!')
      
      // ✅ Show success message
      alert('Account created successfully! Please login.')
      
      // ✅ Navigate to login
      navigate('/login')
      
    } catch (error) {
      console.error('Signup error details:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      
      // ✅ Handle specific Firebase errors
      let errorMessage = 'Signup failed. Please try again.'
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please login instead.'
          break
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Use at least 6 characters.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address. Please check and try again.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.'
          break
        case 'permission-denied':
          errorMessage = 'Firebase permission error. Please contact support.'
          console.error('🔴 PERMISSION DENIED: Check Firestore Security Rules!')
          break
        default:
          errorMessage = `Error: ${error.message}`
      }
      
      setError(errorMessage)
      
    } finally {
      setLoading(false)
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
        
        {/* ✅ Show error message */}
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmitUser}> {/* ✅ Added form */}
          <p>
            <label htmlFor="firstName">First Name:</label> <br />
            <input 
              id="firstName"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              type="text" 
              placeholder='Enter your first name' 
              required
              disabled={loading}
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
              placeholder='Enter your password (min 6 characters)' 
              required
              disabled={loading}
              minLength="6"
            />
          </p>
          
          <button 
            type="submit" // ✅ Changed to type="submit"
            className='Submit-btn' 
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <p style={{textAlign: 'center'}}>OR</p>
        
        <Link 
          to='/login'
          style={{
            textAlign: 'center', 
            color: '#016B1F', 
            textDecoration: 'none', 
            backgroundColor: 'lightgreen', 
            padding: '0.6rem', 
            borderRadius: '1rem',
            display: 'block'
          }}
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage
