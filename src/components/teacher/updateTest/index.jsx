/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Menu,
  Stack,
  Card,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { Add, Delete, Edit } from '@mui/icons-material';

import date from 'date-and-time';

import { useParams, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';

import { useQuery, useMutation } from 'react-query';
import { getTest, updateTest } from '../../../api/admin';
import { addErrorToast, addSuccessToast } from '../../../redux/actions/toasts';

import {
  NewMCQSDialog,
  NewBlankDialog,
  NewTrueFalseDialog,
  UpdateMCQSDialog,
  UpdateBlankDialog,
  UpdateTrueFalseDialog,
} from '../questionDialogs';

const subjects = ['English', 'Math', 'Physics', 'Chemistery', 'Biology', 'MDCAT', 'ECAT', 'STS IBA', 'NTS', 'SPSC'];

export default function UpdateTest() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateMutation = useMutation((values) => updateTest({ ...values, _id }), {
    onSuccess: () => {
      dispatch(addSuccessToast({ message: 'Test updated successfully' }));
      navigate('../../tests');
    },
    onError: (err) =>
      dispatch(addErrorToast({ message: err?.response?.data.error || err.message })),
  });
  const schema = yup.object({
    title: yup.string().required('Title is required').min(4, 'Enter at least 4 characters'),
    subject: yup.string().required('Subject is required'),
    startsAt: yup.date().min(new Date(), 'Test cannot be hold in past time'),
    submittableBefore: yup
      .date()
      .min(new Date(), 'Test cannot be uploaded after end time')
      .required('End time is required'),
    isDemo: yup.string(),
    questions: yup.array().min(3, 'The test should have at least 3 questions'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      subject: '',
      startsAt: new Date(),
      submittableBefore: new Date(),
      isDemo: 'false',
      questions: [],
    },
    validationSchema: schema,
    onSubmit: (values) => updateMutation.mutate(values),
  });
  const { isLoading } = useQuery(['test', _id], () => getTest(_id), {
    onSuccess: ({ data }) => {
      formik.setValues(data.test);
    },
    onError: (err) =>
      dispatch(addErrorToast({ message: err?.response?.data.error || err.message })),
  });
  const [anchorEl, setAnchoEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function handleMenuOpen(e) {
    setAnchoEl(e.currentTarget);
  }
  function handleMenuClose() {
    setAnchoEl(null);
  }
  const [toBeUpdatedQuestion, setToBeUpdatedQuestion] = React.useState(null);
  const [isOpenMCQS, setOpenMCQS] = React.useState(false);
  const [isOpenBlank, setOpenBlank] = React.useState(false);
  const [isOpenTrueFalse, setOpenTrueFalse] = React.useState(false);
  const [isOpenUpdateMCQS, setOpenUpdateMCQS] = React.useState(false);
  const [isOpenUpdateBlank, setOpenUpdateBlank] = React.useState(false);
  const [isOpenUpdateTrueFalse, setOpenUpdateTrueFalse] = React.useState(false);
  function openDialog(dialog) {
    if (dialog === 'MCQS') {
      setOpenMCQS(true);
      setAnchoEl(null);
    } else if (dialog === 'Blank') {
      setOpenBlank(true);
      setAnchoEl(null);
    } else if (dialog === 'TrueFalse') {
      setOpenTrueFalse(true);
      setAnchoEl(null);
    }
  }
  function openUpdateDialog(dialogType) {
    if (dialogType === 'MCQS') {
      setOpenUpdateMCQS(true);
    } else if (dialogType === 'Blank') {
      setOpenUpdateBlank(true);
    } else if (dialogType === 'TrueFalse') {
      setOpenUpdateTrueFalse(true);
    }
  }
  function updateQuestion(question) {
    const foundIndex = formik.values.questions.findIndex((q) => q.id === question.id);
    const updatedQuestions = [
      ...formik.values.questions.slice(0, foundIndex),
      { ...question },
      ...formik.values.questions.slice(foundIndex + 1),
    ];
    formik.setFieldValue('questions', updatedQuestions);
  }
  function deleteQuestion(id) {
    const removed = formik.values.questions.filter((q) => q.id !== id);
    formik.setFieldValue('questions', removed);
  }
  function calculateTotalDuration(questions) {
    if (questions.length === 0) return '0 s';
    let totalSeconds = 0;
    questions.forEach((q) => {
      totalSeconds += q.duration;
    });
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) return `${seconds} s`;
    return `${minutes} m, ${seconds} s`;
  }
  if (isLoading)
    return (
      <div className="relative inset-0 flex items-center justify-center w-full h-full">
        <CircularProgress />
      </div>
    );
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full h-full gap-6">
      <div className="flex justify-between w-full gap-3 lg:w-11/12">
        <Typography variant="h6" align="center">
          Update Test
        </Typography>
        <div className="flex items-center justify-center">
          <Button disabled={updateMutation.isLoading} variant="contained" type="submit">
            {updateMutation.isLoading ? <CircularProgress /> : 'Update'}
          </Button>
        </div>
      </div>
      <table>
        <tbody>
          <tr className="flex flex-col justify-between w-full lg:w-2/3 2xl:w-2/6 md:flex-row">
            <td className="w-min-fit">
              <Typography variant="h6" color="primary">
                Title
              </Typography>
            </td>
            <td>
              <TextField
                variant="outlined"
                placeholder="Title"
                size="small"
                className="w-full sm:w-60"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && formik.errors.title}
                helperText={formik.touched && formik.errors.title}
              />
            </td>
          </tr>
          <tr className="flex flex-col justify-between w-full lg:w-2/3 2xl:w-2/6 md:flex-row">
            <td className="w-min-fit">
              <Typography variant="h6" color="primary">
                Subject
              </Typography>
            </td>
            <td>
              <Select
                variant="outlined"
                placeholder="Subject"
                size="small"
                className="w-full sm:w-60"
                name="subject"
                onChange={formik.handleChange}
                value={formik.values.subject}
                error={formik.touched.subject && formik.errors.subject}
                helperText={formik.touched && formik.errors.subject}
              >
                {
                  subjects.map((s) => (
                    <MenuItem value={s}>{s}</MenuItem>
                  ))
                }
              </Select>
            </td>
          </tr>
          <tr className="flex flex-col justify-between w-full lg:w-2/3 2xl:w-2/6 md:flex-row">
            <td className="w-min-fit">
              <Typography variant="h6" color="primary">
                Starts at
              </Typography>
            </td>
            <td>
              <TextField
                type="datetime-local"
                variant="outlined"
                placeholder="Title"
                size="small"
                className="w-full sm:w-60"
                name="startsAt"
                onChange={formik.handleChange}
                value={date.format(new Date(formik.values.startsAt), 'YYYY-MM-DDTHH:mm')}
                error={formik.touched.startsAt && formik.errors.startsAt}
                helperText={formik.touched && formik.errors.startsAt}
              />
            </td>
          </tr>
          <tr className="flex flex-col justify-between w-full lg:w-2/3 2xl:w-2/6 md:flex-row">
            <td className="min-w-fit">
              <Typography variant="h6" color="primary">
                Submittable Before
              </Typography>
            </td>
            <td>
              <TextField
                type="datetime-local"
                variant="outlined"
                placeholder="Title"
                size="small"
                className="w-full sm:w-60"
                name="submittableBefore"
                onChange={formik.handleChange}
                value={date.format(new Date(formik.values.submittableBefore), 'YYYY-MM-DDTHH:mm')}
                error={formik.touched.submittableBefore && formik.errors.submittableBefore}
                helperText={formik.touched && formik.errors.submittableBefore}
              />
            </td>
          </tr>
          <tr className="flex flex-col justify-between w-full lg:w-2/3 2xl:w-2/6 md:flex-row">
            <td className="min-w-fit">
              <Typography variant="h6" color="primary">
                Is demo:
              </Typography>
            </td>
            <td className="flex justify-start w-full sm:w-60">
              <Select
                variant="outlined"
                placeholder="Subject"
                size="small"
                className="w-full sm:w-60"
                name="isDemo"
                onChange={formik.handleChange}
                value={formik.values.isDemo}
                error={formik.touched.isDemo && formik.errors.isDemo}
                helperText={formik.touched && formik.errors.isDemo}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </td>
          </tr>
          <tr className="flex flex-col justify-between w-full lg:w-2/3 2xl:w-2/6 md:flex-row">
            <td>
              <Typography variant="h6" color="primary">
                Duration:
              </Typography>
            </td>
            <td>
              <Typography variant="h6">
                {calculateTotalDuration(formik.values.questions)}
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
      <NewMCQSDialog
        open={isOpenMCQS}
        handleClose={() => setOpenMCQS(false)}
        handleSubmit={(q) => formik.setFieldValue('questions', [...formik.values.questions, q])}
      />
      {toBeUpdatedQuestion && (
        <UpdateMCQSDialog
          question={toBeUpdatedQuestion}
          open={isOpenUpdateMCQS}
          handleClose={() => {
            setOpenUpdateMCQS(false);
            setToBeUpdatedQuestion(null);
          }}
          handleSubmit={(q) => updateQuestion(q)}
        />
      )}
      <NewBlankDialog
        open={isOpenBlank}
        handleClose={() => setOpenBlank(false)}
        handleSubmit={(q) => formik.setFieldValue('questions', [...formik.values.questions, q])}
      />
      {toBeUpdatedQuestion && (
        <UpdateBlankDialog
          question={toBeUpdatedQuestion}
          open={isOpenUpdateBlank}
          handleClose={() => {
            setOpenUpdateBlank(false);
            setToBeUpdatedQuestion(null);
          }}
          handleSubmit={(q) => updateQuestion(q)}
        />
      )}
      <NewTrueFalseDialog
        open={isOpenTrueFalse}
        handleClose={() => setOpenTrueFalse(false)}
        handleSubmit={(q) => formik.setFieldValue('questions', [...formik.values.questions, q])}
      />
      {toBeUpdatedQuestion && (
        <UpdateTrueFalseDialog
          question={toBeUpdatedQuestion}
          open={isOpenUpdateTrueFalse}
          handleClose={() => {
            setOpenUpdateTrueFalse(false);
            setToBeUpdatedQuestion(null);
          }}
          handleSubmit={(q) => updateQuestion(q)}
        />
      )}
      <div
        className={`flex flex-col gap-3 p-3 lg:w-11/12 border rounded-xl ${
          formik.touched.questions && formik.errors.questions && 'border-red-500'
        }`}
      >
        <div className="flex items-center justify-between">
          <Typography variant="h6" color="primary">
            Questions
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            className="self-end"
            onClick={(e) => handleMenuOpen(e)}
          >
            New Question
          </Button>
          <Menu
            open={open}
            onClose={() => handleMenuClose()}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disableRipple onClick={() => openDialog('MCQS')}>
              MCQS
            </MenuItem>
            <MenuItem disableRipple onClick={() => openDialog('Blank')}>
              Blank
            </MenuItem>
            <MenuItem disableRipple onClick={() => openDialog('TrueFalse')}>
              True/False
            </MenuItem>
          </Menu>
        </div>
        {formik.values.questions.map((q, index) => (
          <Stack component={Card} key={q.id} className="p-3 overflow-auto">
            <Typography variant="body1">
              {index + 1}
              )&nbsp;
              {q.statement}
            </Typography>
            {q.image && (
              <img
                src={typeof q.image === 'string' ? q.image : URL.createObjectURL(q.image)}
                alt="preview"
                className="self-center w-full max-w-xs"
              />
            )}
            {q.type === 'MCQS' && (
              <>
                <Typography variant="body2">
                  A:&nbsp;
                  {q.A}
                </Typography>
                <Typography variant="body2">
                  B:&nbsp;
                  {q.B}
                </Typography>
                <Typography variant="body2">
                  C:&nbsp;
                  {q.C}
                </Typography>
                <Typography variant="body2">
                  D:&nbsp;
                  {q.D}
                </Typography>
              </>
            )}
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <Typography variant="body1">
                Answer:&nbsp;
                {q.answer}
              </Typography>
              <Typography variant="body1">
                Duration:&nbsp;
                {q.duration}
                &nbsp;seconds
              </Typography>
              <div className="flex items-center gap-3">
                <IconButton variant="contained" color="error" onClick={() => deleteQuestion(q.id)}>
                  <Delete />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setToBeUpdatedQuestion(() => q);
                    openUpdateDialog(q.type);
                  }}
                >
                  <Edit />
                </IconButton>
              </div>
            </div>
          </Stack>
        ))}
      </div>
      {formik.touched.questions && formik.errors.questions && (
        <small className="-mt-5 text-red-500">{formik.errors.questions}</small>
      )}
    </form>
  );
}
