import React from 'react';

import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from '@mui/material';

import { Close } from '@mui/icons-material';

export default function ImportantAnnouncementsDialog() {
  const [announcements, setAnnouncements] = React.useState([]);
  const [isOpenedImpAnn, setIsOpened] = React.useState(Boolean(sessionStorage.getItem('isOpenedImpAnn') || true));
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/announcements?isImportant=true`)
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data.announcements);
        if (data?.announcements?.length === 0) {
          sessionStorage.setItem('isOpenedImpAnn', 'true');
        } else {
          setIsOpened(Boolean(sessionStorage.getItem('isOpenedImpAnn')) || false)
        }
      });
  }, []);
  return (
    <Dialog fullWidth maxWidth="lg" open={!isOpenedImpAnn}>
      <DialogTitle className="flex justify-between">
        <Typography variant="h4" color="primary">Important Announcements</Typography>
        <IconButton onClick={() => {setIsOpened(true); sessionStorage.setItem('isOpenedImpAnn', 'true')}}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="gap-3 stack">
        {
          announcements.map((ann) => (
            <div className="p-3 border-2 rounded-lg stack">
              <Typography variant="h6">{ann.title}</Typography>
              <Typography variant="body1">{ann.details}</Typography>
              {
                ann.link && (
                  <a href={ann.link}>
                    <Typography className="font-semibold" color="primary">View More</Typography>
                  </a>
                )
              }
            </div>
          ))
        }
      </DialogContent>
    </Dialog>
  )
}