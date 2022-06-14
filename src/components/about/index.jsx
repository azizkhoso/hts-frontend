import React from 'react';

import {
  Typography,
  Container,
  Card,
} from '@mui/material';

import styles from './AboutUs.module.css';

function About() {
  return (
    <div className="landing-page">
      <Container disableGutters maxWidth="false" className={styles.header}>
        <Typography
          variant="h4"
          color="primary"
          className={styles['header-heading']}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          className={styles['header-paragraph']}
        >
          We provide online tests in a unique way
        </Typography>
      </Container>
      <Container disableGutters maxWidth="md" className={styles['content-container']}>
        <Card className={styles.card} elevation={1}>
          <Typography className={styles.heading}>Hope Testing Service</Typography>
          <Typography variant="body2" className={styles.content}>
            We are a non-profit organization that administrates self-assessment
            tests for youth, to provide aspirants with a realistic, exact simulation
            environment, to assess, judge and analyze their capabilities before
            taking the real exams.
          </Typography>
        </Card>
        <Card className={styles.card} elevation={1}>
          <Typography className={styles.heading}>
            Vision
          </Typography>
          <Typography variant="body2" className={styles.content}>
            Hope Testing Service-HTS inject high self esteem that is base for the
            building of success. Our strong Believe is that &quot;Desire become dream
            and soon be achieved when supported by Direction, Determination,
            Discipline & Deadline&quot;
          </Typography>
        </Card>
        <Card className={styles.card} elevation={1}>
          <Typography variant="h2" className={styles.heading}>
            Mission
          </Typography>
          <Typography variant="body2" className={styles.content}>
            In this competitive era HTS mission is to endow our students, aspirants with
            the coping skills and abilities withstanding the requirements of present—era
            institutes & make them stand ahead of the rest of their counterparts. To proceed
            with our objective, We arrange highly competent tests in a disciplined environment
            for students to grasp their potential, & farther exceed it.
          </Typography>
        </Card>
      </Container>
    </div>
  );
}

export default About;
