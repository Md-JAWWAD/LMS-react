import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DataTable from "../../Components/Table/Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../Components/FirebaseConfig/FirebaseConfig";

const StudentList = () => {
  const [studentData, setStudentData] = useState([])
  const [loading, setLoading] = useState(true) // ✅ Added loading state
  const [error, setError] = useState('') // ✅ Added error state
  
  const navigate = useNavigate()
  
  useEffect(() => {
    handleGetStudentData()
  }, [])

  const handleGetStudentData = async () => {
    setLoading(true)
    setError('')
    
    try {
      console.log('Fetching student data...')
      
      // ✅ Add query to order by creation date (newest first)
      const q = query(
        collection(db, "studentRegister"),
        orderBy("createdAt", "desc")
      )
      
      const querySnapshot = await getDocs(q)
      
      // ✅ Fix: Properly map data instead of using forEach with setState inside
      const studentList = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        studentList.push({
          id: doc.id,
          ...data,
          // ✅ Ensure all fields exist with defaults
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          room: data.room || 0,
          gender: data.gender || data.radio || 'Not specified', // ✅ Handle both field names
          fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          createdAt: data.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'
        })
      })
      
      console.log('Student data fetched:', studentList)
      setStudentData(studentList)
      
    } catch (error) {
      console.error('Error fetching student data:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      
      let errorMessage = 'Failed to load student data. Please try again.'
      
      switch (error.code) {
        case 'permission-denied':
          errorMessage = 'Firebase permission error. Please check Firestore Security Rules.'
          console.error('🔴 PERMISSION DENIED: Check Firestore Security Rules!')
          break
        case 'unavailable':
          errorMessage = 'Service unavailable. Please try again later.'
          break
        default:
          errorMessage = `Error: ${error.message}`
      }
      
      setError(errorMessage)
      
    } finally {
      setLoading(false)
    }
  }

  // ✅ Define columns with proper configuration
  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 200,
      renderCell: (params) => (
        <span style={{ fontSize: '12px', color: '#666' }}>
          {params.value.substring(0, 8)}...{params.value.substring(params.value.length - 4)}
        </span>
      )
    },
    { 
      field: 'firstName', 
      headerName: 'First Name', 
      width: 130,
      flex: 1
    },
    { 
      field: 'lastName', 
      headerName: 'Last Name', 
      width: 130,
      flex: 1
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => row.fullName || `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      flex: 1.5
    },
    { 
      field: 'room', 
      headerName: 'Class', 
      type: 'number', 
      width: 90,
    },
    { 
      field: 'gender', // ✅ Changed from 'radio' to 'gender'
      headerName: 'Gender', 
      width: 100,
    },
    // ✅ Add status column if needed
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        <span style={{
          backgroundColor: params.value === 'active' ? '#4caf50' : '#ff9800',
          color: 'white',
          padding: '3px 10px',
          borderRadius: '12px',
          fontSize: '12px'
        }}>
          {params.value || 'Active'}
        </span>
      )
    },
    // ✅ Add action column
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            size="small" 
            variant="outlined" 
            color="primary"
            onClick={() => handleViewStudent(params.row.id)}
          >
            View
          </Button>
          <Button 
            size="small" 
            variant="outlined" 
            color="error"
            onClick={() => handleDeleteStudent(params.row.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  // ✅ Add view student handler
  const handleViewStudent = (id) => {
    console.log('View student:', id)
    navigate(`/student/studentDetails/${id}`)
  }

  // ✅ Add delete student handler
  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      // Implement delete functionality
      console.log('Delete student:', id)
      // You can add delete logic here
    }
  }

  // ✅ Refresh data handler
  const handleRefresh = () => {
    handleGetStudentData()
  }

  return (
    <div className="App">
      <Navbar />
      <div className="main_display">
        <Sidebar />
        <div className="Content">
          <div className="Content_Data">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <p className="Form-heading" style={{ margin: 0 }}>Student List</p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                  variant="contained" 
                  className="add_btn" 
                  onClick={() => navigate('/student/studentRegistration')}
                >
                  Add Student
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
            
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
                <Button 
                  size="small" 
                  onClick={handleRefresh}
                  style={{ marginLeft: '10px' }}
                >
                  Retry
                </Button>
              </div>
            )}
            
            {/* ✅ Show loading state */}
            {loading ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '50px',
                fontSize: '18px',
                color: '#666'
              }}>
                <div style={{ 
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #016B1F',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p>Loading student data...</p>
              </div>
            ) : (
              <div className="content_table">
                {studentData.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                  }}>
                    <p style={{ fontSize: '18px', color: '#666' }}>No students found</p>
                    <Button 
                      variant="contained" 
                      onClick={() => navigate('/student/studentRegistration')}
                      style={{ marginTop: '10px' }}
                    >
                      Add First Student
                    </Button>
                  </div>
                ) : (
                  <DataTable 
                    dataRow={studentData} 
                    dataColumn={columns} 
                    changeProp='class'
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 25]}
                  />
                )}
              </div>
            )}
            
            {/* ✅ Show total count */}
            {!loading && studentData.length > 0 && (
              <div style={{ 
                marginTop: '10px', 
                color: '#666',
                fontSize: '14px',
                textAlign: 'right'
              }}>
                Total Students: {studentData.length}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ✅ Add CSS animation for loading spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StudentList;
