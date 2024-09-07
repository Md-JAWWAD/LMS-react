import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate()

  const handleNavigate = (link) => {
    navigate(link)
  }

  const sidebarData = [
    {
      id: 1,
      title: "Students",
      dropdown_text1: "StudentRegistration",
      dropdown_text2: "StudentList",
      dropdown_link: ['/student/studentRegistration', '/student/studentList'],
    },
    {
      id: 2,
      title: "Teachers",
      dropdown_text1: "TeacherRegistration",
      dropdown_text2: "TeacherList",
      dropdown_link: ['/teacher/teacherRegistration', '/teacher/teacherList'],
    },
    {
      id: 3,
      title: "Subjects",
      dropdown_text1: "Subjects Add",
      dropdown_text2: "Subject List",
      dropdown_link: ['/subject/subjectAdd', '/subject/subjectList'],
    },
    {
      id: 4,
      title: "Syllabus",
      dropdown_text1: "Syllabus Form",
      dropdown_text2: "Syllabus list",
      dropdown_link: ['/syllabus/syllabusForm', '/syllabus/syllabusList'],
    },
    {
      id: 5,
      title: "School",
      dropdown_text1: "Student Registration",
      dropdown_text2: "Teacher Registration",
      dropdown_link: ['/student/studentRegistration', '/teacher/teacherRegistration'],
    },
    {
      id: 6,
      title: "Class",
      dropdown_text1: "Class Form",
      dropdown_text2: "Class List",
      dropdown_link: ['/class/classForm', '/class/classList'],

    },
    {
      id: 7,
      title: "Fees",
      dropdown_text1: "Fees Structure",
      dropdown_text2: "Fees Voucher",
      dropdown_text3: "Fees Submission",
      dropdown_link: ['/fees/feesStructure', '/fees/feesVoucher', '/fees/fees-submission'],
      dropdown_style: {
        display: "flex",
      }
    },
    {
      id: 8,
      title: "Admission",
      dropdown_text1: "Admission Form",
      dropdown_text2: false,
      dropdown_link: ['/admission/admissionForm'],
      
    },
    {
      id: 9,
      title: "Exam",
      dropdown_text1: "Exam Schedule",
      dropdown_text2: 'Exam Result',
      dropdown_link: ['/exam/examSchedule', '/exam/examResult'],
    },
  ];

  return (
    <div className={styles.Sidebar}>
      {sidebarData.map((e, i) => {
        return (
          <div key={i}>
            <Accordion
              expanded={expanded === i}
              onChange={handleChange(i)}
              className={styles.Mui_drop}
              style={{ color: "#29952B", borderRadius: 0, boxShadow: 'none'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ textAlign: "center", fontSize: "22px", fontWeight: 400 }}
              >
                <MdEmail style={{ margin: "auto 5px" }} />
                <p>{e.title}</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.sidebar_dropdown} onClick={()=> handleNavigate(e.dropdown_link[0])}>
                  <span>{e.dropdown_text1}</span>
                </div>
               {
                e.dropdown_text2 ? (
                  <div className={styles.sidebar_dropdown} onClick={()=> handleNavigate(e.dropdown_link[1])}>
                  <span>{e.dropdown_text2}</span>
                </div>
                ):null
               }
                <div style={{display: e.dropdown_style ? '': 'none'}} className={styles.sidebar_dropdown}  onClick={()=> handleNavigate(e.dropdown_link[2])}>
                  <span>{e.dropdown_text3}</span>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
