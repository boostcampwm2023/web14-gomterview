import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalLayout, { ModalLayoutProps } from './ModalLayout';
import enhanceChildElement from '@/utils/enhanceChildElement';

const Modal = ({ children, isOpen, closeModal, ...args }: ModalLayoutProps) => {
  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal} {...args}>
      {enhanceChildElement({
        children: children,
        component: ModalHeader,
        newProps: { closeModal },
      })}
    </ModalLayout>
  );
};

Modal.header = ModalHeader;
Modal.content = ModalContent;
Modal.footer = ModalFooter;

export default Modal;
