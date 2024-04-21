import { memo, useCallback, useEffect, useState } from 'react';
import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal, ProfileModal, Role, getProfileData, getProfileName, loginActions, logoutService } from '@/features/authByEmail';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getLoginEmail } from '@/features/authByEmail/model/selectors/getLoginEmail/getLoginEmail';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';



interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props
  const [isAuthModal, setIsAuthModal] = useState(false);
  const [openAddProfileModal, setOpentAddProfileModal] = useState(false);

  const dispatch = useAppDispatch()
  let email = useSelector(getLoginEmail)
  let role = useSelector(getLoginRole)
  const name = useSelector(getProfileName)


  const logoutHandler = () => {
    email = ''
    role = undefined
    console.log("logout", role, email);
    dispatch(logoutService())
    dispatch(loginActions.resetForm())

  }

  let isAuth = !!email && !!role.id;
  console.log(isAuth, email, role);

  useEffect(() => {
    isAuth = !!email && !!role.id;
    if (!isAuth) {

      setIsAuthModal(true)
    }
  }, [email, role])

  const onCloseAuthModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowAuthModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);
  const onCloseProfileModal = useCallback(() => {
    setOpentAddProfileModal(false);
  }, []);

  const onShowProfileModal = useCallback(() => {
    setOpentAddProfileModal(true);
  }, []);


  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.header}>
        <Link to={getRouteMain()}>Main</Link>
        {isAuth ?
          <div className={cls.authActions}>
            <h3>{role.role}</h3>
            {name ? <p onClick={onShowProfileModal}>{name}</p> : <p onClick={onShowProfileModal}>{email}</p>}
            <Button onClick={logoutHandler}>Выйти</Button>

          </div>
          : <Button onClick={onShowAuthModal}>Войти</Button>}
      </div>

      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseAuthModal} />}
      {
        openAddProfileModal && (
          <ProfileModal isOpen={openAddProfileModal} title="Профиль" actionName="Сохранить" onClose={onCloseProfileModal} />
        )
      }
    </div>
  );
});