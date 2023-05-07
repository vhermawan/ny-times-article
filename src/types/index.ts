
type ListBooks = {
  title: string
}

type UserData = {
  totalCoin: number;
  totalTicket: number;
  books: {
    total: number;
    list: ListBooks[]
  }
}

type BreadCumbs = {id:number, url: string | null, text: string | undefined}

type Options = {label: string, value:string}