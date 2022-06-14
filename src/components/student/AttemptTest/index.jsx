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
      <div className="stack border-2 border-primary">
        <Typography variant="h4" className="bg-primary text-center p-6 text-white">{test.title}</Typography>
        <div className="stack p-3">
          <div className={styles.record}>
            <Typography variant="h6" color="primary" className={styles['record-item-name']}>Subject:</Typography>
            <Typography variant="h6" className={styles['record-item-value']}>{test?.subject}</Typography>
          </div>
          <div className={styles.record}>
            <Typography variant="h6" color="primary" className={styles['record-item-name']}>Total Questions:</Typography>
            <Typography variant="h6" className={styles['record-item-value']}>{test?.questions?.length}</Typography>
          </div>
          <div className={styles.record}>
            <Typography variant="h6" color="primary" className={styles['record-item-name']}>Created By:</Typography>
            <Typography variant="h6" className={styles['record-item-value']}>{test.createdBy}</Typography>
          </div>
        </div>
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
  );
}

export default AttemptTest;
