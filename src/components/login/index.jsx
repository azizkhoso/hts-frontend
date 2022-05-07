import React from 'react';

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  Grid,
} from '@mui/material';

import StudentLogin from './StudentLogin';
// import TeacherLogin from './TeacherLogin';
import AdminLogin from './AdminLogin';

export default function Login() {
  return (
    <Grid container flexDirection="column" justifyContent="center" alignItems="center" className="min-h-full">
      <Grid container item maxWidth="sm">
        <Routes>
          <Route index element={<Navigate replace to="/login/student" />} />
          <Route path="/student" element={<StudentLogin />} />
          {/* <Route path="/teacher" element={<TeacherLogin />} /> */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </Grid>
    </Grid>
  );
}
