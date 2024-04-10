import { FC, lazy } from 'react';
import { MasterFormProps } from './MasterForm';

export const MasterFormAsync = lazy<FC<MasterFormProps>>(
  () => import('./MasterForm'),
);
