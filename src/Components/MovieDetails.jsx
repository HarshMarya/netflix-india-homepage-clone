import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlay, FaArrowLeft, FaPlus, FaHeart, FaShare, FaStar } from 'react-icons/fa';
import { getMovieDetails } from '../utils/apiService';
import { useMovieContext } from '../context/MovieContext';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite, toggleWatchlist, isInWatchlist } = useMovieContext();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(imdbID);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <div className="text-white text-2xl mb-4">{error || 'Movie not found'}</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const isFav = isFavorite(movie.imdbID);
  const inWatchlist = isInWatchlist(movie.imdbID);

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-12 z-40 flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Hero Section with Poster */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/400/600'}
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-12 -mt-32 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2">
            {/* Title */}
            <h1 className="text-5xl font-bold text-white mb-4">{movie.Title}</h1>

            {/* Meta Information */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" size={20} />
                <span className="text-white text-lg font-semibold">{movie.imdbRating}/10</span>
              </div>
              {movie.Year && <span className="text-gray-400 text-lg">{movie.Year}</span>}
              {movie.Runtime && <span className="text-gray-400 text-lg">{movie.Runtime}</span>}
              {movie.Rated && <span className="border border-gray-400 text-gray-400 px-2 py-1">{movie.Rated}</span>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition">
                <FaPlay className="ml-1" />
                Play
              </button>
              <button
                onClick={() => toggleWatchlist(movie)}
                className={`flex items-center gap-2 px-8 py-3 rounded font-semibold transition ${
                  inWatchlist
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-2 border-white text-white hover:bg-white/20'
                }`}
              >
                <FaPlus />
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button
                onClick={() => toggleFavorite(movie)}
                className={`flex items-center gap-2 px-8 py-3 rounded font-semibold transition ${
                  isFav
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'border-2 border-gray-500 text-gray-500 hover:border-white hover:text-white'
                }`}
              >
                <FaHeart />
                {isFav ? 'Favorited' : 'Add to Favorites'}
              </button>
              <button className="flex items-center gap-2 border-2 border-gray-500 text-gray-500 px-8 py-3 rounded font-semibold hover:border-white hover:text-white transition">
                <FaShare />
              </button>
            </div>

            {/* Description */}
            {movie.Plot && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Synopsis</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            {/* Director */}
            {movie.Director && (
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm font-semibold mb-2">DIRECTOR</h3>
                <p className="text-white">{movie.Director}</p>
              </div>
            )}

            {/* Cast */}
            {movie.Actors && (
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm font-semibold mb-2">CAST</h3>
                <p className="text-white">{movie.Actors}</p>
              </div>
            )}

            {/* Genre */}
            {movie.Genre && (
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm font-semibold mb-2">GENRE</h3>
                <p className="text-white">{movie.Genre}</p>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="bg-gray-900/50 p-6 rounded-lg h-fit">
            <div className="space-y-6">
              {/* Rating */}
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-2">IMDB RATING</h3>
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-yellow-400">{movie.imdbRating}</div>
                  <div className="text-gray-400">/10</div>
                </div>
                {movie.imdbVotes && (
                  <p className="text-sm text-gray-500 mt-2">{movie.imdbVotes} votes</p>
                )}
              </div>

              {/* Type */}
              {movie.Type && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">TYPE</h3>
                  <p className="text-white capitalize">{movie.Type}</p>
                </div>
              )}

              {/* Language */}
              {movie.Language && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">LANGUAGE</h3>
                  <p className="text-white">{movie.Language}</p>
                </div>
              )}

              {/* Country */}
              {movie.Country && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">COUNTRY</h3>
                  <p className="text-white">{movie.Country}</p>
                </div>
              )}

              {/* Awards */}
              {movie.Awards && movie.Awards !== 'N/A' && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">AWARDS</h3>
                  <p className="text-white text-sm">{movie.Awards}</p>
                </div>
              )}

              {/* Box Office */}
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">BOX OFFICE</h3>
                  <p className="text-white">{movie.BoxOffice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
