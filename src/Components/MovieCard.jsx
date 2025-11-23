import React, { useState } from 'react';
import { FaPlay, FaInfoCircle, FaPlus, FaThumbsUp, FaStar } from 'react-icons/fa';

const MovieCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const movie = {
    title: "Stranger Things",
    thumbnailUrl: "/api/placeholder/300/169",
    year: "2024",
    maturityRating: "TV-14",
    duration: "2h 30m",
    genre: "Sci-Fi",
    match: 98,
    rating: 4.5,
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
  };

  return (
    <div 
      className="relative w-72 bg-gray-900 rounded-lg transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container with Overlay */}
      <div className="relative">
        <img
          src={movie.thumbnailUrl}
          alt={movie.title}
          className={`w-full h-40 object-cover transition-all duration-300 ${
            isHovered ? 'brightness-50' : 'brightness-100'
          }`}
        />
        
        {/* Hover Overlay Content */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            <button className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transform hover:scale-110 transition">
              <FaPlay size={24} className="ml-1" />
            </button>
            <button className="bg-gray-800/80 text-white rounded-full p-3 hover:bg-gray-700 transform hover:scale-110 transition">
              <FaInfoCircle size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Content Container - Always Visible */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold">{movie.title}</h3>
          <div className="flex items-center gap-1">
            <FaStar size={16} className="text-yellow-400" />
            <span className="text-white text-sm">{movie.rating}</span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="text-white space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold">{movie.match}% Match</span>
            <span className="border px-1 text-xs">{movie.maturityRating}</span>
            <span className="text-sm text-gray-300">{movie.duration}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">{movie.year}</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">{movie.genre}</span>
          </div>
          
          {/* Action Buttons - Always Visible */}
          <div className="flex items-center gap-2 pt-2">
            <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-md px-3 py-1 text-sm flex items-center gap-1 transition">
              <FaPlus size={16} />
              Watchlist
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white rounded-md px-3 py-1 text-sm flex items-center gap-1 transition">
              <FaThumbsUp size={16} />
              Like
            </button>
          </div>

          {/* Description - Shows on hover */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isHovered ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-sm text-gray-300">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
