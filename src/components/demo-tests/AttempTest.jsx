/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useQuery } from 'react-query';
import { getDemoTest } from '../../api/others';

import { addErrorToast } from '../../redux/actions/toasts';

import Question from '../student/AttemptTest/Question';
import TestResult from '../student/AttemptTest/TestResult';

function AttempTest() {
  const { _id } = useParams();
  const [test, setTest] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useQuery(['demo-test', _id], () => getDemoTest(_id), {
    onSuccess: ({ data }) => setTest(data.demoTest),
    onError: (err) => {
      dispatch(addErrorToast({ message: err.response?.data?.error || err.message }));
      // Go back
      navigate(-1);
    },
  });
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  React.useEffect(() => function () {
    if (confirm('Are you sure you want to leave?')) {
      // navigate('');
    } else {
      navigate('');
    }
  }, []);
  if (isLoading) return <div className="page-pre-loader"><CircularProgress /></div>;
  return (
    <div className="block">
      <Typography variant="h6" color="primary" align="center">{test.title}</Typography>
      <Container maxWidth="xl">
        <div className="flex flex-wrap my-3">
          <Typography variant="h6" className="w-1/2 lg:w-2/6">Subject</Typography>
          <Typography variant="body1" className="w-1/2 lg:w-4/6">{test.subject}</Typography>
          <Typography variant="h6" className="w-1/2 lg:w-2/6">Total Questions</Typography>
          <Typography variant="body1" className="w-1/2 lg:w-4/6">{test?.questions?.length}</Typography>
          <Typography variant="h6" className="w-1/2 lg:w-2/6">Created by</Typography>
          <Typography variant="body1" className="w-1/2 lg:w-4/6">{test.createdBy}</Typography>
        </div>
        <div className="w-full mx-auto">
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
      </Container>
    </div>
  );
}

export default AttempTest;
