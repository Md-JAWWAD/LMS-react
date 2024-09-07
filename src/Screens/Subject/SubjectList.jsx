import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../Components/Table/Table'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Components/FirebaseConfig/FirebaseConfig'

const SubjectList = () => {

  const [subjectData, setSubjectData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    handleGetSubject()
  }, [])

  const handleGetSubject =async () => {
    
    let getSubject =await getDocs(collection(db, 'subject&class'))
    let arr=[];
    getSubject.forEach((doc)=>{
      arr.push({...doc.data(), id: doc.id})
    })
    setSubjectData(arr)
  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'subjectName', headerName: 'Subject name', width: 130 },
    { field: 'classRoom', headerName: 'Class', type: 'number', width: 130 },
    { field: 'select', headerName: 'Group', width: 150,},
  ]


  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className='Content'>
    <div className='Content_Data'>
   <p className='Form-heading'>Subject List</p>
   <p className="add_btn_parent"><Button variant="contained" className="add_btn" onClick={() => navigate('/subject/subjectAdd')}>Add</Button></p>
   <div className="content_table">
    <DataTable dataRow={subjectData} dataColumn={columns}/>
   </div>
    </div>
   </div>
   </div>
</div>
  )
}

export default SubjectList
