import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './ClientForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getClientNPhone, getClientName } from '@/entities/Client/model/selectors/getClientForm/getClientForm';
import { getClientsListError, getClientsListLoading } from '@/entities/Client/model/selectors/getClientsList/getClientsList';
import { clientsActions } from '@/entities/Client/model/slices/clientsSlice';
import { addClient } from '@/entities/Client/model/services/addClient';
import { title } from 'process';

export interface ClientFormProps {
  className?: string;
  title: string;
  actionName: string;
  onSuccess: () => void;
}

// const initialReducers: ReducersList = {
//   clientForm: clientReducer,
// };

const ClientForm = memo(({ className, onSuccess, title, actionName }: ClientFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const name = useSelector(getClientName);
  const phone = useSelector(getClientNPhone);
  const isLoading = useSelector(getClientsListLoading);
  const error = useSelector(getClientsListError);

  const forceUpdate = useForceUpdate()
  const onChangeName = useCallback(
    (value: string) => {
      dispatch(clientsActions.setName(value));
    },
    [dispatch],
  );

  const onChangePhone = useCallback(
    (value: string) => {
      dispatch(clientsActions.setPhone(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(addClient({ name, phone }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate()
    }
  }, [dispatch, name, phone, onSuccess, forceUpdate]);

  return (
    // <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={title} />
      {error && (
        <Text text={t('Вы ввели неверный логин или пароль')} variant='error' />
      )}
      <Input
        autofocus
        type='text'
        className={cls.input}
        placeholder={t('Введите имя')}
        onChange={onChangeName}
        value={name}
      />
      <Input
        type='text'
        className={cls.input}
        placeholder={t('Введите телефон')}
        onChange={onChangePhone}
        value={phone}
      />
      <Button
        variant='outline'
        className={cls.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}>
        {actionName}
      </Button>
    </div>
    // </DynamicModuleLoader>
  );
});

export default ClientForm;
