import { API } from "@/common/api/api";


export async function getArticles (type:string, period:string)  {
  const response = await API.get(`/mostpopular/v2/${type}/${period}.json?`)
  return response.data;
}

export async function searchArticles (page: number)  {
  const response = await API.get(`/search/v2/articlesearch.json?sort=newest&page=${page}&`)
  return response.data;
}
