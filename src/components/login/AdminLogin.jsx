import React from 'react';

import {
  Stack,
  Card,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

import {
  useMutation,
} from 'react-query';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/account';

import { loginAdmin } from '../../api/login';
import * as utils from '../../utils';

import logo from '../../assets/logo.png';
import { addErrorToast } from '../../redux/actions/toasts';

export default function AdminLogin() {
  const { account } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation(
    (values) => loginAdmin(values),
    {
      onSuccess: ({ data }) => {
        dispatch(login(data));
        localStorage.setItem('hts-token', data.token);
      },
      onError: (err) => dispatch(
        addErrorToast({ message: err.response?.data?.error || err.message }),
      ),
    },
  );
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
    onSubmit: (values) => mutate(values),
  });
  // -----------------
  if (account.admin) return <Navigate replace to="/admin" />;
  return (
    <Card elevation={3} className="w-full py-6 my-6">
      <Stack spacing={2}>
        <img className="self-center w-32" alt="hts logo" src={logo} />
        <Typography variant="h5" align="center">Login as an Admin</Typography>
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
          <Button type="submit" disabled={isLoading} variant="contained">
            {
              isLoading
                ? <CircularProgress />
                : 'Login as Admin'
            }
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
