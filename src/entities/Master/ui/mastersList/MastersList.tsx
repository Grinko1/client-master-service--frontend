import { memo, useCallback, useState } from 'react';
import cls from './MastersList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getMastersList } from '../../model/selectors/getMastersList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Master } from '../../model/types/master';
import { mastersActions } from '../../model/slices/materSlice';
import { MasterModal } from '../masterModal/MasterModal';
import { deleteMaster } from '../../model/services/deleteMaster';


interface MastersListProps {
    className?: string;
    withVisits: boolean
}

export const MastersList = memo((props: MastersListProps) => {
    const { className, withVisits } = props
    const dispatch = useAppDispatch();

    const [isMasterForm, setIsMasterModal] = useState(false);
    const onCloseModal = useCallback(() => {
        setIsMasterModal(false);
        dispatch(mastersActions.resetForm())
    }, []);

    const onShowModal = useCallback((master: Master) => {
        dispatch(mastersActions.setId(master.id))
        dispatch(mastersActions.setName(master.name));
        dispatch(mastersActions.setDescription(master.description));
        setIsMasterModal(true);
    }, [mastersActions, dispatch]);

    const handleDelete = useCallback((id: number) => {
        console.log("delete with id", id);
        dispatch(deleteMaster(id))
    }, [])


    const masters = useSelector(getMastersList)
    return (
        <div className={classNames(cls.MastersList, {}, [className])}>
            <h2>Masters list</h2>
            {
                masters.map(master => <div className={cls.item} key={master.id}>
                    <b>name: {master.name}</b> <p>description :  {master.description}</p>
                    {withVisits && (
                        <>
                            <h3>Visits:</h3>
                            {master.visits && master.visits.map(visit => (
                                <div key={visit.id}>
                                    <b>date: {visit.date} time: {visit.time}</b>
                                    <p> client : {visit.client.name} phone: {visit.client.phone} </p>
                                </div>
                            ))}
                        </>
                    )}
                    <div className={cls.actions}>
                        <p onClick={() => onShowModal(master)} className={cls.edit}>&#10000;</p>
                        <p className={cls.delete} onClick={() => handleDelete(master.id)}>&#10007;</p></div>
                </div>)
            }
            {isMasterForm && <MasterModal isOpen={isMasterForm} onClose={onCloseModal} title="update master profile" actionName='update' />}
        </div>
    );
});