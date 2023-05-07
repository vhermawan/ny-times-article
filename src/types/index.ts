interface Articles {
  title:string;
  imageUrl: string;
  publishDate: string;
  abstract:string;
  articleUrl: string;
  id:number;
}

type UserData = {
  totalCoin: number;
  totalTicket: number;
  books: {
    total: number;
    list: Articles[]
  }
}

type BreadCumbs = {id:number, url: string | null, text: string | undefined}

type Options = {label: string, value:string}