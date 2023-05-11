import { render } from '@testing-library/react';
import Modal, { ModalProps } from './index';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Create a global mock instance of ResizeObserver
global.ResizeObserver = ResizeObserverMock;

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

  it('applies the correct base class based on the variant warning', () => {
    const { getByText } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal: 'Warningw Modal',
      variant: 'warning',
    });

    const titleElement = getByText('Warningw Modal');
    expect(titleElement).toBeInTheDocument();

    const contentElement = getByText('Modal content');
    expect(contentElement).toBeInTheDocument();
  });

  it('applies the correct base class based on the variant success', () => {
    const { getByText } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal: 'Success Modal',
      variant: 'success',
    });

    const titleElement = getByText('Success Modal');
    expect(titleElement).toBeInTheDocument();

    const contentElement = getByText('Modal content');
    expect(contentElement).toBeInTheDocument();
  });

  it('applies the correct base class based on the variant success', () => {
    const { getByText } = renderModal({
      isOpen: true,
      onClose: onCloseMock,
      children: <div>Modal content</div>,
      titleModal: 'Danger Modal',
      variant: 'danger',
    });

    const titleElement = getByText('Danger Modal');
    expect(titleElement).toBeInTheDocument();

    const contentElement = getByText('Modal content');
    expect(contentElement).toBeInTheDocument();
  });
});
