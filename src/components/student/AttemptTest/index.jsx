/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import {
  Typography,
  CircularProgress,
} from '@mui/material';

import date from 'date-and-time';

import { useDispatch } from 'react-redux';

import { useQuery } from 'react-query';
import { getTest } from '../../../api/student';

import { addErrorToast } from '../../../redux/actions/toasts';

import Question from './Question';
import TestResult from './TestResult';

// Page styles
import styles from './AttemptTest.module.css';

function AttemptTest() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [test, setTest] = React.useState({});
  const { isLoading } = useQuery(['test', id], () => getTest(id), {
    onSuccess: ({ data }) => setTest(data.test),
    onError: (err) => {
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message }));
      // Go back
      navigate(-1);
    },
  });
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  if (isLoading) return <div className="page-pre-loader"><CircularProgress /></div>;
  return (
    <div className="page-content">
      <Typography variant="h6" align="center">{`${test.subject} - ${test.title}`}</Typography>
      <div className="w-full">
        <div className={styles.record}>
          <Typography variant="h6" color="primary" className={styles['record-item-name']}>Created by:</Typography>
          <Typography variant="h6" className={styles['record-item-value']}>{test.createdBy}</Typography>
        </div>
        <div className={styles.record}>
          <Typography variant="h6" color="primary" className={styles['record-item-name']}>Submittable Before:</Typography>
          <Typography variant="h6" className={styles['record-item-value']}>{date.format(new Date(test.submittableBefore), 'HH:MM A DD-MMM-YYYY')}</Typography>
        </div>
        { // Question Component
          test.questions && (index < test.questions.length) && test.questions.map((q, idx) => (
            // Implementing this logic so that relevant component is mounted only
            index === idx && (
              <Question
                key={q._id}
                question={q}
                index={index}
                onSubmit={
                  (ans) => {
                    setAnswers([...answers, ans]);
                    setIndex(index + 1);
                  }
                }
                onSkip={
                  (ans) => {
                    setAnswers([...answers, ans]);
                    setIndex(index + 1);
                  }
                }
              />
            )
          ))
        }
        {
          test.questions && index >= test.questions.length && (
            <TestResult
              questions={test.questions}
              answers={answers}
              testId={test._id}
            />
          )
        }
      </div>
    </div>
  );
}

export default AttemptTest;
