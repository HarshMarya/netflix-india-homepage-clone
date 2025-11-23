import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  getFavorites, 
  addToFavorites, 
  removeFromFavorites, 
  isFavorite,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  getWatchHistory,
  addToWatchHistory
} from '../utils/localStorage';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getFavorites());
  const [watchlist, setWatchlist] = useState(getWatchlist());
  const [watchHistory, setWatchHistory] = useState(getWatchHistory());
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = useCallback((movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
      setFavorites(getFavorites());
      return false;
    } else {
      addToFavorites(movie);
      setFavorites(getFavorites());
      return true;
    }
  }, []);

  const toggleWatchlist = useCallback((movie) => {
    if (isInWatchlist(movie.imdbID)) {
      removeFromWatchlist(movie.imdbID);
      setWatchlist(getWatchlist());
      return false;
    } else {
      addToWatchlist(movie);
      setWatchlist(getWatchlist());
      return true;
    }
  }, []);

  const addMovieToHistory = useCallback((movie, duration = 0) => {
    addToWatchHistory(movie, duration);
    setWatchHistory(getWatchHistory());
  }, []);

  const clearWatchHistory = useCallback(() => {
    localStorage.removeItem('netflix_watch_history');
    setWatchHistory([]);
  }, []);

  const value = {
    // Favorites
    favorites,
    toggleFavorite,
    isFavorite: (imdbID) => isFavorite(imdbID),

    // Watchlist
    watchlist,
    toggleWatchlist,
    isInWatchlist: (imdbID) => isInWatchlist(imdbID),

    // Watch History
    watchHistory,
    addMovieToHistory,
    clearWatchHistory,

    // Search
    searchResults,
    setSearchResults,

    // Selected Movie
    selectedMovie,
    setSelectedMovie,

    // Loading State
    isLoading,
    setIsLoading,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within MovieProvider');
  }
  return context;
};
