import { IconButton, Typography } from '@mui/material';
import React from 'react';

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  Logout,
  Menu,
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/account';

import * as utils from '../../utils';

import Sidebar from './sidebar';
import Tests from './Tests';

export default function Student() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.account);
  function handleLogout() {
    utils.removeToken();
    dispatch(logout());
  }
  if (!student) return <Navigate replace to="/login/student" />;
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
      <section className="flex-grow md:w-9/12 lg:w-9/12 2xl:w-10/12">
        <div className={`flex ${openDrawer ? 'justify-between' : 'justify-end'} w-full py-2 px-4 border-b`} style={{ minHeight: '40px' }}>
          <IconButton className="block md:hidden" onClick={() => setOpenDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h5" align="center" className="w-full">{student.fullName}</Typography>
          <IconButton onClick={() => handleLogout()}>
            <Logout />
          </IconButton>
        </div>
        <div className="block p-3">
          <Routes>
            <Route index element={<Navigate replace to="/student/dashboard" />} />
            <Route path="/dashboard" element={<h1>Student dashboard</h1>} />
            <Route path="/announcements" element={<h1>Student Announcements</h1>} />
            <Route path="/profile" element={<h1>Student profile</h1>} />
            <Route path="/tests/*" element={<Tests />} />
          </Routes>
        </div>
      </section>
    </div>
  );
}
