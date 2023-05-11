import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, Variant } from './index';

describe('Button', () => {
  const onClickMock = jest.fn();

  const renderButton = (props: ButtonProps) => {
    return render(<Button {...props} />);
  };

  it('renders the button correctly', () => {
    const buttonText = 'Click me';
    const { getByText } = renderButton({
      text: buttonText,
      onClick: onClickMock,
      type: 'button',
      variant: 'success',
    });

    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('calls onClick function when the button is clicked', () => {
    const { getByText } = renderButton({
      text: 'Click me',
      onClick: onClickMock,
      type: 'button',
      variant: 'success',
    });

    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies the correct base class based on the variant prop', () => {
    const { container } = renderButton({
      text: 'Button',
      onClick: onClickMock,
      type: 'button',
      variant: 'warning',
    });

    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass('bg-yellow-800');
    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).toHaveClass('hover:bg-yellow-800');
    expect(buttonElement).toHaveClass('dark:bg-yellow-600');
    expect(buttonElement).toHaveClass('dark:focus:ring-yellow-800');
  });

  it('applies the correct base class based on the variant info prop', () => {
    const { container } = renderButton({
      text: 'Button',
      onClick: onClickMock,
      type: 'button',
      variant: 'info',
    });

    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass('bg-blue-800');
    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).toHaveClass('hover:bg-blue-800');
    expect(buttonElement).toHaveClass('dark:bg-blue-600');
    expect(buttonElement).toHaveClass('dark:focus:ring-blue-800');
  });
});
