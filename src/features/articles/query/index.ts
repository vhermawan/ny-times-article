import { API } from "@/common/api/api";

export function getArticles (type:string,day:number)  {
  const data = API.get(`/mostpopular/v2/${type}/${day}.json?`)
  return data;
}
