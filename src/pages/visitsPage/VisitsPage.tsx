import { memo, useCallback, useEffect, useState } from 'react';
import cls from './VisitsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { VisitsList } from '@/entities/Visit/ui/visitsList/VisitsList';
import { getAllVisits } from '@/entities/Visit/model/services/getAllVisits';
import { getAllClients } from '@/entities/Client/model/services/getAllClients';
import { getAllMasters } from '@/entities/Master';
import { VisitModal } from '@/entities/Visit/ui/visitModal/VisitModal';

interface VisitsPageProps {
    className?: string;
}

export const VisitsPage = memo((props: VisitsPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllClients())
        dispatch(getAllMasters())
    }, [])

    const [isVisitForm, setIsVisitsForm] = useState(false);
    const [searchStr, setSearchStr] = useState("")

    const onChangeSearch = useCallback(
        (value: string) => {
            setSearchStr(value)
        },
        [dispatch],
    );
    useEffect(() => {
        dispatch(getAllVisits())
    }, [])

    const onCloseModal = useCallback(() => {
        setIsVisitsForm(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsVisitsForm(true);
    }, []);
    return (
        <div className={classNames(cls.VisitsPage, {}, [className])}>
            <h1>Visits page</h1>
            <hr />
            <div className={cls.toolbar}>
                <Button onClick={onShowModal}>Add visit</Button>
                <div>
                    <Input placeholder='search' size='m' value={searchStr} onChange={onChangeSearch} />
                </div>
            </div>
            <hr />
            <VisitsList />
            {isVisitForm && <VisitModal isOpen={isVisitForm} onClose={onCloseModal} title='Add master' actionName='add' />}
        </div>
    );
});