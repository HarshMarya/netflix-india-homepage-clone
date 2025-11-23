import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaStar, FaFilter } from 'react-icons/fa';
import { useClickAway } from 'react-use';
import { searchMovies } from '../utils/apiService';
import { useMovieContext } from '../context/MovieContext';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: 'all',
    rating: 'all',
    type: 'all',
  });
  const { toggleFavorite, isFavorite } = useMovieContext();
  const filterRef = useRef(null);

  // Close filter dropdown on click away
  useClickAway(filterRef, () => setShowFilters(false));

  // Load search history on mount
  useEffect(() => {
    const saved = localStorage.getItem('netflix_search_history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Debounced search function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let data = await searchMovies(searchQuery);
      
      // Apply filters
      data = applyFilters(data);
      setResults(data);

      // Save to search history
      if (data.length > 0) {
        const newHistory = [
          { query: searchQuery, timestamp: new Date().toISOString() },
          ...searchHistory.filter(h => h.query !== searchQuery)
        ].slice(0, 10);
        setSearchHistory(newHistory);
        localStorage.setItem('netflix_search_history', JSON.stringify(newHistory));
      }
    } catch (err) {
      setError('Error searching movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchHistory, filters]);

  const applyFilters = (movies) => {
    return movies.filter(movie => {
      // Year filter
      if (filters.year !== 'all') {
        const movieYear = parseInt(movie.Year);
        const filterYear = parseInt(filters.year);
        if (movieYear !== filterYear) return false;
      }

      // Rating filter
      if (filters.rating !== 'all') {
        const movieRating = parseFloat(movie.imdbRating || 0);
        if (filters.rating === 'high' && movieRating < 7) return false;
        if (filters.rating === 'medium' && (movieRating < 6 || movieRating >= 7)) return false;
        if (filters.rating === 'low' && movieRating >= 6) return false;
      }

      // Type filter
      if (filters.type !== 'all' && movie.Type !== filters.type) return false;

      return true;
    });
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setShowFilters(false);
  };

  const filteredResults = applyFilters(results);

  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-white text-4xl font-bold mb-8">Search Movies</h1>

          {/* Search Input */}
          <div className="relative flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows..."
                className="w-full bg-gray-800 text-white pl-12 pr-12 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-300 transition"
                >
                  <FaTimes className="text-gray-400 text-xl" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <div ref={filterRef} className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg transition flex items-center gap-2"
              >
                <FaFilter size={18} />
                Filter
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 w-64 p-4">
                  {/* Year Filter */}
                  <div className="mb-4">
                    <label className="text-white text-sm font-semibold mb-2 block">Year</label>
                    <select
                      value={filters.year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="all">All Years</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-4">
                    <label className="text-white text-sm font-semibold mb-2 block">Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="all">All Ratings</option>
                      <option value="high">High (7+)</option>
                      <option value="medium">Medium (6-7)</option>
                      <option value="low">Low (&lt;6)</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="text-white text-sm font-semibold mb-2 block">Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="all">All Types</option>
                      <option value="movie">Movies</option>
                      <option value="series">Series</option>
                      <option value="episode">Episodes</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search History */}
        {!searchQuery && searchHistory.length > 0 && (
          <div className="mb-12">
            <h2 className="text-white text-xl font-semibold mb-4">Recent Searches</h2>
            <div className="flex flex-wrap gap-3">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item.query)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-white text-xl">Searching...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && filteredResults.length > 0 && (
          <div>
            <h2 className="text-white text-2xl font-semibold mb-6">
              Found {filteredResults.length} results for "{searchQuery}"
              {Object.values(filters).some(v => v !== 'all') && ' (filtered)'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredResults.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="group bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleMovieClick(movie)}
                >
                  {/* Movie Poster */}
                  <div className="relative h-72 overflow-hidden bg-gray-800">
                    {movie.Poster !== 'N/A' ? (
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  </div>

                  {/* Movie Info */}
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-red-500 transition">
                      {movie.Title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{movie.Year}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(movie);
                        }}
                        className={`p-1 rounded transition ${
                          isFavorite(movie.imdbID)
                            ? 'text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <FaStar size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && searchQuery.trim() && filteredResults.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No movies found for "{searchQuery}"</div>
            <p className="text-gray-500">Try searching for a different movie title or adjust your filters</p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !searchQuery && searchHistory.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="text-gray-500 text-6xl mx-auto mb-4 opacity-50" />
            <div className="text-gray-400 text-xl">Start typing to search for movies</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
