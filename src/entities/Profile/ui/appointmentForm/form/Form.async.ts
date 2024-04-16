import { FC, lazy } from 'react';
import { FormProps } from './Form';


export const FormAsync = lazy<FC<FormProps>>(
  () => import('./Form'),
);
