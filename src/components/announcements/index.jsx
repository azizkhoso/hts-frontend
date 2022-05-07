import React from 'react';

import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  // Button,
} from '@mui/material';

import { ExpandMore } from '@mui/icons-material';

import { Link } from 'react-router-dom';

import { nanoid } from 'nanoid';

import styles from './Announcements.module.css';

function Announcemnts() {
  const announcements = [
    { title: 'Announcement 1', details: 'The details are here', link: '/link-to-ann' },
    { title: 'Announcement 2', details: 'The details are here', link: '/link-to-ann' },
    { title: 'Announcement 3', details: 'The details are here', link: '' },
  ]
  return (
    <div className="landing-page">
      <Container maxWidth="lg" className={styles.header}>
        <Typography
          variant="h2"
          color="primary"
          className={styles['header-heading']}
        >
          Announcements
        </Typography>
      </Container>
      <Container maxWidth="lg" className="stack">
        {
          announcements.length === 0 && (
            <Typography align="center">No announcements yet</Typography>
          )
        }
        {
          announcements.map((ann) => (
            <Accordion key={nanoid()}>
              <AccordionSummary expandIcon={<ExpandMore />}>{ann.title}</AccordionSummary>
              <AccordionDetails className="stack bg-gray-100">
                {ann.details}
                {
                  ann.link && (
                    <Link to={ann.link}>
                      <Typography color="primary" className="mt-3">View More</Typography>
                    </Link>
                  )
                }
              </AccordionDetails>
            </Accordion>
          ))
        }
      </Container>
    </div>
  );
}

export default Announcemnts;
