/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import {
  Typography,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from '@mui/material';

import date from 'date-and-time';

import { useSelector, useDispatch } from 'react-redux';

import { useQuery } from 'react-query';
import { getTests } from '../../api/student';

import { addErrorToast } from '../../redux/actions/toasts';
import AttemptTest from './AttemptTest';
import TestApplicationDialog from './TestApplicationDialog';

export default function Tests() {
  const student = useSelector((state) => state.account.student);
  const dispatch = useDispatch();
  const [tests, setTests] = React.useState([]);
  const [selectedTest, setSelectedTest] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const { isLoading } = useQuery(['tests', student._id], getTests, {
    onSuccess: ({ data }) => setTests(data.tests),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  if (isLoading) return <div className="relative inset-0 flex items-center justify-center w-full h-full"><CircularProgress /></div>;
  return (
    <Routes>
      <Route
        index
        element={(
          <div className="page-content">
            <Typography variant="h6" align="center">Tests</Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Test Title</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Starts At</TableCell>
                    <TableCell align="center">Submittable Before</TableCell>
                    <TableCell align="center">Created By</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tests.map((test, index) => (
                      <TableRow key={test._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{test.title}</TableCell>
                        <TableCell align="center">{test.subject}</TableCell>
                        <TableCell align="center" style={{ minWidth: '100px' }}>
                          {date.format(new Date(test.startsAt), 'DD-MMM-YYYY hh:mm A')}
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: '100px' }}>
                          {date.format(new Date(test.submittableBefore), 'DD-MMM-YYYY hh:mm A')}
                        </TableCell>
                        <TableCell align="center">{test.createdBy}</TableCell>
                        <TableCell align="center">
                          <Button variant="text" color="primary" onClick={() => { setOpenDialog(true); setSelectedTest(test) }}>Apply</Button>
                          <Link to={`../../tests/${test._id}`}>
                            <Button variant="text" color="primary">Attempt</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            {
              openDialog && (
                <TestApplicationDialog open={openDialog} handleClose={() => setOpenDialog(false)} test={selectedTest} />
              )
            }
          </div>
        )}
      />
      <Route path="/:id" element={<AttemptTest />} />
    </Routes>
  );
}
