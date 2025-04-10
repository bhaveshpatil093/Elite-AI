export const getApiKey = (provider: string): string | null => {
  const key = localStorage.getItem(`${provider}_api_key`);
  return key;
};

export const handleSaveApiKey = (provider: string, key: string): void => {
  localStorage.setItem(`${provider}_api_key`, key);
}; 