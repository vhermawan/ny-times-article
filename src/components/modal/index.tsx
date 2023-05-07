import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';

export type Variant = 'success' | 'info' | 'warning' | 'danger';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titleModal: string;
  variant: Variant;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, titleModal, variant }) => {
  const getBaseClass = (variant: Variant): string => {
    switch (variant) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'info':
        return 'bg-white text-black';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'danger':
        return 'bg-red-500 text-white';
      default:
        const neverHappen: never = variant;
        return neverHappen;
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl ${getBaseClass(
                    variant,
                  )} p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                    {titleModal}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
