import React from 'react';

import {
  Box,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getStudentSubmissions } from '../../api/admin/students';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { addErrorToast } from '../../redux/actions/toasts';
import { Else, If, Then } from 'react-if';

export default function ViewStudent() {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [submissions, setSubmissions] = React.useState([]);
  const { isLoading } = useQuery(['admin-student-submissions'], () => getStudentSubmissions(_id), {
    onSuccess: ({ data }) => setSubmissions(data.submissions),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
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
          <If condition={isLoading}>
            <Then>
              <Box display="flex" width="100%" height="100%">
                <CircularProgress sx={{ m: 'auto' }} />
              </Box>
            </Then>
            <Else>
              <TableBody>
                {
                  submissions.map((submission, index) => (
                    <TableRow key={submission.id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{submission.test.title}</TableCell>
                      <TableCell align="center">{submission.test.subject}</TableCell>
                      <TableCell align="center">{submission.test.startedAt}</TableCell>
                      <TableCell align="center">{submission.totalCorrect}</TableCell>
                      <TableCell align="center">{submission.test.totalMarks}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Else>
          </If>
        </Table>
      </TableContainer>
    </div>
  );
}
