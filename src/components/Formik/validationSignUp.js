import * as yup from 'yup';

export const validation = yup.object({
  username: yup
    .string()
    .min(1, 'Must be at least 2 characters long')
    .defined('Field is required'),
  email: yup.string().email('Email is invalid').defined('Email is required'),
  password: yup
    .string()
    .min(8, 'Password to short! Must be at least 8 characters long')
    .defined('Field is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .defined('Field is required'),
});
