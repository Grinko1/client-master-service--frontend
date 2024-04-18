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
import cls from './MasterForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getClientsListError, getClientsListLoading } from '@/entities/Client/model/selectors/getClientsList/getClientsList';
import { mastersActions } from '@/entities/Master/model/slices/materSlice';
import { getMastersForm } from '@/entities/Master/model/selectors/getMasterForm';
import { updateMaster } from '@/entities/Master/model/services/updateMaster';
import { addMaster } from '@/entities/Master/model/services/addMaster';


export interface MasterFormProps {
  className?: string;
  title: string;
  actionName: string;
  onSuccess: () => void;
}



const MasterForm = memo(({ className, onSuccess, title, actionName }: MasterFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, name, description } = useSelector(getMastersForm);
  const isLoading = useSelector(getClientsListLoading);
  const error = useSelector(getClientsListError);

  const forceUpdate = useForceUpdate()

  const onChangeName = useCallback(
    (value: string) => {
      dispatch(mastersActions.setName(value));
    },
    [dispatch],
  );

  const onChangeDesc = useCallback(
    (value: string) => {
      dispatch(mastersActions.setDescription(value));
    },
    [dispatch],
  );

  const onActionClick = useCallback(async () => {
    try {
      if (id !== null) {
        console.log("in update", id);
        const result = await dispatch(updateMaster({ id, name, description }));
        if (updateMaster.fulfilled.match(result)) {
          onSuccess();
          forceUpdate();
        } else {
          console.error('Update master failed:', result.error);
        }
      } else {
        console.log("in save", id);
        const result = await dispatch(addMaster({ name, description }));
        if (addMaster.fulfilled.match(result)) {
          onSuccess();
          forceUpdate();
        } else {
          console.error('Add master failed:', result.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [dispatch, name, description, onSuccess, forceUpdate]);

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
        placeholder={t('Описание')}
        onChange={onChangeDesc}
        value={description}
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

export default MasterForm;
