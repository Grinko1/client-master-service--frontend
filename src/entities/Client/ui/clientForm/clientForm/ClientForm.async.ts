import { FC, lazy } from 'react';
import { ClientFormProps } from './ClientForm';

export const ClientFormAsync = lazy <FC<ClientFormProps>>(
  () => import('./ClientForm'),
);
