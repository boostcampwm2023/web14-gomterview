import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalLayout from './ModalLayout';

type ModalComponent = typeof ModalLayout & {
  header: typeof ModalHeader;
  content: typeof ModalContent;
  footer: typeof ModalFooter;
};
const Modal: ModalComponent = ModalLayout as ModalComponent;

Modal.header = ModalHeader;
Modal.content = ModalContent;
Modal.footer = ModalFooter;

export default Modal;
