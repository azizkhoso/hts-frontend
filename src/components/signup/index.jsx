import React from 'react';

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  Grid,
} from '@mui/material';

import StudentSignup from './StudentSignup';

export default function SignUp() {
  return (
    <Grid container flexDirection="column" justifyContent="center" alignItems="center" className="min-h-full">
      <Grid container item maxWidth="sm">
        <Routes>
          <Route index element={<Navigate replace to="/signup/student" />} />
          <Route path="/student" element={<StudentSignup />} />
          <Route path="/*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </Grid>
    </Grid>
  );
}
