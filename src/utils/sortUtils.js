export const sortData = (data, config) => {
  if (!config.key || !config.direction) return data;

  return [...data].sort((a, b) => {
    const aVal = a[config.key].toString().toLowerCase();
    const bVal = b[config.key].toString().toLowerCase();

    if (aVal < bVal) return config.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return config.direction === "asc" ? 1 : -1;
    return 0;
  });
};
