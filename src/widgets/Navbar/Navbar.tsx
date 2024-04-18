import { memo, useCallback, useState } from 'react';
import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal, Role, getProfileData, logoutService } from '@/features/authByEmail';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getLoginEmail } from '@/features/authByEmail/model/selectors/getLoginEmail/getLoginEmail';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ClientModal } from '@/entities/Client/ui/clientForm/clientModal/ClientModal';
import { MasterModal } from '@/entities/Master/ui/masterModal/MasterModal';
import { getProfileName } from '@/entities/Profile/model/selectors/getProfile';
import ProfileForm from '@/entities/Profile/ui/profileForm/profileForm/ProfileForm';
import { ProfileModal } from '@/entities/Profile/ui/profileForm/profileModal/ProfileModal';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props
  const [isAuthModal, setIsAuthModal] = useState(false);
  const [openAddProfileModal, setOpentAddProfileModal] = useState(false);

  const dispatch = useAppDispatch()
  const email = useSelector(getLoginEmail)
  const role: Role = useSelector(getLoginRole)
  // const profile = useSelector(getProfileData)
  const name = useSelector(getProfileName)

  const logoutHandler = useCallback(() => {
    dispatch(logoutService())
  }, [email, role])

  const isAuth = email && role;

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
          // role.id === 'CLIENT_ROLE' ? (
          //   <ClientModal isOpen={openAddProfileModal} title="Профиль" actionName="Сохранить" onClose={onCloseProfileModal} />
          // ) : (
          //   <MasterModal isOpen={openAddProfileModal} title="Профиль" actionName="Сохранить" onClose={onCloseProfileModal} />
          // )
        )
      }
    </div>
  );
});