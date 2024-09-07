import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { StructureData } from '../../Components/Data/FeesData'

const FeesStructure = () => {
  return (
    <div className="App">
    <Navbar/> 
   <div className="main_display">
   <Sidebar/>
   <div className="Content">
    <div className="Content_Data">
    <p className='Form-heading' style={{marginBottom: 70}}>Fees Structure</p>

   {
    StructureData.map((e, i) => {
      return(
        <div key={i}>
           <div className="fees_box">
      <p style={{textAlign: 'center'}}>Class {e.class}</p>
      <p style={{display: 'flex', justifyContent: 'space-between', color: '#016B1F'}}><span>Monthly Fee:</span><span>Rs:{e.monthlyFees}</span></p>
      <p style={{display: 'flex', justifyContent: 'space-between'}}><span>Yearly Fee:</span><span>Rs:{e.yearlyFees}</span></p>
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

export default FeesStructure
