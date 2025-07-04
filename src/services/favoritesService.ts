const FAVORITES_KEY = 'favoritos';

export const getFavorites = (): number[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addFavorite = (id: number): void => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: number): void => {
  const favorites = getFavorites().filter(favId => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
