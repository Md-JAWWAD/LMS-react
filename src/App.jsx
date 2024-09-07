import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Screens/Login'
import SignUpPage from './Screens/Signup'
import  Dashboard  from './Screens/dashboard'
import StudentList from './Screens/Student/StudentList'
import StudentRegistration from './Screens/Student/StudentRegistration'

import TeacherRegistration from './Screens/Teacher/TeacherRegistration'
import TeacherList from './Screens/Teacher/TeacherList'

import SubjectAdd from './Screens/Subject/SubjectAdd'
import SubjectList from './Screens/Subject/SubjectList'

import SyllabusForm from './Screens/Syllabus/SyllabusForm'
import SyllabusList from './Screens/Syllabus/SyllabusList'

import ClassForm from './Screens/Class/ClassForm'
import ClassList from './Screens/Class/ClassList'

import FeesStructure from './Screens/Fees/FeesStructure'
import FeesSubmission from './Screens/Fees/FeesSubmission'
import FeesVoucher from './Screens/Fees/FeesVoucher'

import AdmissionForm from './Screens/Admission/AdmissionForm'

import ExamSchedule from './Screens/Exam/ExamSchedule'
import ExamResult from './Screens/Exam/ExamResult'
import AuthRoute from './Components/Routes/AuthRoute'
import HomeRoute from './Components/Routes/HomeRoute'




const App = () => {
  return (
    <Routes>
      <Route element={<AuthRoute/>}>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signUp' element={<SignUpPage/>}/>
      </Route>

      <Route element={<HomeRoute/>}>
      <Route path='/student/studentList' element={<StudentList/>}/>
      <Route path='/student/studentRegistration' element={<StudentRegistration />}/>

      <Route path='/teacher/teacherRegistration' element={<TeacherRegistration/>}/>
      <Route path='/teacher/teacherList' element={<TeacherList/>}/>

      <Route path='/subject/subjectAdd' element={<SubjectAdd/>}/>
      <Route path='/subject/subjectList' element={<SubjectList/>}/>

      <Route path='/syllabus/syllabusForm' element={<SyllabusForm/>}/>
      <Route path='/syllabus/syllabusList' element={<SyllabusList/>}/>

      <Route path='/class/classForm' element={<ClassForm/>}/>
      <Route path='/class/classList' element={<ClassList/>}/>

      <Route path='/fees/feesStructure' element={<FeesStructure/>}/>
      <Route path='/fees/fees-submission' element={<FeesSubmission/>}/>
      <Route path='/fees/feesVoucher' element={<FeesVoucher/>}/>

      <Route path='/admission/admissionForm' element={<AdmissionForm/>}/>

      <Route path='/exam/examSchedule' element={<ExamSchedule/>}/>
      <Route path='/exam/examResult' element={<ExamResult/>}/>
      </Route>
    </Routes>
  )
}

export default App
