import { Articles, SearchArticles } from "../types";

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
        publishDate: data.pub_date,
      });
    });
  } else {
    dataArticle?.results.map((data: any, index: number) => {
      dataMapping.push({
        title: data.title,
        id: index,
        abstract: data.abstract,
        imageUrl: data.media[0]?.['media-metadata'][2].url
          ? data.media[0]?.['media-metadata'][2].url
          : 'https://i.pinimg.com/736x/4a/e7/af/4ae7af8e6f4f683a3090b8dd3da7889f.jpg',
        publishDate: data.published_date,
      });
    });
  }
  return dataMapping;
};