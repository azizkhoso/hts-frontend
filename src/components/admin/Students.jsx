import React from 'react';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';

import ViewStudent from './ViewStudent';
import { useQuery } from 'react-query';
import { getStudents } from '../../api/admin/students';
import { useDispatch } from 'react-redux';

import { addErrorToast } from '../../redux/actions/toasts';

export default function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [students, setStudents] = React.useState([]);
  const { isLoading } = useQuery(['admin-students'], () => getStudents(), {
    onSuccess: ({ data }) => setStudents(data.students),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  function handleDeleteStudent() {}
  if (isLoading) return <div className="relative inset-0 flex items-center justify-center w-full h-full"><CircularProgress /></div>;
  return (
    <Routes>
      <Route
        index
        element={(
          <div className="flex flex-col w-full h-full gap-6">
            <Typography variant="h6" align="center">Students</Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">CNIC</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    students.map((student, index) => (
                      <TableRow key={student._id} onClick={() => navigate(`${student._id}`)}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">{student.cnic}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => navigate(`update/${test._id}`)}>
                            <Visibility />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteStudent(test._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      />
      <Route path="/:_id" element={<ViewStudent />} />
    </Routes>
  );
}
