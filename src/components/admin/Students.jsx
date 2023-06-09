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
  Pagination,
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';

import ViewStudent from './ViewStudent';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteStudent, getStudents } from '../../api/admin/students';
import { useDispatch } from 'react-redux';

import { addErrorToast, addSuccessToast } from '../../redux/actions/toasts';

export default function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [students, setStudents] = React.useState([]);
  const client = useQueryClient();
  const { isLoading } = useQuery(['admin-students', page], () => getStudents(page), {
    onSuccess: ({ data }) => setStudents(data.students),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  const { mutate } = useMutation((i) => deleteStudent(i), {
    onSuccess: () => {
      client.invalidateQueries('admin-students');
      addSuccessToast({ message: 'Student deleted successfully' })
    },
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
                      <TableRow key={student._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell role="button" onClick={() => navigate(`${student._id}`)}>{student.fullName}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">{student.cnic}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => navigate(`update/${student._id}`)}>
                            <Visibility />
                          </IconButton>
                          <IconButton onClick={() => mutate(student._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='mx-auto' count={10} page={page} onChange={(e, p) => setPage(p)}  />
          </div>
        )}
      />
      <Route path="/:_id" element={<ViewStudent />} />
    </Routes>
  );
}
