import { ADD_TOAST, REMOVE_TOAST } from '../action-types/toasts';

let ID = 0;

const defaultOptions = {
  severity: 'info',
  open: true,
  message: '',
};

function createToast(options = defaultOptions) {
  ID += 1;
  return {
    ...defaultOptions,
    ...options,
    id: ID,
  };
}

export function addToast(options) {
  return {
    payload: createToast(options),
    type: ADD_TOAST,
  };
}

export function addSuccessToast(options) {
  return {
    payload: createToast({ ...options, severity: 'success' }),
    type: ADD_TOAST,
  };
}

export function addErrorToast(options) {
  return {
    payload: createToast({ ...options, severity: 'error' }),
    type: ADD_TOAST,
  };
}

export function removeToast(id) {
  return {
    payload: id,
    type: REMOVE_TOAST,
  };
}
