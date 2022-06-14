import React from 'react';

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  CircularProgress,
  Grid,
} from '@mui/material';

import StudentLogin from './StudentLogin';
// import TeacherLogin from './TeacherLogin';
import AdminLogin from './AdminLogin';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { verifyLogin } from '../../api/login';

import { login } from '../../redux/actions/account';

export default function Login() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state);
  const { isLoading } = useQuery('verify-login', () => verifyLogin(localStorage.getItem('hts-token')), {
    onSuccess: ({ data }) => dispatch(login(data)),
  });
  if (account.student) return <Navigate replace to="/student/dashboard" />
  if (account.admin) return <Navigate replace to="/admin/dashboard" />
  if (account.teacher) return <Navigate replace to="/teacher/dashboard" />
  if (isLoading) return (
    <div className="w-full flex p-6">
      <CircularProgress className="m-auto" />
    </div>
  );
  return (
    <Grid container flexDirection="column" justifyContent="center" alignItems="center" className="min-h-full p-6">
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
