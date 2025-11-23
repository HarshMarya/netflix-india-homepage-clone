/**
 * Favorites management with localStorage
 */

const FAVORITES_KEY = 'netflix_favorites';
const WATCHLIST_KEY = 'netflix_watchlist';
const WATCH_HISTORY_KEY = 'netflix_watch_history';

/**
 * Get all favorites from localStorage
 * @returns {Array} Array of favorite movies
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

/**
 * Add movie to favorites
 * @param {Object} movie - Movie object to add
 */
export const addToFavorites = (movie) => {
  try {
    const favorites = getFavorites();
    const exists = favorites.find(m => m.imdbID === movie.imdbID);
    
    if (!exists) {
      favorites.unshift({ ...movie, addedDate: new Date().toISOString() });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

/**
 * Remove movie from favorites
 * @param {string} imdbID - IMDB ID of movie to remove
 */
export const removeFromFavorites = (imdbID) => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(m => m.imdbID !== imdbID);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

/**
 * Check if movie is in favorites
 * @param {string} imdbID - IMDB ID of movie
 * @returns {boolean}
 */
export const isFavorite = (imdbID) => {
  const favorites = getFavorites();
  return favorites.some(m => m.imdbID === imdbID);
};

/**
 * Get all watchlist items
 * @returns {Array} Array of watchlist movies
 */
export const getWatchlist = () => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
};

/**
 * Add movie to watchlist
 * @param {Object} movie - Movie object to add
 */
export const addToWatchlist = (movie) => {
  try {
    const watchlist = getWatchlist();
    const exists = watchlist.find(m => m.imdbID === movie.imdbID);
    
    if (!exists) {
      watchlist.unshift({ ...movie, addedDate: new Date().toISOString() });
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

/**
 * Remove movie from watchlist
 * @param {string} imdbID - IMDB ID of movie to remove
 */
export const removeFromWatchlist = (imdbID) => {
  try {
    const watchlist = getWatchlist();
    const filtered = watchlist.filter(m => m.imdbID !== imdbID);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

/**
 * Check if movie is in watchlist
 * @param {string} imdbID - IMDB ID of movie
 * @returns {boolean}
 */
export const isInWatchlist = (imdbID) => {
  const watchlist = getWatchlist();
  return watchlist.some(m => m.imdbID === imdbID);
};

/**
 * Add to watch history
 * @param {Object} movie - Movie watched
 * @param {number} duration - Watch duration in seconds
 */
export const addToWatchHistory = (movie, duration = 0) => {
  try {
    const history = getWatchHistory();
    const index = history.findIndex(m => m.imdbID === movie.imdbID);
    
    const movieEntry = {
      ...movie,
      duration,
      watchedDate: new Date().toISOString()
    };

    if (index >= 0) {
      history[index] = movieEntry;
    } else {
      history.unshift(movieEntry);
    }

    // Keep only last 50 entries
    if (history.length > 50) {
      history.pop();
    }

    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error adding to watch history:', error);
    return false;
  }
};

/**
 * Get watch history
 * @returns {Array} Array of watched movies
 */
export const getWatchHistory = () => {
  try {
    const history = localStorage.getItem(WATCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting watch history:', error);
    return [];
  }
};

/**
 * Clear all data
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(WATCH_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};
