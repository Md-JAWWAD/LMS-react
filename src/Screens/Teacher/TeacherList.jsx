import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import DataTable from '../../Components/Table/Table'
import { Button } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Components/FirebaseConfig/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

const TeacherList = () => {

  const [teacherData, setTeacherData] = useState([])
  
  const navigate = useNavigate()

  useEffect(()=>{
    handleGetStaffData()
  }, [])

  const handleGetStaffData =async () => {

    const getStaffData = await getDocs(collection(db, "teacherRegister"))
    let arr=[]
    getStaffData.forEach((doc) => {
      arr.push({...doc.data(), id:doc.id})
      setTeacherData(arr)

    })
    // if (arr.length > 0) {
    //   const keys = Object.keys(arr[0]);
    //   console.log(keys);
    // }
  }

  // const headerKeys = ['id', 'firstName', 'LastName', 'email', 'radio', 'age']

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
    { field: 'email', headerName: 'email', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90,},
    { field: 'radio', headerName: 'Gender', width: 100 },
  ];
   

  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className='Content'>
    <div className='Content_Data'>
   <p className='Form-heading'>Teacher List</p>
   <p className="add_btn_parent"><Button variant="contained" className="add_btn" onClick={() => navigate('/teacher/teacherRegistration')}>Add</Button></p>
   <div className="content_table">
    <DataTable dataRow={teacherData} dataColumn = {columns} changeProp='Age'/>
   </div>
    </div>
   </div>
   </div>
</div>
  )
}

export default TeacherList
