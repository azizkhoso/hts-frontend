/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import { useMutation } from 'react-query';
import { submitTest } from '../../../api/student';

import { addErrorToast, addSuccessToast } from '../../../redux/actions/toasts';

import styles from './AttemptTest.module.css';
import { mapNumberToGrade } from '../../../utils';

function calculateTotalCorrect(questions, answers) {
  let correct = 0;
  for (let i = 0; i < questions.length; i += 1) {
    const { answer } = questions[i];
    const givenAnswer = answers.find((a) => a.questionId === questions[i]._id)?.answer;
    const isCorrect = answer === givenAnswer;
    if (isCorrect) correct += 1;
  }
  return correct;
}

const grades = [
  { name: 'A', value: '4, 5' },
  { name: 'B', value: '3, <=4' },
  { name: 'C', value: '2, <=3' },
  { name: 'D', value: '1, <=2' },
  { name: 'E', value: '0, <=1' },
  { name: 'F', value: '<=0' },
]

function TestResult({ questions, answers, testId }) {
  const { student } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { isLoading, mutate, isError } = useMutation((data) => submitTest(data), {
    onSuccess: () => dispatch(addSuccessToast({ message: 'Test submitted successfully' })),
    onError: (err) => dispatch(
      addErrorToast({ message: err.response?.data?.error || err.message }),
    ),
  });
  function handleSubmit() {
    if (!student) return;
    const data = {
      testId,
      submittedBy: student._id,
      answers,
    };
    mutate(data);
  }
  // Upload test on mount
  React.useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <>
      <div className="stack border-2 border-primary">
        <Typography variant="h4" className="bg-primary text-center p-6 text-white">Result</Typography>
        <div className="stack p-3">
          <div className={styles.record}>
            <Typography variant="h6" color="primary" className={styles['record-item-name']}>Total Questions:</Typography>
            <Typography variant="h6" className={styles['record-item-value']}>{questions.length}</Typography>
          </div>
          <div className={styles.record}>
            <Typography variant="h6" color="primary" className={styles['record-item-name']}>Correct:</Typography>
            <Typography variant="h6" className={styles['record-item-value']}>{calculateTotalCorrect(questions, answers)}</Typography>
          </div>
          <div className={styles.record}>
            <Typography variant="h6" color="primary" className={styles['record-item-name']}>Grade:</Typography>
            <Typography variant="h6" className={styles['record-item-value']}>
              {
                mapNumberToGrade(
                  5 * Number(calculateTotalCorrect(questions, answers) / questions.length).toFixed(2)
                )
              }
            </Typography>
          </div>
        </div>
        <Typography variant="h6" className="text-white my-3 bg-primary text-center p-3">Grades Mapping</Typography>
        <div className="stack p-3">
          <div className="row gap-6 justify-center items-center">
            {
              grades.map((g) => (
                <div className="stack gap-2 text-center">
                  <p className="text-3xl font-bold text-primary">{g.name}</p>
                  <p className="text-lg">{g.value}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {
        isLoading && (
          <div className={styles.record}>
            <div className="page-pre-loader"><CircularProgress /></div>
            <Typography variant="h6" color="primary" algin="center" className={styles['record-item-name']}>Submitting....</Typography>
          </div>
        )
      }
      {
        isError && (
          <div className={styles.record}>
            <Typography variant="body" color="error" algin="center" className={styles['record-item-name']}>An error occurred, try resubmitting</Typography>
            <Button variant="contained" onClick={() => handleSubmit()}>Resubmit</Button>
          </div>
        )
      }
    </>
  );
}

TestResult.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
  ).isRequired,
  questions: PropTypes.array.isRequired,
  testId: PropTypes.string.isRequired,
};

export default TestResult;
