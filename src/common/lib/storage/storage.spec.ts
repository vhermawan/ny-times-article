import {storage} from './index'


describe('storage lib', () => {
  beforeEach(() => {
    // clear the localStorage before each test
    localStorage.clear();
  });

  describe('get', () => {
    it('returns null when localStorage is not available', () => {
      // temporarily remove the localStorage to simulate it not being available
      const localStorageBackup = localStorage;
      (window as any).localStorage = undefined;

      const result = storage.get('foo');
      expect(result).toBeNull();

      // restore the localStorage
      (window as any).localStorage = localStorageBackup;
    });

    it('returns the value for a given key when it exists', () => {
      // set an item in the localStorage to test retrieving it
      localStorage.setItem('foo', 'bar');

      const result = storage.get('foo');
      expect(result).toEqual('bar');
    });

    it('returns null when no value is set for the given key', () => {
      const result = storage.get('foo');
      expect(result).toBeNull();
    });
    
  })

  describe('set', () => {
    it('sets the value for a given key', () => {
      storage.set('foo', 'bar');

      const result = localStorage.getItem('foo');
      expect(result).toEqual('bar');
    });
  });

  describe('remove', () => {
    it('removes the value for a given key', () => {
      // set an item in the localStorage to test removing it
      localStorage.setItem('foo', 'bar');

      storage.remove('foo');

      const result = localStorage.getItem('foo');
      expect(result).toBeNull();
    });
  });

  describe('clear', () => {
    it('removes all values from localStorage', () => {
      // set some items in the localStorage to test clearing it
      localStorage.setItem('foo', 'bar');
      localStorage.setItem('baz', 'qux');

      storage.clear();

      const result1 = localStorage.getItem('foo');
      expect(result1).toBeNull();

      const result2 = localStorage.getItem('baz');
      expect(result2).toBeNull();
    });
  });
})