import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Typography } from "@mui/material";
import { ResultData } from "../../Components/Data/ExamData";

const ExamResult = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="main_display">
        <Sidebar />
        <div className="Content">
          <div className="Content_Data">
            <p className="Form-heading" style={{ marginBottom: 70 }}>
              CLass Result
            </p>
            {ResultData.map((e, i) => {
              return (
                <div key={i}>
                  <h3 style={{textAlign: 'center' , letterSpacing: '3px' ,}}>Class {e.class} Result</h3>
                  <div className="exam_result">
                    <h4>{e.stdName}</h4>
                    <h4>{e.rollNum}</h4>
                    <h4>{e.grade}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
