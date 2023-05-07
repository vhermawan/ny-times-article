import { API } from "@/common/api/api";
import { z } from "zod";

export async function getArticles (type:string, period:string, responseSchema?: z.ZodSchema)  {
  const response = await API.get(`/mostpopular/v2/${type}/${period}.json?`)
  if (response?.status >= 200 || response?.status < 400) {
    if (responseSchema) {
      try {
        return responseSchema.parse(response.data);
      } catch (error) {
        throw new Error();
      }
    }
    return response.data;
  }
}

export async function searchArticles (page: number, responseSchema?: z.ZodSchema)  {
  const response = await API.get(`/search/v2/articlesearch.json?sort=newest&page=${page}&begin_date=20130101&end_date=20230301&`)
  if (response?.status >= 200 || response?.status < 400) {
    if (responseSchema) {
      try {
        return responseSchema.parse(response.data);
      } catch (error) {
        throw new Error();
      }
    }
    return response.data;
  }
}
