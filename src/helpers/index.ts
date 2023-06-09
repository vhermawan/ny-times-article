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

export function Slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-)|(-$)/g, '');
}

export function CountDiffDays(publishDate: string): number {
  const date = new Date();
  const startDate = new Date(publishDate);
  const diffInMilliseconds = date.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays;
}