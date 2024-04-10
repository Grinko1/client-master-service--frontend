import { memo } from 'react';
import cls from './Main.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { getRouteClients } from '@/shared/const/router';

interface MainProps {
  className?: string;
}

export const Main = memo((props: MainProps) => {
  const { className } = props


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
        <Link to={getRouteClients()} className={cls.ItemLink}>Clients</Link>
        <div className={cls.ItemLink}>Masters</div>
        <div className={cls.ItemLink}>Visits</div>
      </div>

    </div>
  );
});