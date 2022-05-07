import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';

import {
  ExpandMore,
} from '@mui/icons-material';

export default function Faq() {
  const faqs = [
    {
      question: 'What is HTS?',
      answer: 'HTS is online testing serivce that provides quality test.',
    },
    {
      question: 'How HTS works?',
      answer: 'HTS conducts online tests for exam preparations, uploads results and guides students for their careers.',
    },
  ];
  return (
    <div className="landing-page">
      <Container maxWidth="md" disableGutters className="py-6 stack">
        <Typography
          variant="h2"
          align="center"
          color="primary"
          className="font-bold"
        >
          Faq
        </Typography>
        <div className="w-full mt-3 stack">
          {
            faqs.map((faq) => (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body1" className="font-medium">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails className="bg-gray-100">
                  <Typography variant="body2">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </div>
      </Container>
    </div>
  );
}
