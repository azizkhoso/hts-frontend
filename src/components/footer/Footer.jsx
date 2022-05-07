import React from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  Container,
  Typography,
} from '@mui/material';

import logo from '../../assets/logo.png';
import facebookLogo from '../../assets/facebook.png';
import instagramLogo from '../../assets/instagram.svg';
import youtubeLogo from '../../assets/youtube.svg';

import styles from './Footer.module.css';

// Footer should not be visible on following pages
const isNotVisibleOn = [
  '/login/admin',
  '/admin',
  '/student',
  '/teacher',
];

export default function Footer() {
  const socialMedia = [
    { title: 'facebook', image: facebookLogo, link: '/facebook' },
    { title: 'instagram', image: instagramLogo, link: '/instagram' },
    { title: 'youtube', image: youtubeLogo, link: '/youtube' },
  ];
  const { pathname } = useLocation();
  if (
    (isNotVisibleOn.find((r) => pathname.startsWith(r)))
  ) return <></>;
  return (
    <>
      <Container disableGutters maxWidth="false" className={styles.container}>
        <Container maxWidth="xl" className={styles.content}>
          <div className={styles['brand-and-links']}>
            <img src={logo} alt="hts" className="w-36" />
            <div className="stack">
              <Link to="/about-us">
                <Typography variant="h6">About</Typography>
              </Link>
              <Link to="/contact">
                <Typography variant="h6">Contact</Typography>
              </Link>
              <Link to="/results">
                <Typography variant="h6">Results</Typography>
              </Link>
              <Link to="/announcements">
                <Typography variant="h6">Announcemnts</Typography>
              </Link>
              <Link to="/faq">
                <Typography variant="h6">FAQ</Typography>
              </Link>
            </div>
          </div>
          <div className="stack">
            <Typography variant="h6">Social Media</Typography>
            <div className="flex gap-6">
              {
                socialMedia.map((item) => (
                  <Link to={item.link}>
                    <img src={item.image} alt={item.title} className="w-7" />
                  </Link>
                ))
              }
            </div>
          </div>
        </Container>
      </Container>
      <div className="w-full py-3">
        <Container maxWidth="xl">
          <Typography variant="h6" color="gray">&copy; 2022, Hope Testing Service. All Rights Reserved</Typography>
        </Container>
      </div>
    </>
  );
}
