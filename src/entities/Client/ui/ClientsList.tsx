import { memo, useCallback, useEffect, useState } from 'react';
import cls from './ClientsList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getClientsList, getClientsListError, getClientsListLoading } from '../model/selectors/getClientsList/getClientsList';
import { useSelector } from 'react-redux';
import { ClientModal } from './clientForm/clientModal/ClientModal';
import { Client } from '../model/types/client';
import { clientsActions } from '../model/slices/clientsSlice';
import { getClientsWithVisits, getClientsWithVisitsError, getClientsWithVisitsLoading } from '@/entities/ClientWithVisits/model/selectors/getClientsWithVisits/getClientsWithVisits';

interface ClientsListProps {
  className?: string;
  withVisits: boolean
}

export const ClientsList = memo((props: ClientsListProps) => {
  const { className, withVisits } = props
  const dispatch = useAppDispatch();
  const clients = useSelector(withVisits ? getClientsWithVisits : getClientsList);
  const isLoading = useSelector(withVisits ? getClientsWithVisitsLoading : getClientsListLoading);
  const error = useSelector(withVisits ? getClientsWithVisitsError : getClientsListError);

  const [isClientForm, setIsAClient] = useState(false);
  const onCloseModal = useCallback(() => {
    setIsAClient(false);
  }, []);

  const onShowModal = useCallback((client: Client) => {
    dispatch(clientsActions.setName(client.name));
    dispatch(clientsActions.setPhone(client.phone));
    setIsAClient(true);
  }, [clientsActions, dispatch]);

  if (isLoading) {
    return (
      <div>
        loading.....
      </div>
    )
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    )

  }


  return (
    <div className={classNames(cls.ClientsList, {}, [className])}>
      <h2>Clients list</h2>
      {
        clients.map(cl => <div className={cls.item} key={cl.id}>
          <b>name: {cl.name}</b> <p>phone :  {cl.phone}</p>
          {withVisits && (
            <>
              <h3>Visits:</h3>
              {cl.visits && cl.visits.map(visit => (
                <div key={visit.id}>
                  <b>date: {visit.date} time: {visit.time}</b>
                  <p> master : {visit.master.name} </p>
                </div>
              ))}
            </>
          )}
          <div className={cls.actions}>
            <p onClick={() => onShowModal(cl)} className={cls.edit}>&#10000;</p>
            <p className={cls.delete}>&#10007;</p></div>
        </div>)
      }
      {isClientForm && <ClientModal isOpen={isClientForm} onClose={onCloseModal} title="update client profile" actionName='update' />}
    </div>
  );
});