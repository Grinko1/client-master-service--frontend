import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';


interface PageProps {
  className?: string;
  children: ReactNode;
}
export const Page = ({className, children} : PageProps) =>{

  return (
    <section
      className={classNames(cls.PageRedesigned, {}, [className])}>
      {children}
    </section>
  );
};
