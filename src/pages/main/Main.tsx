import { memo, useCallback, useEffect, useState } from 'react';
import cls from './Main.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { getRouteClientAppointment, getRouteClients, getRouteMasters, getRouteVisits } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';
import { VisitModal } from '@/entities/Visit/ui/visitModal/VisitModal';

interface MainProps {
  className?: string;
}

export const Main = memo((props: MainProps) => {
  const { className } = props
  const role = useSelector(getLoginRole)
  const [isOpenModal, setIsModalOpen] = useState(false)


  const onShowModal = useCallback(() => {
    setIsModalOpen(true)
  }, []);
  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className={classNames(cls.Main, {}, [className])}>
      <div className={cls.MainBlock}>
        {role.id !== "CLIENT_ROLE" ? < Link to={getRouteClients()} className={cls.ItemLink}>Clients</Link>
          :
          <div className={cls.ItemLink} onClick={onShowModal}>Записаться</div>}
        <Link to={getRouteMasters()} className={cls.ItemLink}>Мастера</Link>
        <Link to={getRouteVisits()} className={cls.ItemLink}>Визиты</Link>
      </div>
      {isOpenModal && <VisitModal isOpen={isOpenModal} onClose={onCloseModal} title="Форма записи" actionName='записаться' />}
    </div >
  );
});