import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {  useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/ui/redesigned/Layouts/MainLayout/MainLayout';
import { AppLoaderLayout } from '@/shared/ui/redesigned/Layouts/AppLoaderLayout/AppLoaderLayout';
import { Navbar } from '@/widgets/Navbar/Navbar';
import { Main } from '@/pages/main/Main';
// import { useJsonSettings } from '@/entities/User/model/selectors/getJsonSettings/getJsonSettings';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  // const inited = useSelector(getUserInited);
  // const toolbar = useAppToolbar();

  // useEffect(() => {
  //   if (!inited) {
  //     dispatch(initAuthData());
  //   }
  // }, [dispatch, inited]);

  // if (!inited) {
  //   return (
  //     <ToggleFeatures
  //       feature='isAppRedesigned'
  //       on={
  //         <div className={classNames('app_redesigned', {}, [theme])}>
  //           <AppLoaderLayout />
  //         </div>
  //       }
  //       off={<PageLoader />}
  //     />
  //   );
  // }

  return (
    <div id='app' className={classNames('app_redesigned', {}, [theme])}>
    <Suspense fallback=''>
      {/* <MainLayout
        content={<AppRouter />}
        header={<Navbar />}
        sidebar={<Sidebar />}
        toolbar={toolbar}
      /> */}
      <Navbar/>
      <AppRouter/>
    </Suspense>
  </div>
  );
}

export default App;
