import React from 'react';

import {
  Typography,
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function Profile() {
  const teacherData = useSelector((st) => st.account.teacher);
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center">Profile</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container xs={12} lg={8} alignItems="center" rowSpacing={1}>
          {/* <Grid item xs={12}>
            <Typography variant="h6" color="primary">Profile Settings</Typography>
          </Grid> */}

          <Grid item xs={4} md={4} lg={3}>
            <Typography variant="body1">Full Name</Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Typography variant="body1">{teacherData.fullName}</Typography>
          </Grid>

          <Grid item xs={4} md={4} lg={3}>
            <Typography variant="body1">Email</Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Typography variant="body1">{teacherData.email}</Typography>
          </Grid>

          <Grid item xs={4} md={4} lg={3}>
            <Typography variant="body1">CNIC</Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Typography variant="body1">{teacherData.cnic}</Typography>
          </Grid>

          <Grid item xs={4} md={4} lg={3}>
            <Typography variant="body1">Subjects</Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Typography variant="body1">{teacherData.subjects.join(', ')}</Typography>
          </Grid>
        </Grid>

        {/* <Grid item container>
          <Typography variant="h6" color="primary">Personal</Typography>
        </Grid> */}
      </Grid>
    </div>
  );
}
