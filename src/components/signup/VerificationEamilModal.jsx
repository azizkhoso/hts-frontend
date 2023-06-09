import React from 'react';
import { Dialog, DialogContent, Box , Typography} from '@mui/material';

const VerificationEmailModal = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogContent>
      <Box p="4">
        <Typography variant="h6" textAlign="center">Verification Email Sent</Typography>
        <Typography variant="body1">Please check your email to verify your account</Typography>
      </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationEmailModal;
