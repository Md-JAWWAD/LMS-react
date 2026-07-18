import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Components/FirebaseConfig/FirebaseConfig";
import InputFrom from "../../Components/Input/InputForm";
import { useNavigate } from "react-router-dom";
import { Radio } from '@mui/material';

const StudentRegistration = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [room, setRoom] = useState('') // ✅ Changed from 0 to empty string
  const [gender, setGender] = useState('') // ✅ Renamed from 'radio' to 'gender' for clarity
  const [loading, setLoading] = useState(false) // ✅ Added loading state
  const [error, setError] = useState('') // ✅ Added error state

  const navigate = useNavigate()

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }
  
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('')
    
    // ✅ Trim all inputs
    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()
    const trimmedEmail = email.trim()
    const trimmedRoom = room.toString().trim()
    
    // ✅ Validate all fields
    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedRoom || !gender) {
      setError('Please fill in all fields')
      return
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address')
      return
    }

    // ✅ Validate room number
    if (isNaN(trimmedRoom) || parseInt(trimmedRoom) <= 0) {
      setError('Please enter a valid class/room number')
      return
    }

    setLoading(true)

    try {
      // ✅ Prepare student data
      const studentData = {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        room: parseInt(trimmedRoom), // ✅ Convert to number
        gender: gender,
        createdAt: serverTimestamp(), // ✅ Add timestamp
        fullName: `${trimmedFirstName} ${trimmedLastName}`, // ✅ Add full name for convenience
        status: 'active' // ✅ Add status field
      }

      console.log('Attempting to add student:', studentData)

      // ✅ Add student to Firestore
      const docRef = await addDoc(collection(db, "studentRegister"), studentData)
      
      console.log('Student added successfully with ID:', docRef.id)
      
      // ✅ Show success message
      alert('Student Added Successfully! 🎉')
      
      // ✅ Reset form
      setFirstName('')
      setLastName('')
      setEmail('')
      setRoom('')
      setGender('')
      
      // ✅ Navigate to student list
      navigate('/student/studentList')
      
    } catch (error) {
      console.error('Error adding student:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      
      // ✅ Handle specific Firebase errors
      let errorMessage = 'Failed to add student. Please try again.'
      
      switch (error.code) {
        case 'permission-denied':
          errorMessage = 'Firebase permission error. Please check Firestore Security Rules.'
          console.error('🔴 PERMISSION DENIED: Check Firestore Security Rules!')
          break
        case 'unavailable':
          errorMessage = 'Service unavailable. Please try again later.'
          break
        case 'failed-precondition':
          errorMessage = 'Operation failed. Please check your data.'
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
    <div className="App">
      <Navbar/> 
      <div className="main_display">
        <Sidebar/>
        <form className='Content' onSubmit={handleSubmitRegister}>
          <div className='Regis_Form'>
            <p className='Form-heading'>Registration Form</p>
            
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
            
            <InputFrom 
              value={firstName}
              onchange={(e) => setFirstName(e.target.value)} 
              label='First Name:' 
              placeholder='Enter your first name' 
              type='text'
              disabled={loading}
              required
            />
            
            <InputFrom 
              value={lastName}
              onchange={(e) => setLastName(e.target.value)} 
              label='Last Name:' 
              placeholder='Enter your last name' 
              type='text'
              disabled={loading}
              required
            />
            
            <InputFrom 
              value={email}
              onchange={(e) => setEmail(e.target.value)} 
              label='Email:' 
              placeholder='Enter your email' 
              type='email'
              disabled={loading}
              required
            />
            
            <InputFrom 
              value={room}
              onchange={(e) => setRoom(e.target.value)} 
              label='Class/Room:' 
              placeholder='Enter your class number' 
              type='number'
              disabled={loading}
              required
            />
            
            <p>
              <label htmlFor="Gender" style={{color: '#016B1F', fontSize: 24, display: 'block', marginBottom: '10px'}}>
                Gender <span style={{color: 'red'}}>*</span>
              </label>
              
              <p style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <span>
                  <Radio 
                    checked={gender === 'Male'} 
                    onChange={handleGenderChange} 
                    value='Male' 
                    color="success"
                    disabled={loading}
                  />
                  <label htmlFor="Male" style={{marginLeft: '5px'}}>Male</label>
                </span>
                
                <span>
                  <Radio 
                    checked={gender === 'Female'} 
                    onChange={handleGenderChange} 
                    value='Female' 
                    color="success"
                    disabled={loading}
                  />
                  <label htmlFor="Female" style={{marginLeft: '5px'}}>Female</label>
                </span>
                
                <span>
                  <Radio 
                    checked={gender === 'Other'} 
                    onChange={handleGenderChange} 
                    value='Other' 
                    color="success"
                    disabled={loading}
                  />
                  <label htmlFor="Other" style={{marginLeft: '5px'}}>Other</label>
                </span>
              </p>
            </p>
            
            <button 
              type="submit"
              className='submit_btn' 
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
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              {loading ? 'Adding Student...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentRegistration
