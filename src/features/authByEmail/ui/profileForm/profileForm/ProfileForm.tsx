import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProfileForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getClientsListError, getClientsListLoading } from '@/entities/Client/model/selectors/getClientsList/getClientsList';
import { updateClient } from '@/entities/Client/model/services/updateClient';
import { addClient } from '@/entities/Client/model/services/addClient';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';
import { updateMaster } from '@/entities/Master/model/services/updateMaster';
import { addMaster } from '@/entities/Master/model/services/addMaster';
import { getProfileDescription, getProfileId, getProfileName, getProfilePhone } from '@/features/authByEmail/model/selectors/getProfile/getProfile';
import { loginActions } from '@/features/authByEmail/model/slice/loginSlice';



export interface ProfileFormProps {
  className?: string;
  title: string;
  actionName: string;
  onSuccess: () => void;
}


const ProfileForm = memo(({ className, onSuccess, title, actionName }: ProfileFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();



  const id = useSelector(getProfileId);
  const name = useSelector(getProfileName);
  const phone = useSelector(getProfilePhone);
  const description = useSelector(getProfileDescription)

  const role = useSelector(getLoginRole)


  const isLoading = useSelector(getClientsListLoading);
  const error = useSelector(getClientsListError);

  const forceUpdate = useForceUpdate()

  const onChangeName = useCallback(
    (value: string) => {
      dispatch(loginActions.setProfileName(value));
    },
    [dispatch],
  );

  const onChangePhone = useCallback(
    (value: string) => {
      dispatch(loginActions.setProfilePhone(value));
    },
    [dispatch],
  );
  const onChangeDescription = useCallback(
    (value: string) => {
      dispatch(loginActions.setProfileDescription(value));
    },
    [dispatch],
  );
  console.log("id", id, "name", name, "phone", phone);
  const onActionClick = useCallback(async () => {
    try {
      let result;
      if (role.id === "CLIENT_ROLE") {
        result = id !== null && id !== undefined ? await dispatch(updateClient({ id: id as number, name, phone })) : await dispatch(addClient({ name, phone }));
        console.log(`Update ${role.role.toLowerCase()} result:`, result);
      } else if (role.id === "MASTER_ROLE") {
        result = id !== null ? await dispatch(updateMaster({ id: id as number, name, description })) : await dispatch(addMaster({ name, description }));
        console.log(`Update ${role.role.toLowerCase()} result:`, result);
      }

      if (result && result.meta.requestStatus === 'fulfilled') {
        onSuccess();
        forceUpdate();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [dispatch, role, id, name, phone, description, onSuccess, forceUpdate]);
  // const onActionClick = useCallback(async () => {
  //   if (role === "CLIENT_ROLE") {
  //     try {
  //       if (id !== null) {
  //         const result = await dispatch(updateClient({ id: id as number, name, phone }));
  //         if (updateClient.fulfilled.match(result)) {
  //           onSuccess();
  //           forceUpdate();
  //         } else {
  //           console.error('Update client failed:', result.error);
  //         }
  //       } else {
  //         if (name == null) {
  //           return;
  //         }
  //         const result = await dispatch(addClient({ id, name, phone }));
  //         if (addClient.fulfilled.match(result)) {
  //           onSuccess();
  //           forceUpdate();
  //         } else {
  //           console.error('Add client failed:', result.error);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   } else if (role === "MASTER_ROLE") {
  //     try {
  //       if (id !== null) {
  //         const result = await dispatch(updateMaster({ id: id as number, name, description }));
  //         if (updateMaster.fulfilled.match(result)) {
  //           onSuccess();
  //           forceUpdate();
  //         } else {
  //           console.error('Update master failed:', result.error);
  //         }
  //       } else {
  //         if (name == null) {
  //           return;
  //         }
  //         const result = await dispatch(addMaster({ name, description }));
  //         if (addMaster.fulfilled.match(result)) {
  //           onSuccess();
  //           forceUpdate();
  //         } else {
  //           console.error('Add master failed:', result.error);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }


  // }, [dispatch, name, phone, description, onSuccess, forceUpdate]);

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
      {role.id === "CLIENT_ROLE" && < Input
        type='text'
        className={cls.input}
        placeholder={t('Введите телефон')}
        onChange={onChangePhone}
        value={phone}
      />}
      {role.id === "MASTER_ROLE" && < Input
        type='text'
        className={cls.input}
        placeholder={t('Введите описание')}
        onChange={onChangeDescription}
        value={description}
      />}
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

export default ProfileForm;
