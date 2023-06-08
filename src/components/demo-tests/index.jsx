/* eslint-disable no-underscore-dangle */
import React from 'react';

import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';

import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Container,
  InputLabel,
  CircularProgress,
  Button,
  Card,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { useQuery } from 'react-query';
import { getDemoTests } from '../../api/others';

import { addErrorToast } from '../../redux/actions/toasts';

import AttempTest from './AttempTest';

import styles from './DemoTests.module.css';

const subjects = ['English', 'Math', 'Physics', 'Chemistery', 'Biology', 'MDCAT', 'ECAT', 'STS IBA', 'NTS', 'SPSC'];

function DemoTests() {
  const { search } = useLocation();
  const [filter, setFilter] = React.useState(queryString.parse(search));
  const [demoTests, setDemoTests] = React.useState([]);
  const dispatch = useDispatch();
  const { isLoading, isFetching, isError, data, refetch } = useQuery(
    ['demo-tests', filter],
    (values) => getDemoTests(values),
    {
      onSuccess: (r) => setDemoTests(r.data.demoTests),
      onError: (err) =>
        dispatch(addErrorToast({ message: err.response?.data?.error || err.message })),
    },
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(`?${queryString.stringify(filter)}`);
    refetch(filter);
  }, [filter, navigate, refetch]);
  return (
    <Routes>
      <Route
        index
        element={
          <div className="block">
            <Typography variant="h6" color="primary" align="center">
              Demo Tests
            </Typography>
            <Container maxWidth="md">
              <div className={styles.filter}>
                <Typography variant="h6">Filter</Typography>
                <span className="flex-grow w-full md:w-auto" />
                <FormControl size="small" sx={{ minWidth: '130px' }}>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    label="subject"
                    size="small"
                    value={filter.subject}
                    onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
                  >
                    {subjects.map((q) => (
                      <MenuItem key={q} value={q}>
                        {q}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {data && (
                <div className={styles['cards-container']}>
                  {demoTests.length === 0 && (
                    <Typography variant="body1" align="center">
                      No tests available yet
                    </Typography>
                  )}
                  {demoTests.map((test) => (
                    <Link to={`/demo-tests/${test._id}`}>
                      <Card elevation={2} className="w-64 p-3 hover:bg-gray-100">
                        <Typography variant="h6" color="primary" align="center">
                          {test.title}
                        </Typography>
                        <Typography variant="body1">{`Subject: ${test.subject}`}</Typography>
                        <Typography variant="body1">{`Total questions: ${test.questions.length}`}</Typography>
                        {
                          test.createdBy && (
                            <Typography variant="body1">{`Created by: ${test.createdBy}`}</Typography>
                          )
                        }
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
              {isLoading && (
                <div className="page-pre-loader">
                  <CircularProgress />
                </div>
              )}
              {isError && (!isFetching || !isLoading) && (
                <div className="inline mx-auto">
                  <Typography variant="body1" color="error">
                    An error occured
                  </Typography>
                  <Button onClick={() => refetch(filter)} variant="outlined">
                    Reload
                  </Button>
                </div>
              )}
            </Container>
          </div>
        }
      />
      <Route path="/:_id" element={<AttempTest />} />
    </Routes>
  );
}

export default DemoTests;
