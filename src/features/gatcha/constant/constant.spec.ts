import { MAX_AMOUNT, MIN_AMOUNT, LUCKY_AMOUNT } from '.';

describe('Constants', () => {
  it('should have the correct value for MAX_AMOUNT', () => {
    expect(MAX_AMOUNT).toEqual(50000);
  });

  it('should have the correct value for MIN_AMOUNT', () => {
    expect(MIN_AMOUNT).toEqual(1000);
  });

  it('should have the correct value for LUCKY_AMOUNT', () => {
    expect(LUCKY_AMOUNT).toEqual(13);
  });
});
