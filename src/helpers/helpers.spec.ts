import { storage } from '@/common/lib/storage';
import InitData from '@/data/init.json'
import { Encryption, Decryption, InitializeData, ResetData, GetDataUser } from './index';

describe('Encryption and Decryption functions', () => {
  it('should correctly encode and decode a string', () => {
    const value = 'hello world';
    const encoded = Encryption(value);
    const decoded = Decryption<string>(encoded);
    expect(decoded).toEqual(value);
  });

  it('should correctly encode and decode an object', () => {
    interface TestObject {
      name: string;
      age: number;
    }
    const value: TestObject = { name: 'Alice', age: 25 };
    const encoded = Encryption(value);
    const decoded = Decryption<TestObject>(encoded);
    expect(decoded).toEqual(value);
  });
});

describe('InitializeData and ResetData functions', () => {
  beforeEach(() => {
    // Clear storage before each test
    storage.clear();
  });

  it('should initialize data if it does not exist', () => {
    InitializeData();
    expect(storage.get('USER_DATA')).toBeDefined();
  });

  it('should reset data to initial value', () => {
    ResetData();
    expect(storage.get('USER_DATA')).toBeDefined();
    const decoded = Decryption<UserData>(storage.get('USER_DATA') || '');
    expect(decoded).toEqual(InitData);
  });
});

describe('GetDataUser function', () => {
  beforeEach(() => {
    // Clear storage before each test
    storage.clear();
  });

  it('should return undefined if data does not exist', () => {
    const data = GetDataUser();
    expect(data).toBeUndefined();
  });

  it('should return decrypted data if it exists', () => {
    storage.set('USER_DATA', Encryption(InitData));
    const data = GetDataUser();
    expect(data).toEqual(InitData);
  });
});
