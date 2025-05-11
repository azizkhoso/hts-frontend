import React from 'react';

import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

import {
  Edit,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { updateTeacher } from '../../api/admin/teachers';
import { addErrorToast } from '../../redux/actions/toasts';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTeacherById } from '../../api/admin/teachers';

export default function UpdateTeacher() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // mutation react query
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (data) => updateTeacher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries('admin-teachers');
      window.history.back();
    },
    onError: (err) => {
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message }));
    },
  });
  const schema = yup.object({
    fullName: yup.string().required('Full Name is required').min(2, 'Full Name should be at least 2 characters long'),
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Password should be at least 8 characters long'),
    subjects: yup.array().min(1, 'At least one subject is required'),
    cnic: yup.number().required('CNIC is required').min(1000000000000, 'Enter a valid CNIC').max(9999999999999, 'Enter a valid CNIC'),
    phoneNumber: yup
    .string()
    .min(10, 'Phone Number should be at least 10 digits long')
  });
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      cnic: 0,
      phoneNumber: '',
      subjects: [],
    },
    validationSchema: schema,
    onSubmit: (values) => updateMutation.mutate(values),
  });
  const { isLoading } = useQuery(['test', id], () => getTeacherById(id), {
    onSuccess: ({ data }) => {
      formik.setValues(data.teacher);
    },
    onError: (err) =>
      dispatch(addErrorToast({ message: err?.response?.data.error || err.message })),
  });
  // -----------------
  return (
    <div className="flex flex-col w-full h-full gap-6">
      {/* Back button */}
      <Button variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() => window.history.back()}>
        &lt; Back
      </Button>
      <Typography variant="h6" align="center">Update Teacher</Typography>
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
          {/* Grid items for phone number */}
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Phone Number</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
            <TextField
              fullWidth
              size="small"
              name="subjects"
              placeholder='Enter subjects separated by commas'
              value={formik.values.subjects.join(',')}
              onChange={(e) => formik.setFieldValue(
                'subjects', e.target.value.toUpperCase().split(',')
              )}
              onBlur={(e) => formik.setFieldValue('subjects', e.target.value.toUpperCase().replace(/, /g, ',').split(',').map((s) => s.trim()))}
              error={formik.touched.customSubjects && Boolean(formik.errors.customSubjects)}
            />
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" variant="outlined" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : <><Edit /> Update</>}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
