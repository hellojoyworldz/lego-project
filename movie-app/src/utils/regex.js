export const formatMondy = (str) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
