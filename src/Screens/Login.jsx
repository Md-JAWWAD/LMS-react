import React, { useState } from 'react'
import LogoImg from '../assets/images/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Components/FirebaseConfig/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // ✅ Added loading state
  const [error, setError] = useState('') // ✅ Added error state
  const [rememberMe, setRememberMe] = useState(false) // ✅ Added remember me state

  const navigate = useNavigate() // ✅ Fixed: removed empty string

  const handleLogin = async (e) => {
    e.preventDefault() // ✅ Prevent form default behavior
    
    // Clear previous errors
    setError('')
    
    // ✅ Validate inputs
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    
    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)

    try {
      console.log('Attempting login with email:', trimmedEmail)
      
      // ✅ Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        trimmedEmail, 
        trimmedPassword
      )
      
      const uID = userCredential.user.uid
      console.log('Login successful! User ID:', uID)
      
      // ✅ Get user data from Firestore (fixed collection name)
      const userDocRef = doc(db, 'users', uID) // ✅ Changed from 'userName' to 'users'
      const userDoc = await getDoc(userDocRef)
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        console.log('User data retrieved:', userData)
        
        // ✅ Store user data in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userData))
        localStorage.setItem('userId', uID)
        
        // ✅ Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
          localStorage.setItem('userEmail', trimmedEmail)
        } else {
          localStorage.removeItem('rememberMe')
          localStorage.removeItem('userEmail')
        }
        
        alert('Login Successful! 🎉')
        
        // ✅ Navigate to student list
        navigate('/student/studentList', { replace: true })
      } else {
        // ✅ Handle case where user data doesn't exist
        setError('User data not found. Please contact support.')
        console.error('No user document found for UID:', uID)
      }
      
    } catch (error) {
      console.error('Login error details:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      
      // ✅ Handle specific Firebase errors with user-friendly messages
      let errorMessage = 'Login failed. Please try again.'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please sign up first.'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format. Please check and try again.'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.'
          break
        case 'permission-denied':
          errorMessage = 'Firebase permission error. Please check Firestore Security Rules.'
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

  // ✅ Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('userEmail')
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  return (
    <div className='LoginPage'>
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
        <p className='Form-heading'>LOGIN</p>
        
        {/* ✅ Show error message */}
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            textAlign: 'center',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}> {/* ✅ Added form */}
          <p>
            <label htmlFor="email">Email:</label> <br />
            <input 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" // ✅ Changed from text to email
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
          
          <p style={{display: 'flex', justifyContent: 'space-between', fontSize: 14}}>
            <span>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              /> 
              Remember me
            </span>
            <Link to="/forgot-password" style={{color: '#016B1F'}}>
              Forgot Password?
            </Link>
          </p>
          
          <button 
            type="submit" // ✅ Changed to type="submit"
            className='Submit-btn' 
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              width: '100%',
              padding: '12px',
              backgroundColor: '#016B1F',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '15px'}}>OR</p>
        
        <Link 
          to='/signUp'
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
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
