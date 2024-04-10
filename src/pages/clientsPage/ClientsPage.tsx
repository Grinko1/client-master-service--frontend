import { memo, useCallback, useEffect, useState } from 'react';
import cls from './ClientsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAllClients } from '@/entities/Client/model/services/getAllClients';
import { getAllClientsWithVisits } from '@/entities/ClientWithVisits/model/services/getAllClientsWithVisits';
import { ClientsList } from '@/entities/Client';
import { ClientModal } from '@/entities/Client/ui/clientForm/clientModal/ClientModal';
import { ClientsListWithVisits } from '@/entities/ClientWithVisits';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input } from '@/shared/ui/redesigned/Input/Input';

interface ClientsPageProps {
    className?: string;
}

export const ClientsPage = memo((props: ClientsPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch();
    const [showWithVisits, setShowWithVisits] = useState(false)
    const [searchStr, setSearchStr] = useState("")

    const onChangeSearch = useCallback(
        (value: string) => {
            setSearchStr(value)
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(getAllClients())
        dispatch(getAllClientsWithVisits())
    }, [])

    const [isClientForm, setIsAClient] = useState(false);
    const onCloseModal = useCallback(() => {
        setIsAClient(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAClient(true);
    }, []);
    console.log(showWithVisits);
    return (
        <div className={classNames(cls.ClientsPage, {}, [className])}>
            <h1>Clients page</h1>
            <hr />
            <div className={cls.toolbar}>
                <Button onClick={onShowModal}>Add client</Button>
                <div>show with visits
                    <input type="checkbox" checked={showWithVisits} onChange={() => setShowWithVisits(!showWithVisits)} />
                </div>
                <div>
                    <Input placeholder='search' size='m' value={searchStr} onChange={onChangeSearch} />
                </div>

            </div>

            <hr />
            <ClientsList withVisits={showWithVisits} />
            {/* {showWithVisits ? <ClientsListWithVisits /> : <ClientsList />} */}

            {isClientForm && <ClientModal isOpen={isClientForm} onClose={onCloseModal} title='Add client' actionName='add' />}
            <br />
            <hr />

        </div>
    );
});