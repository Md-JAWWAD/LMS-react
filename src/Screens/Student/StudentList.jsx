import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DataTable from "../../Components/Table/Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Components/FirebaseConfig/FirebaseConfig";

const StudentList = () => {

  
  const [studentData, setStudentData] = useState([])
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    handleGetStudentData()
  }, [])

  const handleGetStudentData =async () => {

    const getStudentData = await getDocs(collection(db, "studentRegister"))
    let arr=[]
    getStudentData.forEach((doc) => {
      arr.push({...doc.data(), id:doc.id})
      setStudentData(arr)
    })

    // if (arr.length > 0) {
    //   const keys = Object.keys(arr[2]);
    //   console.log(keys);
    // }
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
    { field: 'room', headerName: 'Class', type: 'number', width: 90,},
    { field: 'radio', headerName: 'Gender', width: 100 },
  ];

  
   

  return (
    <div className="App">
      <Navbar />
      <div className="main_display">
        <Sidebar />
        <div className="Content">
          <div className="Content_Data">
            <p className="Form-heading">Student List</p>
            <p className="add_btn_parent"><Button variant="contained" className="add_btn" onClick={() => navigate('/student/studentRegistration')}>Add</Button></p>
            <div className="content_table">
              <DataTable dataRow={studentData} dataColumn={columns} changeProp='class'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
