import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar/Navbar';
import { getInitLoginData } from '@/features/authByEmail';
import { initAuthData } from '@/features/authByEmail/model/services/initAuth/initAuth';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getInitLoginData);
  console.log(inited);


  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);


  return (
    <div id='app' className={classNames('app_redesigned', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
