import React from 'react';

import { Typography } from '@mui/material';

export default function NotFound() {
  return (
    <div className="relative flex w-full h-full">
      <Typography variant="h3" color="GrayText" className="m-auto">
        404, sorry page not found :(
      </Typography>
    </div>
  );
}
