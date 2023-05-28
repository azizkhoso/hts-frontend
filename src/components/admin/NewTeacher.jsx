import React from 'react';

import {
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';

import {
  Add,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

const subjects = ['English', 'Math', 'Physics', 'Chemistery', 'Biology', 'MDCAT', 'ECAT', 'STS IBA', 'NTS', 'SPSC'];

export default function NewTeacher() {
  // Form requirements
  const schema = yup.object({
    fullName: yup.string().required('Full Name is required').min(2, 'Full Name should be at least 2 characters long'),
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Password should be at least 8 characters long'),
    subjects: yup.array().min(1, 'At least one subject is required'),
    cnic: yup.number().required('CNIC is required').min(1000000000000, 'Enter a valid CNIC').max(9999999999999, 'Enter a valid CNIC'),
  });
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      cnic: 0,
      subjects: [],
    },
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });
  // -----------------
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center">New Teacher</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container component="form" onSubmit={formik.handleSubmit} xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Full Name</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Email</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Password</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">CNIC</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="cnic"
              value={formik.values.cnic}
              onChange={formik.handleChange}
              error={formik.touched.cnic && Boolean(formik.errors.cnic)}
              helperText={formik.touched.cnic && formik.errors.cnic}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Subjects</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Select
              variant="outlined"
              fullWidth
              size="small"
              multiple
              name="subjects"
              onChange={formik.handleChange}
              value={formik.values.subjects}
              error={formik.touched.subjects && Boolean(formik.errors.subjects)}
            >
              {
                subjects.map((s) => (
                  <MenuItem value={s}>{s}</MenuItem>
                ))
              }
            </Select>
            { formik.touched && formik.errors.subjects && (
              <Typography className="pl-3 my-1 text-xs text-red-500">
                {formik.touched && formik.errors.subjects}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" variant="contained" startIcon={<Add />}>Add</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
