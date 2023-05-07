import { renderHook } from '@testing-library/react-hooks';
import useDebounce from './index';

describe('useDebounce', () => {
  it('should return the value after a delay', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 1000 } },
    );

    expect(result.current).toEqual('hello');

    rerender({ value: 'world', delay: 1000 });
    expect(result.current).toEqual('hello');

    await waitForNextUpdate();
    expect(result.current).toEqual('world');
  });
});
