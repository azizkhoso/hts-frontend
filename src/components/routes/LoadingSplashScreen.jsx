import React from 'react';

import { CircularProgress } from '@mui/material';

export default function LoadingSplashScreen() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <CircularProgress />
    </div>
  );
}
