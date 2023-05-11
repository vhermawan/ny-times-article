import { render } from '@testing-library/react';
import Modal, { ModalProps } from './index';

describe('Modal', () => {
  const onCloseMock = jest.fn();

  const renderModal = (props: ModalProps) => {
    return render(<Modal {...props} />);
  };

  it('renders the modal correctly', () => {
    const titleModal = 'Example Modal';
    const { getByText } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal,
      variant: 'info',
    });

    const titleElement = getByText(titleModal);
    expect(titleElement).toBeInTheDocument();

    const contentElement = getByText('Modal content');
    expect(contentElement).toBeInTheDocument();
  });

  it('applies the correct base class based on the variant prop', () => {
    const { container } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal: 'Example Modal',
      variant: 'warning',
    });

    const modalPanelElement = container.querySelector('.bg-yellow-500');
    expect(modalPanelElement).toBeInTheDocument();
    expect(modalPanelElement).toHaveClass('text-white');
  });

  it('applies the correct base class based on the variant success', () => {
    const { container } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal: 'Example Modal',
      variant: 'success',
    });

    const modalPanelElement = container.querySelector('.bg-green-500');
    expect(modalPanelElement).toBeInTheDocument();
    expect(modalPanelElement).toHaveClass('text-white');
  });

  it('calls onClose function when the modal is closed', () => {
    const { container } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal: 'Example Modal',
      variant: 'info',
    });

    const overlayElement = container.querySelector('.bg-black');
    overlayElement && overlayElement.dispatchEvent(new MouseEvent('click'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
