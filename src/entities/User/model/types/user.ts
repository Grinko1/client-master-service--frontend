import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../consts/consts';

export interface UserSchema {
  token?: string;
  _inited: boolean;
}

export interface LoginData{
  email:string,
  passport:string
}

 