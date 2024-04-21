import { memo, useCallback, useEffect, useState } from 'react';
import cls from './VisitsList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteVisit } from '../../model/services/deleteVisit';
import { visitsActions } from '../../model/slices/visitSlice';
import { Visit } from '../../model/types/visit';
import { getVisitsList } from '../../model/selectors/getVisitsList';
import { VisitModal } from '../visitModal/VisitModal';



interface VisitsListProps {
    className?: string;
}

export const VisitsList = memo((props: VisitsListProps) => {
    const { className } = props
    const dispatch = useAppDispatch();
    let visits = useSelector(getVisitsList)
    const [isVisitForm, setIsVisitModal] = useState(false);


    const onCloseModal = useCallback(() => {
        setIsVisitModal(false);
        dispatch(visitsActions.resetForm());
    }, []);

    const onShowModal = useCallback((visit: Visit) => {
        const form = {
            id: visit.id,
            date: visit.date,
            time: visit.time,
            masterId: visit.master.id,
            clientId: visit.client.id
        }
        dispatch(visitsActions.setForm(form))

        setIsVisitModal(true);
    }, [visitsActions, dispatch]);

    const handleDelete = useCallback((id: number) => {
        console.log("delete with id", id);
        dispatch(deleteVisit(id))
    }, [])



    return (
        <div className={classNames(cls.MastersList, {}, [className])}>
            <h2>Visits list</h2>
            {
                visits.length && visits.map(visit => <div className={cls.item} key={visit.id}>
                    <b>date: {visit.date}</b> <p>time :  {visit.time}</p>

                    <h3>Master:</h3>
                    {visit.master &&
                        <div>
                            <b>name: {visit.master.name}. description: {visit.master.name}</b>

                        </div>
                    }
                    <h3>Client:</h3>
                    {visit.client &&
                        <div>
                            <b> client : {visit.client.name}. phone: {visit.client.phone} </b>
                        </div>
                    }


                    <div className={cls.actions}>
                        <p onClick={() => onShowModal(visit)} className={cls.edit}>&#10000;</p>
                        <p className={cls.delete} onClick={() => handleDelete(visit.id)}>&#10007;</p></div>
                </div>)
            }
            {isVisitForm && <VisitModal isOpen={isVisitForm} onClose={onCloseModal} title="update visit" actionName='update' />}
        </div>
    );
});