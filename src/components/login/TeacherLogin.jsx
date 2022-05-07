import React from 'react';

import {
  Stack,
  Card,
  Button,
  Typography,
  TextField,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import logo from '../../assets/logo.png';

export default function TeacherLogin() {
  const navigate = useNavigate();
  // Form requirements
  const schema = yup.object({
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Password should be at least 8 characters long'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });
  // -----------------
  return (
    <Card elevation={3} className="w-full pb-6 my-6">
      <Stack spacing={2}>
        <div className="flex">
          <Button variant="outlined" className="flex-grow" onClick={() => navigate('/login/teacher')}>Teacher</Button>
          <Button variant="contained" className="flex-grow" onClick={() => navigate('/login/student')}>Student</Button>
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
          <Button type="submit" variant="contained">Login as a Teacher</Button>
        </Stack>
      </Stack>
    </Card>
  );
}
