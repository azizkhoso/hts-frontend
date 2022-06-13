/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';

import {
  Check,
  Close,
} from '@mui/icons-material';

import { useQuery, useMutation } from 'react-query';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import { useDispatch } from 'react-redux';
import { getTestApplications, getTests, updateTestApplications } from '../../api/admin';
import { addErrorToast, addSuccessToast } from '../../redux/actions/toasts';

export default function TestApplications() {
  const dispatch = useDispatch();
  const [testApplications, setTestApplications] = React.useState([]);
  const [tests, setTests] = React.useState([]);
  const [approved, setApproved] = React.useState(false);
  const [selectedTest, setSelectedTest] = React.useState({});
  useQuery('tests', getTests, {
    onSuccess: ({ data }) => {
      setTests(data.tests);
    },
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  const { isLoading, refetch } = useQuery(['testApplications', selectedTest._id], () => getTestApplications(selectedTest._id), {
    onSuccess: ({ data }) => {
      setTestApplications(data.applications);
    },
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  const { mutate } = useMutation(
    (data) => updateTestApplications(data),
    {
      onSuccess: () => {
        dispatch(addSuccessToast({ message: `Application updated successfully` }));
        refetch(selectedTest._id);
      },
      onError: (err) => dispatch(
        addErrorToast({ message: err.response?.data?.error || err.message }),
      ),
    },
  );
  if (isLoading) return <div className="relative inset-0 flex items-center justify-center w-full h-full"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex justify-end w-full gap-2 items-center">
        <Select
          title="Select Test"
          className="min-w-16"
          size="small"
          value={selectedTest._id || 'select-test'}
          onChange={(e) => {
            const foundTest = tests.find((t) => t._id === e.target.value);
            setSelectedTest(foundTest);
          }}
        >
          {
            tests?.map((test) => (
              <MenuItem value={test._id} key={test._id}>{test.title}</MenuItem>
            ))
          }
          <MenuItem value="select-test" disabled>Select Test</MenuItem>
        </Select>
        <Select
          title="Select Status"
          className="min-w-16"
          size="small"
          value={approved}
          onChange={(e) => setApproved(e.target.value === 'true')}
        >
          <MenuItem value="true">Approved</MenuItem>
          <MenuItem value="false">Rejected</MenuItem>
        </Select>
      </div>
      <Typography variant="h6" align="center">Test Applications</Typography>
      <TableContainer className="w-full" component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Test Title</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Student</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              testApplications.filter((app) => app.approved === approved).map((application, index) => (
                <TableRow key={application._id}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{application.test.title}</TableCell>
                  <TableCell align="center">{application.test.subject}</TableCell>
                  <TableCell align="center" style={{ minWidth: '100px' }}>
                    {application.student.fullName}
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: '100px' }}>
                    {application.student.email}
                  </TableCell>
                  <TableCell align="center">
                    <PhotoProvider>
                      <PhotoView src={`${process.env.REACT_APP_BACKEND_URL}/challans/${application.image}`}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/challans/${application.image}`} alt="application" className="w-8 h-8" />
                      </PhotoView>
                    </PhotoProvider>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => mutate({ _id: application._id, approved: true })}>
                      <Check color={application.approved ? 'primary' : 'inherit'} />
                    </IconButton>
                    <IconButton onClick={() => mutate({ _id: application._id, approved: false })}>
                      <Close color={!application.approved ? 'error' : 'inherit'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
