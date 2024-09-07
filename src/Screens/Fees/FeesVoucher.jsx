import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Button } from "@mui/material";
import { StructureData } from "../../Components/Data/FeesData";
import { useNavigate } from "react-router-dom";

const FeesVoucher = () => {

  const navigate = useNavigate()

  return (
    <div className="App">
      <Navbar />
      <div className="main_display">
        <Sidebar />
        <div className="Content">
          <div className="Content_Data">
            <p className="Form-heading" style={{ marginBottom: 70 }}> Fees Voucher</p>
           {StructureData.map((e, i) => {
            return(
              <div key={i}>
                 <div className="Voucher_box">
              <p style={{textAlign: 'center', fontWeight: 'bold'}}>Fee Voucher - Class {e.class}</p>
              <p style={{display: 'flex', justifyContent: 'space-between', fontSize: 20}}><span>Class:</span> <span>Class {e.class}</span></p>
              <p style={{display: 'flex', justifyContent: 'space-between', fontSize: 20}}><span>Monthly Fee:</span> <span>{e.monthlyFees}</span></p>
              <p style={{display: 'flex', justifyContent: 'space-between', fontSize: 20}}><span>Yearly Fee:</span> <span>{e.yearlyFees}</span></p>
              <p style={{textAlign: 'center'}}><Button color="success" variant="contained" sx={{backgroundColor: '#008000'}} onClick={() => navigate('/fees/fees-submission')}>Pay now</Button></p>
            </div>
              </div>
            )
           })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesVoucher;
