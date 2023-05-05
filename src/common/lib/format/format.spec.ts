import { formatToMoney } from '@/common/lib/format';

describe('formatToMoney function', () => {
  it('should return formatted string with dots for thousands separator', () => {
    const result = formatToMoney(1000)
    expect(result).toEqual('1.000');
  });
});
