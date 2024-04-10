import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ClientFormAsync } from '../clientForm/ClientForm.async';

interface ClientModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ClientModal = ({ className, isOpen, onClose }: ClientModalProps) => (
  <Modal
    className={classNames('', {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<div>Loading....</div>}>
      <ClientFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
);
