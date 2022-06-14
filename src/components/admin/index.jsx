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

import Sidebar from './sidebar';
import Tests from './Tests';
import Students from './Students';
import Teachers from './Teachers';
import Announcements from './Announcements';
import TestApplications from './TestApplications';

export default function Admin() {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { account } = useSelector((s) => s);
  if (!account.admin) return <Navigate replace to="/login/admin" />;
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
      <section className="flex-grow md:w-9/12 lg:w-9/12 2xl:w-10/12">
        <div className={`flex ${openDrawer ? 'justify-between' : 'justify-end'} w-full py-2 px-4 border-b`} style={{ minHeight: '40px' }}>
          <IconButton className="block md:hidden" onClick={() => setOpenDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h5" className="flex items-center justify-center flex-grow">Admin</Typography>
          <IconButton onClick={() => {dispatch({ type: 'LOGOUT' }); localStorage.removeItem('hts-token')}}>
            <Logout />
          </IconButton>
        </div>
        <div className="block p-3">
          <Routes>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<h1>Admin dashboard</h1>} />
            <Route path="/announcements/*" element={<Announcements />} />
            <Route path="/students/*" element={<Students />} />
            <Route path="/teachers/*" element={<Teachers />} />
            <Route path="/profile" element={<h1>Admin profile</h1>} />
            <Route path="/tests/*" element={<Tests />} />
            <Route path="/test-applications/*" element={<TestApplications />} />
          </Routes>
        </div>
      </section>
    </div>
  );
}
