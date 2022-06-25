import React from 'react';

import { Routes, Route, useParams } from 'react-router-dom';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useQuery } from 'react-query';
import { getSubmissions } from '../../api/admin';
import { useDispatch } from 'react-redux';

import { addErrorToast } from '../../redux/actions/toasts';

export default function Submissions() {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const [submissions, setSubmissions] = React.useState([]);
  const { isLoading } = useQuery(['admin-submissions', testId], () => getSubmissions(testId), {
    onSuccess: ({ data }) => setSubmissions(data.submissions),
    onError: (err) =>
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message })),
  });
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
            <Typography variant="h6" align="center">
              Submissions
            </Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Test</TableCell>
                    <TableCell align="center">Total Correct</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((submission, index) => (
                    <TableRow key={submission._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{submission.submittedBy.fullName}</TableCell>
                      <TableCell align="center">{submission.submittedBy.email}</TableCell>
                      <TableCell align="center">{submission.test.title}</TableCell>
                      <TableCell align="center">{submission.totalCorrect}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }
      />
    </Routes>
  );
}
