import React from 'react';

import {
  Stack,
  Card,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import logo from '../../assets/logo.png';
import { useMutation } from 'react-query';
import { loginTeacher } from '../../api/login';
import { addErrorToast } from '../../redux/actions/toasts';
import { login } from '../../redux/actions/account';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.account.student);
  const { isLoading, mutate } = useMutation((values) => loginTeacher(values), {
    onSuccess: ({ data }) => {
      dispatch(login(data));
      localStorage.setItem('hts-token', data.token);
    },
    onError: (err) =>
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message })),
  });
  // Form requirements
  const schema = yup.object({
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters long'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => mutate(values),
  });
  // -----------------
  if (student) return <Navigate replace to="/student" />;
  return (
    <Card elevation={3} className="w-full pb-6 my-6">
      <Stack spacing={2}>
        <div className="flex">
          <Button variant="contained" className="flex-grow" onClick={() => navigate('/login/teacher')}>Teacher</Button>
          <Button variant="outlined" className="flex-grow" onClick={() => navigate('/login/student')}>Student</Button>
        </div>
        <Typography variant="h5" align="center">Welcome Back</Typography>
        <img className="self-center w-32" alt="hts logo" src={logo} />
        <Typography variant="h5" align="center">Login as a Teacher</Typography>
        <Stack spacing={2} className="px-6" component="form" onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" disabled={isLoading} variant="outlined">
            {isLoading ? <CircularProgress /> : 'Login as Teacher'}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
