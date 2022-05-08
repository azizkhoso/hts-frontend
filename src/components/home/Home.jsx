import React from 'react';

import { Link } from 'react-router-dom';

import {
  Typography,
  Container,
  Card,
  Button,
} from '@mui/material';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import moment from 'moment';

import ImportantAnnouncementsDialog from './ImportantAnnouncementsDialog';

import futureBeginsHere from '../../assets/future-begins-here.png';
import qualityTests from '../../assets/quality-tests.jpg';
import excellence from '../../assets/excellence.jpeg';
import learningExcellence from '../../assets/excellence.png';
import community from '../../assets/community.png';
import leadership from '../../assets/leadership.png';

import styles from './Home.module.css';

  const slides = [
    { title: 'Future Begins Here', image: futureBeginsHere },
    { title: 'Quality Tests Easily Accessible', image: qualityTests },
    { title: 'Pride of Excellence', image: excellence },
  ];
  const results = [
    /* {
      title: 'English Test Class XII - Lesson 3',
      subject: 'English',
      date: new Date(),
      link: '/results/3',
    },
    {
      title: 'English Test Class XII - Lesson 3',
      subject: 'English',
      date: new Date(),
      link: '/results/3',
    },
    {
      title: 'English Test Class XII - Lesson 3',
      subject: 'English',
      date: new Date(),
      link: '/results/3',
    }, */
  ];
  const services = [
    { title: 'Learning Excellence', icon: learningExcellence, description: 'Education is a commitment to excellence in Teaching and Learning' },
    { title: 'Exemplary Community', icon: community, description: 'We have an exemplary learning community and champions of our success' },
    { title: 'Empowered Student', icon: leadership, description: 'We make sure every student is inspired, challenged and empowered' },
  ];

function Home() {
  return (
    <div className="home">
      <div className="w-full stack">
        <AliceCarousel
          disableButtonsControls
          disableDotsControls
          infinite
          autoPlay
          animationDuration={1000}
          autoPlayInterval={5000}
          items={slides.map((item) => (
            <div key={item.title} className={styles['slide-root']} style={{ backgroundImage: `url(${item.image})` }}>
              <div className={styles['slide-content']}>
                <Typography variant="h4" className={styles['slide-title']}>
                  {item.title}
                </Typography>
              </div>
            </div>
          ))}
        />
        <Typography variant="h4" className="text-center my-7">Results</Typography>
        <Container maxWidth="xl" className={styles['results-container']}>
          {
            results.length === 0 && (
              <Typography align="center">No results yet</Typography>
            )
          }
          {
            results.map((item) => (
              <Card key={`${item.title}-${item.subject}`} className="px-4 stack" style={{ maxWidth: '230px' }}>
                <Typography variant="h6" className={styles['result-title']}>{item.title}</Typography>
                <div className="flex">
                  <span className="w-1/3"><Typography className="font-bold">Subject:</Typography></span>
                  <span className="flex-grow"><Typography>{item.subject}</Typography></span>
                </div>
                <div className="flex">
                  <span className="w-1/3"><Typography className="font-bold">Date:</Typography></span>
                  <span className="flex-grow"><Typography>{moment(item.date).format('MMM DD, YYYY')}</Typography></span>
                </div>
                <Link to={item.link}>
                  <Button variant="text" className="px-0">View Details</Button>
                </Link>
              </Card>
            ))
          }
        </Container>
        <Typography variant="h4" className="text-center my-7">Our Quality Services</Typography>
        <div className={styles['services-root']}>
          <Container maxWidth="xl" className={styles['services-container']}>
            {
              services.map((service) => (
                <div className="gap-2 stack" style={{ width: '250px' }}>
                  <img src={service.icon} alt={service.title} className="mx-auto w-14" />
                  <Typography variant="h5" className={styles['service-title']}>{service.title}</Typography>
                  <Typography className={styles['service-description']}>{service.description}</Typography>
                </div>
              ))
            }
          </Container>
        </div>
      </div>
      <ImportantAnnouncementsDialog />
    </div>
  );
}

export default Home;
