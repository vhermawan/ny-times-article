import { Buffer } from 'buffer';
import InitData from '@/data/init.json'
import { storage } from '@/common/lib/storage';

export function Encryption<T>(value: T):string{
  const encode = Buffer.from(JSON.stringify(value)).toString('base64');
  return encode;
};

export function Decryption<T>(value: string):T{
  const decode = JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));
  return decode as T;
};

export function InitializeData():void{
  const checkInitData = storage.get('USER_DATA')
  if(!checkInitData) storage.set('USER_DATA', Encryption(InitData))
}

export function ResetData():void{
  storage.set('USER_DATA', Encryption(InitData))
}

export function GetDataUser():UserData | undefined{
  const checkInitData = storage.get('USER_DATA')
  if(checkInitData) return Decryption(checkInitData)
}