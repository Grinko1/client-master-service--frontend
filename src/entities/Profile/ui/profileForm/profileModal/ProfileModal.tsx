import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ProfileFormAsync } from '../profileForm/ProfileForm.async';



interface ProfileModalProps {
  className?: string;
  isOpen: boolean;
  title: string;
  actionName: string;
  onClose: () => void;
}

export const ProfileModal = ({ className, isOpen, title, actionName, onClose }: ProfileModalProps) => (
  <Modal
    className={classNames('', {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<div>Loading....</div>}>
      <ProfileFormAsync onSuccess={onClose} title={title} actionName={actionName} />
    </Suspense>
  </Modal>
);
