import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Button } from '@mui/material'
import DataTable from '../../Components/Table/Table'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Components/FirebaseConfig/FirebaseConfig'

const SyllabusList = () => {

  const [syllabusData, setSyllabusData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    handleGetSyllabus()
  }, [])

  const handleGetSyllabus =async () => {
    
    let getSyllabus =await getDocs(collection(db, 'syllabus&Class'))
    let arr=[];
    getSyllabus.forEach((doc)=>{
      arr.push({...doc.data(), id: doc.id})
    })
    setSyllabusData(arr)
  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'syllabusAdd', headerName: 'Subject Name', width: 130 },
    { field: 'syllabusClass', headerName: 'Class', type: 'number', width: 130 },
    { field: 'pdf', headerName: 'Download', width: 150,},
  ]
  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className='Content'>
    <div className='Content_Data'>
   <p className='Form-heading'>Syllabus List</p>
   <p className="add_btn_parent"><Button variant="contained" className="add_btn" onClick={() => navigate('/syllabus/syllabusForm')}>Add</Button></p>
   <div className="content_table">
    <DataTable dataRow={syllabusData} dataColumn={columns}/>
   </div>
    </div>
   </div>
   </div>
</div>
  )
}

export default SyllabusList
