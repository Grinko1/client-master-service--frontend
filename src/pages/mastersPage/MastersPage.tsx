import { memo } from 'react';
import cls from './MastersPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MastersPageProps {
    className?: string;
}

export const MastersPage = memo((props: MastersPageProps) => {
    const { className } = props
    return (
        <div className={classNames(cls.MastersPage, {}, [className])}>
        </div>
    );
});