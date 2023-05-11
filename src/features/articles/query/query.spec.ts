import { getArticles, searchArticles } from './index';
import { API } from "@/common/api/api";
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

jest.mock('axios');
jest.mock('@/common/api/api');

describe('getArticles', () => {
  it('fetches articles based on type and period', async () => {
    const mockResponse: AxiosResponse<any, any> = {
      data: {}, 
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
    const type = 'emailed';
    const period = '7';

    const mockGet = jest.spyOn(API, 'get').mockResolvedValue(mockResponse);
    
    const result = await getArticles(type, period);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);

    mockGet.mockRestore();
  });

  it('fetches articles based on search param', async () => {
    const mockResponse: AxiosResponse<any, any> = {
      data: {}, 
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
    const page = 1;

    const mockGet = jest.spyOn(API, 'get').mockResolvedValue(mockResponse);
    
    const result = await searchArticles(page);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);

    mockGet.mockRestore();
  });
});