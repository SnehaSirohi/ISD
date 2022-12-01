import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/login';
import Login2 from './components/login2/Login2';
import LoginTeacher from './components/loginteacher/loginteacher';
import Homepage from './components/homepage/homepage'
import AttendanceSem1 from './components/Attendance list/Sem_1';
import AttendanceSem2 from './components/Attendance list/Sem_2';
import AttendanceSem3 from './components/Attendance list/Sem_3';
import AttendanceSem4 from './components/Attendance list/Sem_4';
import ClassScheduleSem1 from './components/Class Schedule/Sem_1.'
import ClassScheduleSem2 from './components/Class Schedule/Sem_2'
import ClassScheduleSem3 from './components/Class Schedule/Sem_3'
import ClassScheduleSem4 from './components/Class Schedule/Sem_4'
import TestscheduleSem1 from './components/Test Schedule/Sem_1';
import TestscheduleSem2 from './components/Test Schedule/Sem_2';
import TestscheduleSem3 from './components/Test Schedule/Sem_3';
import TestscheduleSem4 from './components/Test Schedule/Sem_4';
import Student_Dashboard from './components/Student_dashboard/student_dashboard';
import Student_Profile from './components/Student_dashboard/Student_profile'
import ChangeStudentPassword from './components/Student_dashboard/change_student_password';
import Teacher_Dashboard from './components/Teacher_dashboard/Teacher_dashboard';
import Teacher_Profile from './components/Teacher_dashboard/Teacher_profile'
import ChangeTeacherPassword from './components/Teacher_dashboard/change_teacher_password';
import Sem1 from './components/Teacher_dashboard/sem1';
import Sem2 from './components/Teacher_dashboard/sem2';
import Sem3 from './components/Teacher_dashboard/sem3';
import Sem4 from './components/Teacher_dashboard/sem4';
import Sem1_Student from './components/Student_dashboard/sem1';
import Sem1Attendance from './components/Attendance Report/Sem1Attendance';
import Sem2Attendance from './components/Attendance Report/Sem2Attendance';
import Sem3Attendance from './components/Attendance Report/Sem3Attendance';
import Sem4Attendance from './components/Attendance Report/Sem4Attendance';
import Sem1filters from './components/Filters/Sem1filters';
import Sem2filters from './components/Filters/Sem2filters';
import Sem3filters from './components/Filters/Sem3filters';
import Sem4filters from './components/Filters/Sem4filters';
import Classreport from './components/Scheduled_Class_List/scheduleclassreport';
import Testreport from './components/Scheduled_test_List/scheduletestreport';
import Testreport_student from './components/Scheduled_test_List/testreport_student';
import Classreport_student from './components/Scheduled_Class_List/classreport_student';
import Classreport_semester from './components/Scheduled_Class_List/semesterwise/Classreport_semester';
import Testreport_semester from './components/Scheduled_test_List/semesterwise/Testreport_semester';
import Assignmentreport_semester from './components/Assignment_report/semesterwise/Assignmentreport_semester';

import Assignmentreport_student from './components/Assignment_report/assignmentreport_student';
import Assignmentreport_teacher from './components/Assignment_report/teacher_assignment_report';
import Studymaterial_teacher from './components/Study Material/teacher_studymaterial';
import Studymaterial_student from './components/Study Material/semesterwise/studymaterial_semester';
import UploadAssignmentsem1 from './components/Assignment_Upload/Upload_assignment_sem1';
import UploadAssignmentsem2 from './components/Assignment_Upload/Upload_assignment_sem2';
import UploadAssignmentsem3 from './components/Assignment_Upload/Upload_assignment_sem3';
import UploadAssignmentsem4 from './components/Assignment_Upload/Upload_assignment_sem4';
import Notifications from './components/Student_dashboard/Notifications';
import UploadStudyMaterialSem1 from './components/Study Material/UploadStudyMaterialSem1';
import UploadStudyMaterialSem2 from './components/Study Material/UploadStudyMaterialSem2';
import UploadStudyMaterialSem3 from './components/Study Material/UploadStudyMaterialSem3';
import UploadStudyMaterialSem4 from './components/Study Material/UploadStudyMaterialSem4';
function App() {
  const [subjectval, setsubjectval] = useState("")
  const [dateval, setdateval] = useState("")
  const [monthval, setmonthval] = useState("")


  useEffect(() => {

    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login2' element={<Login2 />} />

          <Route path='/loginteacher' element={<LoginTeacher />} />
          <Route path='/dashboard' element={<Student_Dashboard />} />
          <Route path='/dashboard/profile' element={<Student_Profile />} />
          <Route path="/dashboard/changepassword" element={<ChangeStudentPassword />} />
          <Route path='/Studentdashboard/sem1' element={<Sem1_Student />} />
          <Route path='/testschedule' element={<Testreport_student />} />
          <Route path='/classschedule' element={<Classreport_student />} />
          <Route path='/assignmentreportstudent' element={<Assignmentreport_student />} />
          <Route path='/Teacherdashboard/assignmentreportteacher' element={<Assignmentreport_teacher />} />
          <Route path='/Teacherdashboard' element={<Teacher_Dashboard />} />
          <Route path='/Teacherdashboard/profile' element={<Teacher_Profile />} />
          <Route path="/Teacherdashboard/changepassword" element={<ChangeTeacherPassword />} />
          <Route path='/Teacherdashboard/sem1/attendance' element={<AttendanceSem1 />} />
          <Route path='/Teacherdashboard/sem2/attendance' element={<AttendanceSem2 />} />
          <Route path='/Teacherdashboard/sem3/attendance' element={<AttendanceSem3 />} />
          <Route path='/Teacherdashboard/sem4/attendance' element={<AttendanceSem4 />} />
          <Route path='/Teacherdashboard/sem1' element={<Sem1 />} />
          <Route path='/Teacherdashboard/sem2' element={<Sem2 />} />
          <Route path='/Teacherdashboard/sem3' element={<Sem3 />} />
          <Route path='/Teacherdashboard/sem4' element={<Sem4 />} />
          <Route path='/Teacherdashboard/sem1/classschedule' element={<ClassScheduleSem1 />} />
          <Route path='/Teacherdashboard/sem2/classschedule' element={<ClassScheduleSem2 />} />
          <Route path='/Teacherdashboard/sem3/classschedule' element={<ClassScheduleSem3 />} />
          <Route path='/Teacherdashboard/sem4/classschedule' element={<ClassScheduleSem4 />} />
          <Route path="/Teacherdashboard/sem1/testschedule" element={<TestscheduleSem1 />} />
          <Route path="/Teacherdashboard/sem2/testschedule" element={<TestscheduleSem2 />} />
          <Route path="/Teacherdashboard/sem3/testschedule" element={<TestscheduleSem3 />} />
          <Route path="/Teacherdashboard/sem4/testschedule" element={<TestscheduleSem4 />} />
          <Route path="/attendancereport/sem1" element={<Sem1Attendance subjectval={subjectval} dateval={dateval} monthval={monthval} />} />
          <Route path='/scheduledclassreport' element={<Classreport />} />
          <Route path='/scheduledtestreport' element={<Testreport />} />
          <Route path='/scheduledclass' element={<Classreport_semester/>}/>
          <Route path='/scheduledtests' element={<Testreport_semester/>}/>
          <Route path='/assignments' element={<Assignmentreport_semester/>}/>
          <Route path='/studymaterial' element={<Studymaterial_student/>}/>

          <Route path='/Teacherdashboard/studymaterial' element={<Studymaterial_teacher />} />
          <Route path='/Teacherdashboard/sem1/assignment' element={<UploadAssignmentsem1 />} />
          <Route path='/Teacherdashboard/sem2/assignment' element={<UploadAssignmentsem2 />} />
          <Route path='/Teacherdashboard/sem3/assignment' element={<UploadAssignmentsem3 />} />
          <Route path='/Teacherdashboard/sem4/assignment' element={<UploadAssignmentsem4 />} />
          <Route path='/Teacherdashboard/sem1/studymaterial' element={<UploadStudyMaterialSem1 />} />
          <Route path='/Teacherdashboard/sem2/studymaterial' element={<UploadStudyMaterialSem2 />} />
          <Route path='/Teacherdashboard/sem3/studymaterial' element={<UploadStudyMaterialSem3 />} />
          <Route path='/Teacherdashboard/sem4/studymaterial' element={<UploadStudyMaterialSem4 />} />
          <Route path='/Notifications' element={<Notifications />} />
          <Route path="/Teacherdashboard/filters/sem1" element={<Sem1filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />} />
          <Route path="/attendancereport/sem2" element={<Sem2Attendance subjectval={subjectval} dateval={dateval} monthval={monthval} />} />
          <Route path="/Teacherdashboard/filters/sem2" element={<Sem2filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />} />
          <Route path="/attendancereport/sem3" element={<Sem3Attendance subjectval={subjectval} dateval={dateval} monthval={monthval} />} />
          <Route path="/Teacherdashboard/filters/sem3" element={<Sem3filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />} />
          <Route path="/attendancereport/sem4" element={<Sem4Attendance subjectval={subjectval} dateval={dateval} monthval={monthval} />} />
          <Route path="/Teacherdashboard/filters/sem4" element={<Sem4filters subjectval={subjectval} setsubjectval={setsubjectval} dateval={dateval} setdateval={setdateval} monthval={monthval} setmonthval={setmonthval} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
