/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

import {
  Close, Edit,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

export default function UpdateMCQSDialog({
  question, open, handleClose, handleSubmit,
}) {
  const imgRef = React.useRef();
  const schema = yup.object({
    statement: yup.string().required('Question Statement is required').min(3, 'Enter at least 3 characters'),
    image: yup.mixed().test('fileSize', 'File should not be larger than 30kB', (value) => {
      if (!value) return true;
      return value.size <= 30000;
    }),
    A: yup.string().required('Option A is required'),
    B: yup.string().required('Option B is required'),
    C: yup.string().required('Option C is required'),
    D: yup.string().required('Option D is required'),
    answer: yup.string().required('Correct Option is required'),
    duration: yup.number().required('Duration is required').min(5, 'At least 5 seconds should be given').max(180, 'At most 3 minutes (180s) should be given'),
  });
  const formik = useFormik({
    initialValues: {
      ...question,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      formik.resetForm();
      handleSubmit({ ...values, id: question.id });
      handleClose();
    },
  });
  // Rest form when component is unmount
  React.useEffect(() => formik.resetForm(), []);
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      PaperProps={{
        sx: { minWidth: { xs: '90%', lg: '80vw', xl: '60vw' } },
      }}
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
        <DialogTitle className="text-center">New MCQS Question</DialogTitle>
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
              error={formik.touched.statement && formik.errors.statement}
              helperText={formik.touched && formik.errors.statement}
            />
            <div className={`${formik.errors.image ? 'border-red-500' : ''} flex flex-col w-full border rounded-lg`}>
              <img
                className="w-full"
                src={(
                  imgRef && (
                    imgRef.current && (
                      imgRef.current.files[0] && (
                        URL.createObjectURL(imgRef.current.files[0])
                      )
                    )
                  )
                ) || (typeof question.image === 'object' ? URL.createObjectURL(question.image) : question.image)}
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
            <div className="flex items-center gap-3">
              <Typography variant="h6">A.</Typography>
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                size="small"
                name="A"
                className="flex-grow"
                value={formik.values.A}
                error={formik.touched.A && formik.errors.A}
                helperText={formik.touched.A && formik.errors.A}
              />
            </div>
            <div className="flex items-center gap-3">
              <Typography variant="h6">B.</Typography>
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                size="small"
                name="B"
                className="flex-grow"
                value={formik.values.B}
                error={formik.touched.B && formik.errors.B}
                helperText={formik.touched.B && formik.errors.B}
              />
            </div>
            <div className="flex items-center gap-3">
              <Typography variant="h6">C.</Typography>
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                size="small"
                name="C"
                className="flex-grow"
                value={formik.values.C}
                error={formik.touched.C && formik.errors.C}
                helperText={formik.touched.C && formik.errors.C}
              />
            </div>
            <div className="flex items-center gap-3">
              <Typography variant="h6">D.</Typography>
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                size="small"
                name="D"
                className="flex-grow"
                value={formik.values.D}
                error={formik.touched.D && formik.errors.D}
                helperText={formik.touched.D && formik.errors.D}
              />
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="flex items-stretch w-full gap-1 md:w-auto">
                <Typography variant="h6">Correct Option:</Typography>
                <Select
                  variant="outlined"
                  className="self-center flex-grow md:flex-grow-0"
                  onChange={formik.handleChange}
                  size="small"
                  name="answer"
                  value={formik.values.answer}
                  error={formik.touched.answer && formik.errors.answer}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
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
                <Button variant="contained" color="error" className="md:self-center" startIcon={<Close />} onClick={() => { formik.resetForm(); handleClose(); }}>Cancel</Button>
                <Button variant="contained" type="submit" className="md:self-center" startIcon={<Edit />}>Update</Button>
              </div>
            </div>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

UpdateMCQSDialog.propTypes = {
  question: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
