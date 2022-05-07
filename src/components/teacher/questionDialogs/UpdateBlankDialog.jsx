/* eslint-disable react/forbid-prop-types */
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
} from '@mui/material';

import {
  Close, Edit,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

export default function UpdateBlankDialog({
  open, handleClose, handleSubmit, question,
}) {
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
      ...question,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      formik.resetForm();
      handleSubmit({ ...values });
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
        <DialogTitle className="text-center">Update Blank Question</DialogTitle>
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
                src={(imgRef && (
                  imgRef.current && (
                    imgRef.current.files[0] && (
                      URL.createObjectURL(imgRef.current.files[0])
                    )
                  )
                )) || (typeof question.image === 'object' ? URL.createObjectURL(question.image) : question.image)}
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
            <TextField
              variant="outlined"
              onChange={formik.handleChange}
              size="small"
              name="answer"
              label="Answer"
              value={formik.values.answer}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched && formik.errors.answer}
            />
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
                  error={formik.touched.duration && Boolean(formik.errors.duration)}
                  helperText={formik.touched.duration && formik.errors.duration}
                />
              </div>
              <div className="flex-grow" />
              <Button variant="contained" color="error" className="md:self-center" startIcon={<Close />} onClick={() => { formik.resetForm(); handleClose(); }}>Cancel</Button>
              <Button variant="contained" type="submit" className="md:self-center" startIcon={<Edit />}>Update</Button>
            </div>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

UpdateBlankDialog.propTypes = {
  question: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
