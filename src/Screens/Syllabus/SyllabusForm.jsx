import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Components/FirebaseConfig/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import InputFrom from '../../Components/Input/InputForm'
import { MdOutlineUploadFile } from 'react-icons/md'

const SyllabusForm = () => {

  const [syllabusAdd, setSyllabusAdd] = useState('')
  const [syllabusClass, setSyllabusClass] = useState('')

  const navigate = useNavigate()

  const syllabusObj = {
    syllabusAdd, 
    syllabusClass
  }

  const handleSyllabus =async (e) => {
    e.preventDefault();
    if(syllabusAdd.trim() === '' || syllabusClass.trim() === ''){
      alert('Please Fill all inputs..')
    }
    else{
      try {
        const syllabusAndClass =await addDoc(collection(db, 'syllabus&Class'), syllabusObj)
        .then((res) => {
          alert('Syllabus add in list')
          navigate('/syllabus/syllabusList')
        })
        .catch((err) => console.log(err))
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
   <form className="Content">
   <div className='Regis_Form'>
   <p className='Form-heading'>Syllabus Add</p>
   <InputFrom onchange = {(e) => setSyllabusAdd(e.target.value)} label='Subject Name:' placeholder='Enter your subject name' type='text'/>
   <InputFrom onchange = {(e) => setSyllabusClass(e.target.value)} label='Class:' placeholder='Enter your class' type='number'/>

       <button className='submit_btn'> <MdOutlineUploadFile size={24}/> Upload PDF</button>
       <button className='submit_btn' onClick={handleSyllabus}>Add</button>
   </div>
   </form>
   </div>
</div>
  )
}

export default SyllabusForm
