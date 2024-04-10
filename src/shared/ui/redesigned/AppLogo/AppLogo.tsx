import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../Stack';
// import Logo from '../../assets/imgs/Avatar.png'
import AppSvg from '@/shared/assets/icons/app-image.svg';

interface AppLogoProps {
  className?: string;
  size?:number
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size=50 } = props;
  return (
    <HStack max justify='center' className={classNames(cls.appLogoWrapper, {}, [className])}>
      <AppSvg className={cls.appLogo} width={size } height={size } />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      
    </HStack>
  );
});
