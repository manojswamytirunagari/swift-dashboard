export const getFilteredData = (data, query) => {
  if (!query) return data;
  const lower = query.toLowerCase();
  return data.filter(
    (item) =>
      item.name.toLowerCase().includes(lower) ||
      item.email.toLowerCase().includes(lower) ||
      item.body.toLowerCase().includes(lower)
  );
};
