
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
