import { memo, useCallback, useEffect, useState } from 'react';
import cls from './MastersPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { getAllMasters } from '@/entities/Master';
import { MastersList } from '@/entities/Master/ui/mastersList/MastersList';
import { MasterModal } from '@/entities/Master/ui/masterModal/MasterModal';


interface MastersPageProps {
    className?: string;
}

export const MastersPage = memo((props: MastersPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch();

    const [showWithVisits, setShowWithVisits] = useState(false)
    const [isMasterForm, setIsMasterForm] = useState(false);
    const [searchStr, setSearchStr] = useState("")

    const onChangeSearch = useCallback(
        (value: string) => {
            setSearchStr(value)
        },
        [dispatch],
    );
    useEffect(() => {
        dispatch(getAllMasters())
    }, [])

    const onCloseModal = useCallback(() => {
        setIsMasterForm(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsMasterForm(true);
    }, []);


    return (
        <div className={classNames(cls.MastersPage, {}, [className])}>
            <h1>Masters page</h1>
            <hr />
            <div className={cls.toolbar}>
                <Button onClick={onShowModal}>Add master</Button>
                <div>show with visits
                    <input type="checkbox" checked={showWithVisits} onChange={() => setShowWithVisits(!showWithVisits)} />
                </div>
                <div>
                    <Input placeholder='search' size='m' value={searchStr} onChange={onChangeSearch} />
                </div>
            </div>
            <hr />
            <MastersList withVisits={showWithVisits} />
            {isMasterForm && <MasterModal isOpen={isMasterForm} onClose={onCloseModal} title='Add master' actionName='add' />}
        </div>
    );
});