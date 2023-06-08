import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';

import { Close } from '@mui/icons-material';

import { useMutation } from 'react-query';

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addErrorToast, addSuccessToast } from '../../redux/actions/toasts';

import { applyForTest } from '../../api/student';

export default function TestApplicationDialog({ open, handleClose, test }) {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.account);
  const [img, setImg] = React.useState();
  const { isLoading, mutate } = useMutation(
    (data) => applyForTest(data),
    {
      onSuccess: () => {
        dispatch(addSuccessToast({ message: 'Challan uploaded successfully' }));
        handleClose();
      },
      onError: (err) => dispatch(
        addErrorToast({ message: err.response?.data?.error || err.message }),
      ),
    },
  );
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => handleClose()}>
      <DialogTitle className="flex justify-between">
        <Typography variant="h4" color="primary">{test.title}</Typography>
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="gap-3 stack">
        <div className="stack gap-3">
          {
            !img
              ? <Typography variant="body1" className="text-center p-8 border boder-2">No image selected</Typography>
              : <img src={img && URL.createObjectURL(img)} alt="input" className="w-full" />
          }
          <Typography variant="body2" className="font-bold">Select the image of challan for proof (less than 30kb):</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <Button variant="outlined" disabled={isLoading} className="mx-auto" onClick={() => mutate({ test: test._id, image: img })}>
            {
              isLoading
                ? <CircularProgress />
                : 'Apply'
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

TestApplicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired,
}
