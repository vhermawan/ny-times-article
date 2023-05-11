import { formatDate } from "@/common/lib/format";
import { FilterArticle, SearchArticles } from "../types";
import { CountDiffDays } from "@/helpers";

export const mappingData = (dataArticle: any, isSearch: boolean) => {
  let dataMapping: Articles[] = [];
  if (isSearch) {
    dataArticle.response.docs.map((data: SearchArticles, index: number) => {
      dataMapping.push({
        title: data.headline.main,
        id: index,
        abstract: data.abstract,
        imageUrl: data.multimedia[0]
          ? `http://www.nytimes.com/${data.multimedia[0]?.url}`
          : 'https://i.pinimg.com/736x/4a/e7/af/4ae7af8e6f4f683a3090b8dd3da7889f.jpg',
        publishDate: formatDate(data.pub_date || ''),
        articleUrl: data.web_url,
        priceArticle: mappingPriceArticle(data.pub_date)
      });
    });
  } else {
    dataArticle?.results.map((data: FilterArticle, index: number) => {
      dataMapping.push({
        title: data.title,
        id: index,
        abstract: data.abstract,
        imageUrl: data.media[0]?.['media-metadata'][2]?.url
          ? data.media[0]?.['media-metadata'][2].url
          : 'https://i.pinimg.com/736x/4a/e7/af/4ae7af8e6f4f683a3090b8dd3da7889f.jpg',
        publishDate: formatDate(data.published_date),
        articleUrl: data.url,
        priceArticle: mappingPriceArticle(data.published_date)
      });
    });
  }
  return dataMapping;
};

export const mappingPriceArticle = (publishDate: string): number => {
  const diffInDays = CountDiffDays(publishDate)

  if(diffInDays <= 1)return 50000
  else if(diffInDays <= 7) return 20000
  else return 0
}

export const countLimitFreeArticle = (publishDate: string, quotaLimit: number): number => {
  const diffInDays = CountDiffDays(publishDate)

  if(diffInDays >= 7)return quotaLimit-1
  else return quotaLimit
}

export const getTicket = (price: number): number => {
  if(price === 50000) return 3
  else return 0 
}