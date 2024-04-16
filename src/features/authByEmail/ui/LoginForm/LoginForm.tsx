import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { login } from '../../model/services/loginByEmail/loginByEmail';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Role } from '../../model/types/loginSchema';
import { roles } from '../../consts/consts';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};


const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const email = useSelector(getLoginEmail);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const [currentRole, setCurrentRole] = useState(roles[1])

  const forceUpdate = useForceUpdate()

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(login({ email, password, role: currentRole.id }));
    if (result.meta.requestStatus === 'fulfilled') {
      localStorage.setItem("email", email)
      localStorage.setItem("role", JSON.stringify(currentRole))
      onSuccess();
      forceUpdate()
    }
  }, [dispatch, email, password, onSuccess, forceUpdate]);


  const dropdownRolesItems = roles.map((role) => ({
    content: role.role,
    onClick: () => {
      setCurrentRole(prevRole => role)
      console.log(role);
      dispatch(loginActions.setRole(role))
    },
    isSelected: role.id === currentRole.id
  }));

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && (
          <Text text={t('Вы ввели неверный логин или пароль')} variant='error' />
        )}
        <Input
          autofocus
          type='text'
          className={cls.input}
          placeholder={t('Введите email')}
          onChange={onChangeEmail}
          value={email}
        />
        <Input
          type='text'
          className={cls.input}
          placeholder={t('Введите пароль')}
          onChange={onChangePassword}
          value={password}
        />
        <div className={cls.dropdownBlock}>
          <Dropdown
            trigger={<Button>Интерфейс</Button>}
            items={dropdownRolesItems}
          />
          <div>{currentRole?.role}</div>
        </div>
        <Button
          variant='outline'
          className={cls.loginBtn}
          onClick={onLoginClick}
          disabled={isLoading}>
          {t('Войти')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
