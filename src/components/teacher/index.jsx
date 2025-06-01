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

import { useSelector } from 'react-redux';

import Sidebar from './sidebar';
import Tests from './Tests';
import Profile from './Profile';
import Announcements from './Announcements';

export default function Teacher() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { account } = useSelector((s) => s);
  if (!account.teacher) return <Navigate replace to="/login/teacher" />;
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
      <section className="flex-grow md:w-9/12 lg:w-9/12 2xl:w-10/12">
        <div className={`flex ${openDrawer ? 'justify-between' : 'justify-end'} w-full py-2 px-4 border-b`} style={{ minHeight: '40px' }}>
          <IconButton className="block md:hidden" onClick={() => setOpenDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h5" className="flex items-center justify-center flex-grow">{account.teacher.fullName}</Typography>
          <IconButton>
            <Logout />
          </IconButton>
        </div>
        <div className="block p-3">
          <Routes>
            <Route index element={<Navigate replace to="/teacher/dashboard" />} />
            <Route path="/dashboard" element={<h1>Teacher dashboard</h1>} />
            <Route path="/announcements/*" element={<Announcements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tests/*" element={<Tests />} />
          </Routes>
        </div>
      </section>
    </div>
  );
}
