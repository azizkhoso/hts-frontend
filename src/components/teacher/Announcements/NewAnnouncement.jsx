import React from 'react';

import {
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import {
  Add,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useMutation, useQueryClient } from 'react-query';
import { newAnnouncement } from '../../../api/teacher';

import { useDispatch } from 'react-redux';
import { addErrorToast, addSuccessToast } from '../../../redux/actions/toasts';
import { useNavigate } from 'react-router-dom';

export default function NewAnnouncement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Form requirements
  const { isLoading, mutate } = useMutation(
    (value) => newAnnouncement(value),
    {
      onSuccess: ({ data }) => {
        dispatch(addSuccessToast({ message: `Announcement added successfully` }));
        queryClient.invalidateQueries('announcements');
        navigate(-1);
      },
      onError: (err) => dispatch(
        addErrorToast({ message: err.response?.data?.error || err.message }),
      ),
    },
  )
  const schema = yup.object({
    title: yup.string().min(2, 'Title should be at least 2 characters long').required('Title is required'),
    details: yup.string().min(3, 'Details should be at least 3 characters long').required('Details are required'),
    link: yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Link should be valid').test('emptyLink', 'Link can be empty', (value) => value !== ''),
    isImportant: yup.bool('isImportant should be boolean'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      details: '',
      link: '',
      isImportant: false,
    },
    validationSchema: schema,
    onSubmit: (values) => mutate({ ...values, link: values.link || undefined }),
  });
  // -----------------
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center">New Announcement</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container component="form" onSubmit={formik.handleSubmit} xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Title</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Details</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              multiline
              minRows={2}
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              error={formik.touched.details && Boolean(formik.errors.details)}
              helperText={formik.touched.details && formik.errors.details}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Link</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="link"
              value={formik.values.link}
              onChange={formik.handleChange}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Important</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Select
              variant="outlined"
              fullWidth
              size="small"
              name="isImportant"
              onChange={(e) => formik.setFieldValue('isImportant', Boolean(e.target.value))}
              value={formik.values.isImportant}
              error={formik.touched.isImportant && Boolean(formik.errors.isImportant)}
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
            { formik.touched && formik.errors.isImportant && (
              <Typography className="pl-3 my-1 text-xs text-red-500">
                {formik.touched && formik.errors.isImportant}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" disabled={isLoading} variant="outlined" startIcon={<Add />}>
              {
                isLoading
                  ? <CircularProgress size={20} />
                  : 'Add'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
