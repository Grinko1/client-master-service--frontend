import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VisitFormAsync } from '../visitForm/VisitForm.async';




interface MasterModalProps {
  className?: string;
  isOpen: boolean;
  title: string;
  actionName: string;
  onClose: () => void;
}

export const VisitModal = ({ className, isOpen, title, actionName, onClose }: MasterModalProps) => (
  <Modal
    className={classNames('', {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<div>Loading....</div>}>
      <VisitFormAsync onSuccess={onClose} title={title} actionName={actionName} />
    </Suspense>
  </Modal>
);
