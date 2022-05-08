import React from 'react';

import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';

import { ExpandMore } from '@mui/icons-material';

import { Link } from 'react-router-dom';

import { nanoid } from 'nanoid';

import { useDispatch } from 'react-redux';

import { useQuery } from 'react-query';
import { getAnnouncements } from '../../api/others';

import { addErrorToast } from '../../redux/actions/toasts';

import styles from './Announcements.module.css';

function Announcemnts() {
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = React.useState([]);
  const { isLoading } = useQuery('allAnnouncements', getAnnouncements, {
    onSuccess: (r) => setAnnouncements(r.data.announcements),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  })
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
          isLoading && (
            <div className="flex w-full">
              <CircularProgress className="m-auto" />
            </div>
          )
        }
        {
          !isLoading && announcements.length === 0 && (
            <Typography align="center">No announcements yet</Typography>
          )
        }
        {
          !isLoading && announcements.map((ann) => (
            <Accordion key={nanoid()}>
              <AccordionSummary expandIcon={<ExpandMore />}>{ann.title}</AccordionSummary>
              <AccordionDetails className="bg-gray-100 stack">
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
