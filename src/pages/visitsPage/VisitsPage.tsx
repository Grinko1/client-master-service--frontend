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
import { useSelector } from 'react-redux';
import { getLoginRole } from '@/features/authByEmail/model/selectors/getLoginRole/getLoginRole';

import { getClientVisits, getMasterVisits } from '@/entities/Visit';
import { getProfileId } from '@/features/authByEmail';


interface VisitsPageProps {
    className?: string;
}

export const VisitsPage = memo((props: VisitsPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch();
    const role = useSelector(getLoginRole)
    const profileId = useSelector(getProfileId)

    useEffect(() => {
        if (role) {
            if (role.id === "CLIENT_ROLE") {
                profileId && dispatch(getClientVisits(profileId))
            } else if (role.is === "MASTER_ROLE") {
                profileId && dispatch(getMasterVisits(profileId))
            } else {
                dispatch(getAllVisits())
            }
        }

        dispatch(getAllClients())
        dispatch(getAllMasters())
        // dispatch(getAllVisits())
    }, [])

    const [isVisitForm, setIsVisitsForm] = useState(false);
    const [searchStr, setSearchStr] = useState("")

    const onChangeSearch = useCallback(
        (value: string) => {
            setSearchStr(value)
        },
        [dispatch],
    );


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