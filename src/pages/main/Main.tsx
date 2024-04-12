import { memo, useEffect } from 'react';
import cls from './Main.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { getRouteClientAppointment, getRouteClients, getRouteMasters, getRouteVisits } from '@/shared/const/router';
import { getAllClients } from '@/entities/Client/model/services/getAllClients';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';

interface MainProps {
  className?: string;
}

export const Main = memo((props: MainProps) => {
  const { className } = props
  const role = useSelector(getLoginRole)


  // useEffect(()=>{
  //   fetch("http://localhost:8080/api/clients", {
  //   method:"GET",
  //   headers: {
  //     "Content-Type": "application/json", // Specify JSON content type
  //     "Authorization": token
  //   }
  // }).then(res => res.json()).catch(e =>console.log(e)
  // )
  // .then(json => console.log(json)
  // )
  // }, [])   

  return (
    <div className={classNames(cls.Main, {}, [className])}>
      <div className={cls.MainBlock}>
        {role.role !== "Клиент" ? < Link to={getRouteClients()} className={cls.ItemLink}>Clients</Link>
          :
          <Link to={getRouteClientAppointment()} className={cls.ItemLink}>Записаться</Link>}
        <Link to={getRouteMasters()} className={cls.ItemLink}>Мастера</Link>
        <Link to={getRouteVisits()} className={cls.ItemLink}>Визиты</Link>
      </div>

    </div >
  );
});