import React from 'react';

import {
  Stack,
  Card,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';

import logo from '../../assets/logo.png';

export default function TeacherSignup() {
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
    subjects: yup
      .string()
      .required('Subjects are required')
      .oneOf(
        ['Math', 'English', 'Chemistry', 'Biology', 'Physics'],
        'Given subject is not availabel',
      ),
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
    onSubmit: (values) => console.log(values),
  });
  // -----------------
  return (
    <Card elevation={3} className="w-full pb-6 my-6">
      <Stack spacing={2}>
        <div className="flex">
          <Button variant="outlined" className="flex-grow">
            Teacher
          </Button>
          <Button variant="contained" className="flex-grow">
            Student
          </Button>
        </div>
        <Typography variant="h5" align="center">
          Welcome to
        </Typography>
        <img className="self-center w-32" alt="hts logo" src={logo} />
        <Typography variant="h5" align="center">
          Sign up as a Teacher
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
          <FormControl fullWidth>
            <InputLabel id="subject-select-label">Subjects</InputLabel>
            <Select labelId="subject-select-label" id="subject-select" label="Subjects">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
          <Button type="submit" variant="contained">
            Signup as a Teacher
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
