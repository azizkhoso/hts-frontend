import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

import {
  Close, Add,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { nanoid } from 'nanoid';

export default function NewTrueFalseDialog({ open, handleClose, handleSubmit }) {
  const imgRef = React.useRef();
  const schema = yup.object({
    statement: yup.string().required('Question Statement is required').min(3, 'Enter at least 3 characters'),
    image: yup.mixed().test('fileSize', 'File should not be larger than 30kB', (value) => {
      if (!value) return true;
      return value.size <= 30000;
    }),
    answer: yup.string().required('Answer is required'),
    duration: yup.number().required('Duration is required').min(5, 'At least 5 seconds should be given').max(180, 'At most 3 minutes (180s) should be given'),
  });
  const formik = useFormik({
    initialValues: {
      statement: '',
      answer: 'True',
      duration: 5,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      formik.resetForm();
      handleSubmit({ ...values, type: 'TrueFalse', id: nanoid(11) });
      handleClose();
    },
  });
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      PaperProps={{
        sx: { minWidth: { xs: '90%', lg: '80vw', xl: '60vw' } },
      }}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
        <DialogTitle className="text-center">New True/False Question</DialogTitle>
        <DialogContent style={{ paddingTop: '0.5rem' }}>
          <Stack spacing={1}>
            <TextField
              variant="outlined"
              onChange={formik.handleChange}
              size="small"
              name="statement"
              label="Question Statement"
              fullWidth
              value={formik.values.statement}
              error={formik.touched.statement && Boolean(formik.errors.statement)}
              helperText={formik.touched && formik.errors.statement}
            />
            <div className={`${formik.errors.image ? 'border-red-500' : ''} flex flex-col w-full border rounded-lg`}>
              <img
                className="self-center w-full max-w-xs"
                src={imgRef && (
                  imgRef.current && (
                    imgRef.current.files[0] && (
                      URL.createObjectURL(imgRef.current.files[0])
                    )
                  )
                )}
                alt="preview"
              />
              <input
                type="file"
                accept="image/*"
                ref={imgRef}
                onChange={({ target }) => formik.setFieldValue('image', target.files[0])}
              />
              {formik.errors.image && <small className="text-red-500">{formik.errors.image}</small>}
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="flex items-stretch w-full gap-1 md:w-auto">
                <Typography variant="h6">Answer:</Typography>
                <Select
                  variant="outlined"
                  className="self-center flex-grow md:flex-grow-0"
                  onChange={formik.handleChange}
                  size="small"
                  name="answer"
                  value={formik.values.answer}
                  error={formik.touched.answer && formik.errors.answer}
                >
                  <MenuItem value="True">True</MenuItem>
                  <MenuItem value="False">False</MenuItem>
                </Select>
              </div>
              <span className="flex-grow hidden md:block" />
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex items-center gap-1">
                  <Typography variant="h6">Duration:</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      endAdornment: 'Seconds',
                    }}
                    name="duration"
                    onChange={formik.handleChange}
                    value={formik.values.duration}
                    error={formik.touched.duration && formik.errors.duration}
                    helperText={formik.touched.duration && formik.errors.duration}
                  />
                </div>
                <Button variant="outlined" color="error" className="md:self-center" startIcon={<Close />} onClick={() => { formik.resetForm(); handleClose(); }}>Cancel</Button>
                <Button variant="outlined" type="submit" className="md:self-center" startIcon={<Add />}>Add</Button>
              </div>
            </div>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

NewTrueFalseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
