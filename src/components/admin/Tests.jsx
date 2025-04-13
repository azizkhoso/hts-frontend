/* eslint-disable no-underscore-dangle */
import React from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  Card,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';

import { Edit, Delete, Add } from '@mui/icons-material';

import date from 'date-and-time';

import { useQuery, useMutation } from 'react-query';

import { useDispatch } from 'react-redux';
import { getTests, deleteTest } from '../../api/admin';
import { addErrorToast, addSuccessToast } from '../../redux/actions/toasts';

import NewTest from '../teacher/newTest';
import UpdateTest from '../teacher/updateTest';
import Submissions from './Submissions';

export default function Tests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tests, setTests] = React.useState([]);
  const { isLoading, refetch } = useQuery('tests', getTests, {
    onSuccess: ({ data }) => setTests(data.tests),
    onError: (err) =>
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message })),
  });
  const deleteMutation = useMutation((_id) => deleteTest(_id), {
    onSuccess: ({ data }) => {
      dispatch(addSuccessToast({ message: `${data.test.title} deleted successfully` }));
      refetch();
    },
    onError: (err) =>
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message })),
  });
  function handleDeleteTest(_id) {
    const test = tests.find((t) => t._id === _id);
    const now = new Date();
    const startsAt = new Date(test.startsAt);
    const submittableBefore = new Date(test.submittableBefore);
    if (
      date.subtract(submittableBefore, now).toSeconds() > 0 &&
      date.subtract(now, startsAt).toSeconds() > 0
    ) {
      dispatch(addErrorToast({ message: 'Can not delete test while it is active' }));
    } else {
      deleteMutation.mutate(_id);
    }
  }
  React.useEffect(() => {
    refetch();
  }, []);
  if (isLoading)
    return (
      <div className="relative inset-0 flex items-center justify-center w-full h-full">
        <CircularProgress />
      </div>
    );
  return (
    <Routes>
      <Route
        index
        element={
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex justify-end w-full">
              <Button variant="outlined" startIcon={<Add />} onClick={() => navigate('new-test')}>
                New Test
              </Button>
            </div>
            <Typography variant="h6" align="center">
              Tests
            </Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Test Title</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Starts At</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Submittable Before</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests.map((test, index) => (
                    <TableRow key={test._id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{test.title}</TableCell>
                      <TableCell align="center">{test.subject}</TableCell>
                      <TableCell align="center" style={{ minWidth: '100px' }}>
                        {date.format(new Date(test.startsAt), 'DD-MMM-YYYY hh:mm A')}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: '100px' }}>
                        {test.price === 0 ? 'Free' : test.price}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: '100px' }}>
                        {date.format(new Date(test.submittableBefore), 'DD-MMM-YYYY hh:mm A')}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => navigate(`update/${test._id}`)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteTest(test._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => navigate(`submissions/${test._id}`)}>
                          Result
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }
      />
      <Route path="/new-test" setTests={setTests} element={<NewTest />} />
      <Route path="/update/:_id" setTests={setTests} element={<UpdateTest />} />
      <Route path="/:id" element={<h1>View Test</h1>} />
      <Route path="/submissions/:testId/*" element={<Submissions />} />
    </Routes>
  );
}
