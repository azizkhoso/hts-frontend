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
} from '@mui/material';

import ViewStudent from './ViewStudent';

export default function Students() {
  const navigate = useNavigate();
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
                    <TableCell align="center">Qualification</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    [].map((student, index) => (
                      <TableRow key={student.id} onClick={() => navigate(`${student.id}`)}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">{student.cnic}</TableCell>
                        <TableCell align="center">{student.qualification}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      />
      <Route path="/:id" element={<ViewStudent />} />
    </Routes>
  );
}
