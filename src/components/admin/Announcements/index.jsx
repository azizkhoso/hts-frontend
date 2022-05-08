/* eslint-disable no-underscore-dangle */
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
} from '@mui/material';

import {
  Delete,
  Add,
} from '@mui/icons-material';

import { useQuery, useMutation, useQueryClient } from 'react-query';

import { useDispatch } from 'react-redux';
import { getAnnouncements, deleteAnnouncement } from '../../../api/admin';
import { addErrorToast, addSuccessToast } from '../../../redux/actions/toasts';
import NewAnnouncement from './NewAnnouncement';

export default function Announcements() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [announcements, setAnnouncements] = React.useState([]);
  const { isLoading } = useQuery('announcements', getAnnouncements, {
    onSuccess: ({ data }) => setAnnouncements(data.announcements),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  const deleteMutation = useMutation(
    (_id) => deleteAnnouncement(_id),
    {
      onSuccess: ({ data }) => {
        dispatch(addSuccessToast({ message: `${data.announcement.title} deleted successfully` }));
        queryClient.invalidateQueries('announcements');
      },
      onError: (err) => dispatch(
        addErrorToast({ message: err.response?.data?.error || err.message }),
      ),
    },
  );
  function handleDeleteAnnouncement(_id) {
    deleteMutation.mutate(_id);
  }
  if (isLoading) return <div className="relative inset-0 flex items-center justify-center w-full h-full"><CircularProgress /></div>;
  return (
    <Routes>
      <Route
        index
        element={(
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex justify-end w-full">
              <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-announcement')}>New Announcement</Button>
            </div>
            <Typography variant="h6" align="center">Announcements</Typography>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Important</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    announcements.map((announcement, index) => (
                      <TableRow key={announcement._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{announcement.title}</TableCell>
                        <TableCell align="center">{announcement.isImportant ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleDeleteAnnouncement(announcement._id)}>
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
      <Route path="/new-announcement" element={<NewAnnouncement />} />
    </Routes>
  );
}
