import React from 'react';

import { Stack, Card, Button, Typography, TextField, CircularProgress } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useMutation } from 'react-query';
import { addSuccessToast, addErrorToast } from '../../redux/actions/toasts';
import { signupStudent } from '../../api/signup';

import logo from '../../assets/logo.png';
import VerificationEmailModal from './VerificationEamilModal';

export default function StudentSignup() {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation((data) => signupStudent(data), {
    onSuccess: () => {
      dispatch(addSuccessToast({ message: 'Student registered, verification email sent successfully' }));
      setOpenModal(true);
    },
    onError: (err) =>
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message })),
  });
  // Form requirements
  const schema = yup.object({
    fullName: yup
      .string()
      .required('Full Name is required')
      .min(2, 'Full Name should be at least 2 characters long'),
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters long'),
    cnic: yup
      .number()
      .required('CNIC is required')
      .min(1000000000000, 'Enter a valid CNIC')
      .max(9999999999999, 'Enter a valid CNIC'),
  });
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      cnic: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => mutate(values),
  });
  // -----------------
  return (
    <Card elevation={3} className="w-full pb-6 my-6">
      <Stack spacing={2}>
        {/* <div className="flex">
          <Button variant="outlined" className="flex-grow">Teacher</Button>
          <Button variant="outlined" className="flex-grow">Student</Button>
        </div> */}
        <Typography variant="h5" align="center">
          Welcome to
        </Typography>
        <img className="self-center w-32" alt="hts logo" src={logo} />
        <Typography variant="h5" align="center">
          Sign up as a Student
        </Typography>
        <Stack spacing={2} className="px-6" component="form" onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && formik.errors.fullName}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
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
          <TextField
            variant="outlined"
            fullWidth
            type="number"
            label="CNIC"
            name="cnic"
            value={formik.values.cnic}
            onChange={formik.handleChange}
            error={formik.touched.cnic && formik.errors.cnic}
            helperText={formik.touched.cnic && formik.errors.cnic}
          />
          <Button type="submit" disabled={isLoading} variant="outlined">
            {isLoading ? <CircularProgress /> : 'Signup as a Student'}
          </Button>
          <Link to="/login/student">
            <Typography variant="h6" align="center" color="primary">
              Already registered? Login
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <VerificationEmailModal isOpen={isOpenModal} onClose={() => { setOpenModal(false); navigate('/login'); }} />
    </Card>
  );
}
