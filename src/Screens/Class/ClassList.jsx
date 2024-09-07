import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import DataTable from '../../Components/Table/Table'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Components/FirebaseConfig/FirebaseConfig'

const ClassList = () => {

  const [classData, setClassData] = useState([])
  
  const navigate = useNavigate()

  useEffect(()=>{
    handleGetClassData()
  }, [])

  const handleGetClassData =async () => {

    const getClassData = await getDocs(collection(db, "classAdmission"))
    let arr=[]
    getClassData.forEach((doc) => {
      arr.push({...doc.data(), id:doc.id})
      setClassData(arr)

    })
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'birth', headerName: 'Date-of-birth', type: 'number', width: 90,},
    { field: 'phone', headerName: 'Phone Number', type: 'number', width: 90,},
    { field: 'radio', headerName: 'Gender', width: 100 },
  ];

  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className='Content'>
    <div className='Content_Data'>
   <p className='Form-heading'>CLass List</p>
   <p className="add_btn_parent"><Button variant="contained" className="add_btn" onClick={() => navigate('/class/classForm')}>Add</Button></p>
   <div className="content_table">
    <DataTable dataRow={classData} dataColumn={columns}/>
   </div>
    </div>
   </div>
   </div>
</div>
  )
}

export default ClassList
