import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Button } from '@mui/material'
import { ScheduleForExam } from '../../Components/Data/ExamData'

const ExamSchedule = () => {
  return (
     <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className="Content">
    <div className="Content_Data">
    <p className='Form-heading' style={{marginBottom: 70}}>CLass List</p>
   {
    ScheduleForExam.map((item, index) => {
      return(
        <div key={index}>
           <div className="scheduleBox">
      <h3>Class {item.class} - {item.book}</h3>
      <p style={{fontSize: 20, color: '#666666'}}>Date: {item.date}</p>
      <p style={{fontSize: 20, color: '#666666'}}>Start Time: {item.startTime} | End Time: {item.endTime}</p>
      <p>
      <Button variant='contained' color='success'>View Details</Button>
      </p>
    </div>
        </div>
      )
    })

   }
   
    </div>
   </div>
   </div>
</div>
  )
}

export default ExamSchedule
