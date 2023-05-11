import { formatToMoney, formatDate } from '@/common/lib/format';

describe('formatToMoney function', () => {
  it('should return formatted string with dots for thousands separator', () => {
    const result = formatToMoney(1000)
    expect(result).toEqual('1.000');
  });
});


describe('formatDate', () => {
  it('formats the date string correctly', () => {
    const dateString = '2023-05-11';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('11 May 2023');
  });

  it('returns an empty string when given an invalid date string', () => {
    const dateString = 'invalid-date';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('Invalid Date');
  });
});