import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material';

import {
  Dashboard,
  Announcement,
  Close,
  Person,
  Quiz,
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../../../assets/logo.png';
import student from '../../../assets/student.png';
import teacher from '../../../assets/teacher.png';

export default function DrawerContent({ handleClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const listItems = [
    {
      title: 'Dashboard',
      link: '/admin/dashboard',
      icon: <Dashboard />,
    },
    {
      title: 'Announcements',
      link: '/admin/announcements',
      icon: <Announcement />,
    },
    {
      title: 'Students',
      link: '/admin/students',
      icon: <img src={student} alt="student" className="w-6 h-6" />,
    },
    {
      title: 'Teachers',
      link: '/admin/teachers',
      icon: <img src={teacher} alt="teacher" className="w-6 h-6" />,
    },
    {
      title: 'Tests',
      link: '/admin/tests',
      icon: <Quiz />,
    },
    {
      title: 'Profile',
      link: '/admin/profile',
      icon: <Person />,
    },
  ];
  return (
    <Stack sx={{ width: '100%' }}>
      <span className="flex justify-end md:hidden">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </span>
      <img src={logo} alt="hts" className="self-center w-40 my-3" />
      <List sx={{ py: 0 }}>
        <Divider orientation="horizontal" />
        {
          listItems.map((item) => (
            <ListItemButton key={item.title} className={`${location.pathname.startsWith(item.link) && 'bg-blue-100'}`} onClick={() => navigate(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))
        }
      </List>
    </Stack>
  );
}

DrawerContent.defaultProps = {
  handleClose: () => {},
};

DrawerContent.propTypes = {
  handleClose: PropTypes.func,
};
