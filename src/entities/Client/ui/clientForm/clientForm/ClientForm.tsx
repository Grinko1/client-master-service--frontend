import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ClientForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getClientId, getClientNPhone, getClientName } from '@/entities/Client/model/selectors/getClientForm/getClientForm';
import { getClientsListError, getClientsListLoading } from '@/entities/Client/model/selectors/getClientsList/getClientsList';
import { clientsActions } from '@/entities/Client/model/slices/clientsSlice';
import { updateClient } from '@/entities/Client/model/services/updateClient';
import { addClient } from '@/entities/Client/model/services/addClient';


export interface ClientFormProps {
  className?: string;
  title: string;
  actionName: string;
  onSuccess: () => void;
}


const ClientForm = memo(({ className, onSuccess, title, actionName }: ClientFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const id = useSelector(getClientId);
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

  const onActionClick = useCallback(async () => {
    try {
      if (id !== null) {
        const result = await dispatch(updateClient({ id, name, phone }));
        if (updateClient.fulfilled.match(result)) {
          onSuccess();
          forceUpdate();
        } else {
          console.error('Update client failed:', result.error);
        }
      } else {
        const result = await dispatch(addClient({ name, phone }));
        if (addClient.fulfilled.match(result)) {
          onSuccess();
          forceUpdate();
        } else {
          console.error('Add client failed:', result.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [dispatch, name, phone, onSuccess, forceUpdate]);

  return (
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
        onClick={onActionClick}
        disabled={isLoading}>
        {actionName}
      </Button>
    </div>
  );
});

export default ClientForm;
