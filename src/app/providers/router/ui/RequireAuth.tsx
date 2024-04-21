import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { useMemo } from 'react';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';
import { Role } from '@/features/authByEmail';
import { getLoginEmail } from '@/features/authByEmail/model/selectors/getLoginEmail/getLoginEmail';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';

export interface RequireAuthProps {
  children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const email = useSelector(getLoginEmail)
  const role: Role = useSelector(getLoginRole)
  const auth = role && email

  if (!auth) {

    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  return children;
}
