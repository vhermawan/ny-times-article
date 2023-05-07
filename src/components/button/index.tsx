import { FC } from 'react';

export type Variant = 'success' | 'info' | 'warning';

export type ButtonProps = {
  text: string;
  onClick: () => void;
  type: 'submit' | 'button';
  variant: Variant;
};

const Button: FC<ButtonProps> = ({ text, onClick, type, variant }) => {
  const getBaseClass = (variant: Variant): string => {
    switch (variant) {
      case 'success':
        return 'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800';
      case 'info':
        return 'bg-blue-800 border hover:bg-blue-800 dark:bg-blue-600 dark:focus:ring-blue-800';
      case 'warning':
        return 'bg-yellow-800 border hover:bg-yellow-800 dark:bg-yellow-600 dark:focus:ring-yellow-800';
      default:
        const neverHappen: never = variant;
        return neverHappen;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${getBaseClass(
        variant,
      )} text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center`}
    >
      {text}
    </button>
  );
};

export default Button;
