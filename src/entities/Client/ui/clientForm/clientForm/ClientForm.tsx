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
import { getClientId, getClientNPhone, getClientName } from '@/entities/Client/model/selectors/getClientForm/getClientForm';
import { getClientsListError, getClientsListLoading } from '@/entities/Client/model/selectors/getClientsList/getClientsList';
import { clientsActions } from '@/entities/Client/model/slices/clientsSlice';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { CombinedState } from '@reduxjs/toolkit/query';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import { ClientDataProps } from '@/entities/Client/model/types/client';
import { updateClient } from '@/entities/Client/model/services/updateClient';
import { addClient } from '@/entities/Client/model/services/addClient';


export interface ClientFormProps {
  className?: string;
  title: string;
  actionName: string;
  onSuccess: () => void;
  handleFormAction: (data: ClientDataProps) => any
}

// const initialReducers: ReducersList = {
//   clientForm: clientReducer,
// };

const ClientForm = memo(({ className, onSuccess, title, actionName, handleFormAction }: ClientFormProps) => {
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
        console.log("in update", id);
        const result = await dispatch(updateClient({ id, name, phone }));
        if (updateClient.fulfilled.match(result)) {
          // Handle success
          onSuccess();
          forceUpdate();
        } else {
          // Handle failure
          console.error('Update client failed:', result.error);
        }
      } else {
        console.log("in save", id);
        const result = await dispatch(addClient({ id, name, phone }));
        if (addClient.fulfilled.match(result)) {
          // Handle success
          onSuccess();
          forceUpdate();
        } else {
          // Handle failure
          console.error('Add client failed:', result.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // const result = await handleFormAction({ id, name, phone })
    // if (result.meta.requestStatus === 'fulfilled') {
    //   onSuccess();
    //   forceUpdate()
    // }
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
        onClick={onActionClick}
        disabled={isLoading}>
        {actionName}
      </Button>
    </div>
    // </DynamicModuleLoader>
  );
});

export default ClientForm;
