export const formatToMoney = (value: number): string => {
  const dataParsed = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return dataParsed;
};

export const formatDate = (dateString: string):string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
}