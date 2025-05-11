import React from 'react';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

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
  Pagination,
} from '@mui/material';

import {
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';
import NewTeacher from './NewTeacher';
import { useQuery } from 'react-query';
import { Case, Default, Switch } from 'react-if';
import { getTeachers } from '../../api/admin/teachers';
import { addErrorToast } from '../../redux/actions/toasts';
import { useDispatch } from 'react-redux';
import UpdateTeacher from './UpdateTeacher';

export default function Teachers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [teachers, setTeachers] = React.useState([]);
  const { isLoading } = useQuery(['admin-teachers', page], () => getTeachers('', page), {
    onSuccess: (data) => {
      setTeachers(data.data.teachers);
    },
    onError: (err) => {
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message }));
    },
  });
  return (
    <Routes>
      <Route
        index
        element={(
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex justify-end w-full">
              <Button variant="outlined" startIcon={<Add />} onClick={() => navigate('new-teacher')}>New Teacher</Button>
            </div>
            <Typography variant="h6" align="center">Teachers</Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Subjects</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                {/* Loading state, no records state, and all rows, switch from 'react-if' */}
                <Switch>
                  <Case condition={isLoading}>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <CircularProgress size={24} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Case>
                  <Case condition={teachers.length === 0 && !isLoading}>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography variant="body1">No records found</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Case>
                  <Default>
                    <TableBody>
                      {
                        teachers.map((teacher, index) => (
                          <TableRow key={teacher._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{teacher.fullName}</TableCell>
                            <TableCell align="center">{teacher.email}</TableCell>
                            <TableCell>{teacher.subjects.join(',')}</TableCell>
                            <TableCell align="center">
                              <IconButton onClick={() => navigate(`update/${teacher._id}`)}>
                                <Edit />
                              </IconButton>
                              <IconButton>
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Default>
                </Switch>
              </Table>
            </TableContainer>
            <Pagination className='mx-auto' count={10} page={page} onChange={(e, p) => setPage(p)}  />
          </div>
        )}
      />
      <Route path="/new-teacher" element={<NewTeacher />} />
      <Route path="/update/:id" element={<UpdateTeacher />} />
      <Route path="/:id" element={<h1>View Teacher</h1>} />
    </Routes>
  );
}
