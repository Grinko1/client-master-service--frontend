import { memo } from 'react';
import cls from './ClientAppointment.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ClientAppointmentProps {
    className?: string;
}

export const ClientAppointment = memo((props: ClientAppointmentProps) => {
    const { className } = props
    return (
        <div className={classNames(cls.ClientAppointment, {}, [className])}>
            appointment
        </div>
    );
});