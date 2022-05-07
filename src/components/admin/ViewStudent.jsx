import React from 'react';

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

export default function ViewStudent() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center">Student Name</Typography>
      <TableContainer className="w-full" component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Test Title</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Date Conducted</TableCell>
              <TableCell align="center">Obtained Marks</TableCell>
              <TableCell align="center">Total Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              [].map((submission, index) => (
                <TableRow key={submission.id}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{submission.test.title}</TableCell>
                  <TableCell align="center">{submission.test.subject}</TableCell>
                  <TableCell align="center">{submission.test.startedAt}</TableCell>
                  <TableCell align="center">{submission.test.totalMarks}</TableCell>
                  <TableCell align="center">{submission.student.obtainedMarks}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
