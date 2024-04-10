import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { MasterFormAsync } from '../masterForm/MasterForm.async';




interface MasterModalProps {
  className?: string;
  isOpen: boolean;
  title: string;
  actionName: string;
  onClose: () => void;
}

export const MasterModal = ({ className, isOpen, title, actionName, onClose }: MasterModalProps) => (
  <Modal
    className={classNames('', {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<div>Loading....</div>}>
      <MasterFormAsync onSuccess={onClose} title={title} actionName={actionName} />
    </Suspense>
  </Modal>
);
