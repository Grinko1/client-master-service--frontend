import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ClientFormAsync } from '../clientForm/ClientForm.async';
import ClientForm, { ClientFormProps } from '../clientForm/ClientForm';
import { time } from 'console';
import { ClientDataProps } from '@/entities/Client/model/types/client';



interface ClientModalProps {
  className?: string;
  isOpen: boolean;
  title: string;
  actionName: string;
  onClose: () => void;
}

export const ClientModal = ({ className, isOpen, title, actionName, onClose }: ClientModalProps) => (
  <Modal
    className={classNames('', {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<div>Loading....</div>}>
      <ClientFormAsync onSuccess={onClose} title={title} actionName={actionName} />
    </Suspense>
  </Modal>
);
