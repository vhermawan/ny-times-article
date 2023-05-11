import { render, fireEvent } from '@testing-library/react';
import Select, { SelectProps } from './index';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const onSelectMock = jest.fn();

  const renderSelect = (props: SelectProps) => {
    return render(
      <>
        <label htmlFor="select">Select</label>
        <Select {...props} />
      </>,
    );
  };

  it('renders the Select component correctly', () => {
    const { getByLabelText } = renderSelect({
      listOption: options,
      onSelect: onSelectMock,
      value: 'option2',
    });

    const selectElement = getByLabelText('Select');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('option2');

    const optionElements = selectElement.querySelectorAll('option');
    expect(optionElements.length).toBe(options.length);
  });

  it('calls onSelect function when an option is selected', () => {
    const { getByLabelText } = renderSelect({
      listOption: options,
      onSelect: onSelectMock,
      value: 'option2',
    });

    const selectElement = getByLabelText('Select');
    fireEvent.change(selectElement, { target: { value: 'option3' } });

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith('option3');
  });
});
