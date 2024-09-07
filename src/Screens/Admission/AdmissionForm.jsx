import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import InputFrom from '../../Components/Input/InputForm'
import { Radio } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Components/FirebaseConfig/FirebaseConfig'

const AdmissionForm = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [birth, setBirth] = useState(0)
  const [qualification, setQualification] = useState('')
  const [radio, setRadio] = useState('')

  const navigate = useNavigate()
  
  const classObj = {
    firstName,
    lastName,
    email,
    phone,
    birth,
    qualification,
    radio
  }
  
  const handleRadioValue = (e) => {
    setRadio(e.target.value)
  }
  
  const handleCLassAdmission =async (e) => {
    e.preventDefault();
    
  if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || radio === '' || qualification.trim === '' || birth === 0 || phone === 0){
    alert('Please fill all the fields')
   }
   else{
     try {
       const classAdmission =await addDoc(collection(db, "AdmissionForm"), classObj)
       .then((res) => {
         console.log(res)
         alert('Admission Add in list')
         navigate('/class/classList')
       })
     } catch (error) {
       console.log('error', error)
     }
   }
  }



  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <form className='Content'>
          <div className='Regis_Form'>
          <p className='Form-heading'>Registration Form</p>
          <InputFrom onchange = {(e) => setFirstName(e.target.value)} label='First Name:' placeholder='Enter your first Name' type='text'/>
          <InputFrom onchange = {(e) => setLastName(e.target.value)} label='Last Name:' placeholder='Enter your last name' type='text'/>
          <InputFrom onchange = {(e) => setEmail(e.target.value)} label='Email:' placeholder='Enter your email' type='email'/>
          <InputFrom onchange = {(e) => setPhone(e.target.value)} label='PhoneNumber:' placeholder='Enter your phone number' type='number'/>
          <InputFrom onchange = {(e) => setBirth(e.target.value)} label='Date Of Birth:' type='date'/>
          <InputFrom onchange = {(e) => setQualification(e.target.value)} label='Qualification:' placeholder='Enter your Qualification' type='text'/>
          <p>
        <label htmlFor="Gender" style={{color: '#016B1F', fontSize: 24}}>Gender</label>
        <p>
          <Radio checked={radio === 'Male'} onChange={handleRadioValue} value='Male' color="success"/>
          <label htmlFor="Male">Male</label>
        </p>
        <p>
          <Radio checked={radio === 'Female'} onChange={handleRadioValue} value='Female' color="success"/>
          <label htmlFor="Female">Female</label>
        </p>
       </p>
          <button className='submit_btn' onClick={handleCLassAdmission}>Submit</button>
          </div>
        </form>
   </div>
</div>
  )
}

export default AdmissionForm
