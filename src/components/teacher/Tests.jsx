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

import NewTest from './newTest';
import UpdateTest from './updateTest';

export default function Tests() {
  const navigate = useNavigate();
  const [tests, setTests] = React.useState([
    {
      id: 'e1',
      title: 'English Test 1',
      subject: 'English',
      duration: 180, // seconds
      startsAt: Number(new Date()) + 10000000000,
      qualification: 'XI',
      teacher: {
        id: 't1',
        name: 'Teacher 1',
      },
      questions: [],
    },
  ]);
  return (
    <Routes>
      <Route
        index
        element={(
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex justify-end w-full">
              <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-test')}>New Test</Button>
            </div>
            <Typography variant="h6" align="center">Tests</Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Test Title</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Starts At</TableCell>
                    <TableCell align="center">Qualification</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tests.map((test, index) => (
                      <TableRow key={test.id}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{test.title}</TableCell>
                        <TableCell align="center">{test.subject}</TableCell>
                        <TableCell align="center" style={{ minWidth: '100px' }}>{(new Date(test.startsAt)).toDateString()}</TableCell>
                        <TableCell align="center">{test.qualification}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => navigate(`update/${test.id}`)}>
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
      <Route path="/new-test" setTests={setTests} element={<NewTest />} />
      <Route path="/update/:id" setTests={setTests} element={<UpdateTest test={tests[0]} />} />
      <Route path="/:id" element={<h1>View Test</h1>} />
    </Routes>
  );
}
