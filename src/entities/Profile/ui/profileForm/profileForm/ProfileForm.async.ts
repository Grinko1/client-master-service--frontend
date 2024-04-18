import { FC, lazy } from 'react';
import { ProfileFormProps } from './ProfileForm';

export const ProfileFormAsync = lazy<FC<ProfileFormProps>>(
  () => import('./ProfileForm'),
);
