import { memo, useCallback, useState } from 'react';
import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal, logoutService } from '@/features/authByEmail';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getLoginEmail } from '@/features/authByEmail/model/selectors/getLoginEmail/getLoginEmail';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useAppDispatch()
  const email = useSelector(getLoginEmail)
  const role = useSelector(getLoginRole)

  const logoutHandler = useCallback(() => {
    dispatch(logoutService())
  }, [email, role])

  const isAuth = email && role;

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.header}>
        <Link to={getRouteMain()}>Main</Link>
        {isAuth ?
          <div className={cls.authActions}>
            <h3>{role.role}</h3>
            <p>{email}</p>
            <Button onClick={logoutHandler}>Выйти</Button>

          </div>
          : <Button onClick={onShowModal}>Войти</Button>}
      </div>

      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </div>
  );
});