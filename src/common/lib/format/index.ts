export const formatToMoney = (value: number): string => {
  const dataParsed = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return dataParsed;
};