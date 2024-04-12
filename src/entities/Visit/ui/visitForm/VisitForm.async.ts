import { FC, lazy } from 'react';
import { VisitFormProps } from './VisitForm';

export const VisitFormAsync = lazy<FC<VisitFormProps>>(
  () => import('./VisitForm'),
);
