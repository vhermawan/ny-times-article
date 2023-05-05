import axios from 'axios';
import { API_URL } from './initProperties';

const API_KEY = process.env.NEXT_PUBLIC_API_NY_TIMES_KEY

export const API = {
  get : async function (endPoint: string) {      
    return await axios.get(API_URL + endPoint + `api-key=${API_KEY}`)
    .then(response => {
      return response;
    }).catch(error => {
      throw error.response;
    });
  },
}