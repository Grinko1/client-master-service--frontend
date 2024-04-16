import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FormAsync } from '../form/Form.async';





interface AppointmentModalProps {
  className?: string;
  isOpen: boolean;
  title: string;
  actionName: string;
  onClose: () => void;
}

export const AppointmentModal = ({ className, isOpen, title, actionName, onClose }: AppointmentModalProps) => (
  <Modal
    className={classNames('', {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<div>Loading....</div>}>
      <FormAsync onSuccess={onClose} title={title} actionName={actionName} />
    </Suspense>
  </Modal>
);
