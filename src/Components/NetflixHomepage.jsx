import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPlus, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavBar } from "./NavBar";
import { HeroSection } from "./HeroSection";
import Footer from "./Footer";
import { searchMovies, getMoviesByCategory } from "../utils/apiService";
import { useMovieContext } from "../context/MovieContext";

const NetflixHomepage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPositions, setScrollPositions] = useState({});
  const scrollRefs = useRef({});
  const { toggleFavorite, isFavorite } = useMovieContext();

  const categorySearches = [
    { name: "Trending Now", query: "Avengers" },
    { name: "Action Movies", query: "Action" },
    { name: "Drama Series", query: "Drama" },
    { name: "Sci-Fi & Fantasy", query: "Inception" },
    { name: "Thrillers", query: "Thriller" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const allCategories = await Promise.all(
          categorySearches.map(async (category) => {
            const movies = await searchMovies(category.query);
            return {
              title: category.name,
              movies: movies || [],
            };
          })
        );
        setCategories(allCategories.filter(cat => cat.movies.length > 0));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handlePlayClick = (e, movie) => {
    e.stopPropagation();
    navigate(`/player/${movie.imdbID}`);
  };

  const handleScroll = (categoryIndex, direction) => {
    const scrollContainer = scrollRefs.current[categoryIndex];
    if (!scrollContainer) return;

    const scrollAmount = 800; // Scroll 4 cards (200px each + gaps)
    const newPosition = (scrollPositions[categoryIndex] || 0) + (direction === "left" ? -scrollAmount : scrollAmount);

    scrollContainer.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPositions({
      ...scrollPositions,
      [categoryIndex]: newPosition,
    });
  };

  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <HeroSection />
      <div className="relative z-10 mt-[-100px]">
        {loading ? (
          <div className="text-white text-center py-12">Loading content...</div>
        ) : (
          categories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-white text-2xl font-semibold mb-4 px-12">
                {category.title}
              </h2>
              <div className="relative group">
                {/* Left Arrow Button */}
                <button
                  onClick={() => handleScroll(catIndex, "left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft size={24} />
                </button>

                {/* Carousel Container */}
                <div
                  ref={(el) => (scrollRefs.current[catIndex] = el)}
                  className="flex gap-3 overflow-x-auto px-12 pb-4 scrollbar-hide scroll-smooth"
                >
                  {category.movies.slice(0, 10).map((movie, index) => (
                    <div
                      key={movie.imdbID || index}
                      className="group/item flex-shrink-0 relative transition-all duration-300 cursor-pointer hover:scale-110 hover:z-40"
                      style={{ width: "200px" }}
                      onClick={() => handleMovieClick(movie)}
                    >
                      {/* Poster Image */}
                      <div className="relative h-64 overflow-hidden rounded-md bg-gray-800">
                        {movie.Poster && movie.Poster !== "N/A" ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-full object-cover group-hover/item:brightness-75 transition-all"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-900">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-end">
                          <div className="w-full p-4 transform translate-y-8 group-hover/item:translate-y-0 transition-transform">
                            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1">
                              {movie.Title}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                                <div className="flex items-center gap-1">
                                  <FaStar size={12} className="text-yellow-400" />
                                  <span className="text-yellow-400 text-xs font-semibold">
                                    {movie.imdbRating}
                                  </span>
                                </div>
                              )}
                              <span className="text-gray-300 text-xs">{movie.Year}</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handlePlayClick(e, movie)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-xs font-semibold flex items-center justify-center gap-1 transition"
                              >
                                <FaPlay size={10} />
                                Play
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(movie);
                                }}
                                className={`px-2 py-1 rounded text-xs font-semibold flex items-center justify-center gap-1 transition ${
                                  isFavorite(movie.imdbID)
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-gray-600 text-white hover:bg-gray-700"
                                }`}
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Title below */}
                      <p className="text-white text-xs mt-2 line-clamp-1 font-semibold">
                        {movie.Title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={() => handleScroll(catIndex, "right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Scroll right"
                >
                  <FaChevronRight size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NetflixHomepage;
