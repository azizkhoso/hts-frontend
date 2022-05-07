/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../redux/actions/toasts';

import Toast from './Toast';

export default function Toasts() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts);
  return (
    <Stack>
      {toasts.map((toast) => {
        const { id } = toast;
        return (
          <Toast {...toast} key={id} onDismissClick={() => dispatch(removeToast(id))} />
        );
      })}
    </Stack>
  );
}
