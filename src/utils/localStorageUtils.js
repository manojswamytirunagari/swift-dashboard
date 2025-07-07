const KEY = "dashboardSettings";

export const saveSettings = (settings) => {
  localStorage.setItem(KEY, JSON.stringify(settings));
};

export const getSettings = () => {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : {};
};
