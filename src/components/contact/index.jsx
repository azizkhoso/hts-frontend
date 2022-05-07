import React from 'react';

import {
  Typography,
  Container,
  Card,
  TextField,
  Button,
} from '@mui/material';

import styles from './Contact.module.css';

function Contact() {
  return (
    <div className="landing-page">
      <Container disableGutters maxWidth="false" className={styles.header}>
        <Typography
          variant="h2"
          color="primary"
          className={styles['header-heading']}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          className={styles['header-paragraph']}
        >
          Easy way to reach us
        </Typography>
      </Container>
      <Container disableGutters maxWidth="md" className={styles['content-container']}>
        <Card component="form" className={styles.card}>
          <Typography variant="h6">Have a question suggesstion?</Typography>
          <div className="flex flex-wrap justify-between w-full gap-3">
            <TextField
              variant="outlined"
              label="Full name"
              className="w-full md:w-5/12"
            />
            <TextField
              variant="outlined"
              label="Email"
              className="w-full md:w-6/12"
            />
            <TextField
              variant="outlined"
              label="Subject"
              className="w-full"
            />
            <TextField
              variant="outlined"
              label="Message"
              multiline
              rows={3}
              className="w-full"
            />
            <Button
              variant="contained"
              type="submit"
              className="self-center"
            >
              Submit
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Contact;
