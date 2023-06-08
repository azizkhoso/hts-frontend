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
} from '@mui/material';

import {
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';
import NewTeacher from './NewTeacher';

export default function Teachers() {
  const navigate = useNavigate();
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
                <TableBody>
                  {
                    [].map((teacher, index) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{teacher.fullName}</TableCell>
                        <TableCell>{teacher.subjects.join(',')}</TableCell>
                        <TableCell align="center">{teacher.subject}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => navigate(`update/${teacher.id}`)}>
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
              </Table>
            </TableContainer>
          </div>
        )}
      />
      <Route path="/new-teacher" element={<NewTeacher />} />
      <Route path="/update/:id" element={<h1>Update teacher</h1>} />
      <Route path="/:id" element={<h1>View Teacher</h1>} />
    </Routes>
  );
}
