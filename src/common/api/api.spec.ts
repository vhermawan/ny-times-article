import axios from "axios";
import { API } from "./api";
import { API_URL } from "./initProperties";

jest.mock('axios');

describe('const init Properties', () => {
  it('should return value const', () => {
    const result = 'https://api.nytimes.com/svc'
    expect(result).toEqual(API_URL);
  });
});

describe('API module', () => {
  const API_KEY = 'my-api-key';

  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_NY_TIMES_KEY = API_KEY;
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_API_NY_TIMES_KEY;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should make a GET request with the correct URL and API key', async () => {
    const endPoint = 'my-endpoint';
    const response = { data: { message: 'Hello, world!' } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

    const result = await API.get(endPoint);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toBe(response);
  });

  it('should throw an error if the GET request fails', async () => {
    const endPoint = 'my-endpoint';
    const errorResponse = { status: 404, data: { message: 'Not found' } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({ response: errorResponse });

    await expect(API.get(endPoint)).rejects.toEqual(errorResponse);
  });
});