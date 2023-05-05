import { API } from "@/common/api/api";
import { z } from "zod";

export async function getArticles (type:string,day:number, responseSchema?: z.ZodSchema)  {
  const response = await API.get(`/mostpopular/v2/${type}/${day}.json?`)
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
