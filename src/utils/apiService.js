import axios from 'axios';

const API_BASE_URL = 'https://www.omdbapi.com';
const API_KEY = 'ee51dca';

/**
 * Search for movies by title
 * @param {string} searchQuery - Movie title to search
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} Array of movies
 */
export const searchMovies = async (searchQuery, page = 1) => {
  try {
    if (!searchQuery.trim()) return [];
    
    const response = await axios.get(API_BASE_URL, {
      params: {
        s: searchQuery,
        apikey: API_KEY,
        page: page,
        type: 'movie'
      }
    });

    if (response.data.Response === 'True') {
      return response.data.Search || [];
    }
    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get detailed information about a specific movie
 * @param {string} imdbID - IMDB ID of the movie
 * @returns {Promise<Object>} Detailed movie information
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        i: imdbID,
        apikey: API_KEY,
        type: 'movie',
        plot: 'full'
      }
    });

    if (response.data.Response === 'True') {
      return response.data;
    }
    throw new Error('Movie not found');
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Get trending movies
 * @returns {Promise<Array>} Array of popular movies
 */
export const getTrendingMovies = async () => {
  try {
    const trendingSearches = ['Avengers', 'Inception', 'Dark Knight', 'Interstellar', 'Matrix'];
    const randomSearch = trendingSearches[Math.floor(Math.random() * trendingSearches.length)];
    
    const response = await axios.get(API_BASE_URL, {
      params: {
        s: randomSearch,
        apikey: API_KEY,
        type: 'movie'
      }
    });

    if (response.data.Response === 'True') {
      return response.data.Search || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

/**
 * Get movies by genre/category
 * @param {string} category - Movie category/search term
 * @returns {Promise<Array>} Array of movies in category
 */
export const getMoviesByCategory = async (category) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        s: category,
        apikey: API_KEY,
        type: 'movie'
      }
    });

    if (response.data.Response === 'True') {
      return response.data.Search || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    throw error;
  }
};
