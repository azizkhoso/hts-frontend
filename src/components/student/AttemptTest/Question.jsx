/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  Typography,
  Button,
  Card,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
} from '@mui/material';

function Question({ question, index, onSubmit, onSkip }) {
  const [answer, setAnswer] = React.useState('');
  const [remainingTime, setRemainingTime] = React.useState(Number(question.duration));
  const SKIP_AFTER = Number(question.duration) - 5; // seconds
  function handleSubmit() {
    if (!answer) return;
    onSubmit({ questionId: question.id, answer });
  }
  function handleSkip() {
    if (remainingTime > SKIP_AFTER) return;
    onSkip({ questionId: question.id, answer });
  }
  // Timer logic
  React.useEffect(() => {
    let timeoutId = 0;
    if (remainingTime === 0) {
      onSkip({ questionId: question._id, answer });
    } else {
      timeoutId = setTimeout(() => {
        // After every second
        setRemainingTime(
          // Using function for ensuring change
          () => remainingTime - 1,
        );
      }, 1000);
    }
    // To prevent update after unmount
    return () => clearTimeout(timeoutId);
  }, [remainingTime]);
  return (
    <Stack component={Card} className="p-3 overflow-auto">
      <Typography variant="body1">
        {index + 1}
        )&nbsp;
        {question.statement}
      </Typography>
      <img src={question.image} alt="preview" className="self-center w-full max-w-xs my-6" />
      {question.type === 'MCQS' && (
        <>
          <FormControl>
            <FormLabel>Your Answer:</FormLabel>
            <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
              <FormControlLabel label={`A: ${question.A}`} value="A" control={<Radio />} />
              <FormControlLabel label={`B: ${question.B}`} value="B" control={<Radio />} />
              <FormControlLabel label={`C: ${question.C}`} value="C" control={<Radio />} />
              <FormControlLabel label={`D: ${question.D}`} value="D" control={<Radio />} />
            </RadioGroup>
          </FormControl>
        </>
      )}
      {question.type === 'TrueFalse' && (
        <div className="flex items-center w-full gap-1 md:w-auto">
          <FormControl>
            <FormLabel>Your Answer:</FormLabel>
            <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
              <FormControlLabel label="True" value="True" control={<Radio />} />
              <FormControlLabel label="False" value="False" control={<Radio />} />
            </RadioGroup>
          </FormControl>
        </div>
      )}
      {question.type === 'Blank' && (
        <div className="flex items-center w-full gap-1 md:w-auto">
          <Typography variant="h6">Your answer:</Typography>
          <TextField
            variant="outlined"
            size="small"
            className="w-1/2"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      )}
      <div className="flex items-center gap-3 mt-3">
        <Typography variant="body1" color="primary">
          Remaining Time (seconds):
        </Typography>
        <Typography variant="h6">{remainingTime}</Typography>
      </div>
      <div className="flex justify-end mt-6 gap-9 lg:mt-auto">
        <Button
          variant="text"
          disabled={remainingTime > SKIP_AFTER}
          color="error"
          onClick={() => handleSkip()}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          disabled={!answer}
          color="primary"
          onClick={() => handleSubmit()}
        >
          Next
        </Button>
      </div>
    </Stack>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    statement: PropTypes.string.isRequired,
    // Image should be in data uri format
    image: PropTypes.string.isRequired,
    // Duration should be passed as string for convenience
    duration: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    // For MCQS question type
    A: PropTypes.string,
    B: PropTypes.string,
    C: PropTypes.string,
    D: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default Question;
