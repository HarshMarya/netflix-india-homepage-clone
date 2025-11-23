import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaTrash, FaHeart, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useMovieContext } from '../context/MovieContext';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, watchlist, toggleFavorite, toggleWatchlist, isFavorite, isInWatchlist } = useMovieContext();
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' or 'watchlist'

  const currentList = activeTab === 'favorites' ? favorites : watchlist;

  const handleRemove = (movie) => {
    if (activeTab === 'favorites') {
      toggleFavorite(movie);
    } else {
      toggleWatchlist(movie);
    }
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handlePlayClick = (e, movie) => {
    e.stopPropagation();
    navigate(`/player/${movie.imdbID}`);
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-white text-4xl font-bold">My Library</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'favorites'
                ? 'text-red-500 border-red-500'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            <FaHeart className="inline mr-2" />
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'watchlist'
                ? 'text-red-500 border-red-500'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            <FaPlus className="inline mr-2" />
            Watchlist ({watchlist.length})
          </button>
        </div>

        {/* Content */}
        {currentList.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              {activeTab === 'favorites'
                ? "You haven't added any favorites yet"
                : "Your watchlist is empty"}
            </div>
            <button
              onClick={() => navigate('/search')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentList.map((movie) => (
              <div
                key={movie.imdbID}
                className="group bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Poster */}
                <div
                  className="relative h-72 overflow-hidden bg-gray-800 cursor-pointer"
                  onClick={() => handleMovieClick(movie)}
                >
                  {movie.Poster && movie.Poster !== 'N/A' ? (
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

                  {/* Overlay with Play Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => handlePlayClick(e, movie)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition transform hover:scale-110"
                    >
                      <FaPlay className="ml-1" size={20} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    className="text-white font-semibold text-sm line-clamp-2 mb-3 cursor-pointer hover:text-red-500 transition"
                    onClick={() => handleMovieClick(movie)}
                  >
                    {movie.Title}
                  </h3>

                  {/* Year and Rating */}
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                    <span>{movie.Year}</span>
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                      <span className="text-yellow-400">{movie.imdbRating} ★</span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(movie)}
                    className="w-full bg-gray-800 hover:bg-red-600 text-white py-2 rounded transition flex items-center justify-center gap-2"
                  >
                    <FaTrash size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
