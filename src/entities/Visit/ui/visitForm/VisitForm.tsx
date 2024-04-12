import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './VisitForm.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getClientsList, getClientsListError, getClientsListLoading } from '@/entities/Client/model/selectors/getClientsList/getClientsList';
import { getVisitForm } from '../../model/selectors/getVisitForm';
import { visitsActions } from '../../model/slices/visitSlice';
import { updateVisit } from '../../model/services/updateVisit';
import { addVisit } from '../../model/services/addVisit';
import moment from 'moment';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { ClientInfo, MasterInfo } from '../../model/types/visit';
import { getMastersList } from '@/entities/Master/model/selectors/getMastersList';


export interface VisitFormProps {
  className?: string;
  title: string;
  actionName: string;
  onSuccess: () => void;
}



const VisitForm = memo(({ className, onSuccess, title, actionName }: VisitFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [currentClient, setCurrentClient] = useState<ClientInfo | null>(null)
  const [currentMaster, setCurrentMaster] = useState<MasterInfo | null>(null)

  const { id, date, time, masterId, clientId } = useSelector(getVisitForm);
  const clients = useSelector(getClientsList)
  const masters = useSelector(getMastersList)

  const formattedDate = moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
  const formattedTime = moment(time, 'HH:mm').format('HH:mm:ss');
  const isLoading = useSelector(getClientsListLoading);
  const error = useSelector(getClientsListError);

  useEffect(() => {
    const client = clients.filter(i => i.id === clientId)[0];
    setCurrentClient(client)
    const master = masters.filter(i => i.id === masterId)[0]
    setCurrentMaster(master)
  }, [])

  const dropdownClientItems = clients.map((client) => ({
    content: client.name,
    onClick: () => {
      setCurrentClient(client)
      dispatch(visitsActions.setClientId(client.id))
    },
    isSelected: client.id === clientId
  }));
  const dropdownMasterItems = masters.map((master) => ({
    content: master.name,
    onClick: () => {
      setCurrentMaster(master)
      dispatch(visitsActions.setMasterId(master.id))
    },
    isSelected: master.id === masterId
  }));


  const forceUpdate = useForceUpdate()

  const onChangeDate = useCallback(
    (value: string) => {
      const formattedDate = moment(value).format('DD/MM/YYYY');
      dispatch(visitsActions.setDate(formattedDate));
    },
    [dispatch],
  );

  const onChangeTime = useCallback(
    (value: string) => {
      console.log(value, "time frominput");
      const formattedTime = moment(value, 'HH:mm').format('HH:mm:ss');
      console.log(formattedTime); // Check the formatted time
      dispatch(visitsActions.setTime(formattedTime));
    },
    [dispatch],
  );

  const onActionClick = useCallback(async () => {
    console.log({ id, date, time, masterId, clientId });
    try {
      if (id !== null) {
        const result = await dispatch(updateVisit({ id, date, time, masterId, clientId }));
        if (updateVisit.fulfilled.match(result)) {
          onSuccess();
          forceUpdate();
        } else {
          console.error('Update visit failed:', result.error);
        }
      } else {
        const result = await dispatch(addVisit({ id, date, time, masterId, clientId }));
        if (addVisit.fulfilled.match(result)) {
          onSuccess();
          forceUpdate();
        } else {
          console.error('Add visit failed:', result.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [dispatch, date, time, masterId, clientId, onSuccess, forceUpdate]);

  return (
    // <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={title} />
      {error && (
        <Text text={t('Вы ввели неверный логин или пароль')} variant='error' />
      )}
      <Input
        autofocus
        type='date'
        className={cls.input}
        placeholder={t('Дата')}
        onChange={onChangeDate}
        value={formattedDate}
      />
      <Input
        type='time'
        className={cls.input}
        placeholder={t('время')}
        onChange={onChangeTime}
        value={formattedTime}
      />
      <div className={cls.dropdownBlock}>
        <Dropdown
          trigger={<Button>Chooze client</Button>}
          items={dropdownClientItems}
        />
        <div>{currentClient?.name}</div>
      </div>

      <div className={cls.dropdownBlock}>
        <Dropdown
          trigger={<Button>Chooze master</Button>}
          items={dropdownMasterItems}
        />
        <div>{currentMaster?.name}</div>
      </div>


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

export default VisitForm;
