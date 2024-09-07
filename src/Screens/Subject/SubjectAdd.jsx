import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import InputFrom from "../../Components/Input/InputForm";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Components/FirebaseConfig/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { Radio } from "@mui/material";

const SubjectAdd = () => {
  const [subjectName, setSubjectName] = useState("");
  const [classRoom, setClassRoom] = useState(0);
  const [select, setSelect] = useState("");

  const navigate = useNavigate();

  const subjectObj = {
    subjectName,
    classRoom,
    select
  };

  const handleSelectVal = (e) => {
    setSelect(e.target.value);
  };

  const handleSubject = async (e) => {
    e.preventDefault();
    if(subjectName.trim() === '' || classRoom.trim() === '' || select === ''){
      alert('Please fill all the fields');
    }
    else{ 
      try {
        const subjectClass = await addDoc(
          collection(db, "subject&class"),
          subjectObj
        ).then((res) => {
          console.log(res);
          alert("Subject Add in list");
          navigate("/subject/subjectList");
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main_display">
        <Sidebar />
        <form className="Content">
          <div className="Regis_Form">
            <p className="Form-heading">Subject Add</p>
            <InputFrom
              onchange={(e) => setSubjectName(e.target.value)}
              label="Subject Name:"
              placeholder="Enter your subject name"
              type="text"
            />
            <InputFrom
              onchange={(e) => setClassRoom(e.target.value)}
              label="Class:"
              placeholder="Enter your class"
              type="number"
            />
            <p>
              <label
                htmlFor="Qualification"
                style={{ color: "#016B1F", fontSize: 24 }}
              >
                Select Group
              </label>
              <p>
                <Radio
                  value="GeneralScience"
                  color="success"
                  checked={select == "GeneralScience"}
                  onChange={handleSelectVal}
                />
                <label htmlFor="">GeneralScience</label>
              </p>
              <p>
                <Radio
                  value="Pre-Engineering"
                  color="success"
                  checked={select == "Pre-Engineering"}
                  onChange={handleSelectVal}
                />
                <label htmlFor="">Pre-Engineering</label>
              </p>
            </p>
            <button className="submit_btn" onClick={handleSubject}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectAdd;
