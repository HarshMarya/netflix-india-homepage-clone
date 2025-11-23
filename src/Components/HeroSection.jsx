import { useState, useEffect } from "react";
import {
  FaPlay,
  FaInfoCircle,
  FaVolumeMute,
  FaVolumeUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import bgPoster from "../Img/bg-poster.jpg";
import bgPoster1 from "../Img/crown.jpg";
import bgPoster2 from "../Img/mh.jpg";

export const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Sample hero movies carousel data
  const heroMovies = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      image: bgPoster,
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follow the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      image: bgPoster1,
    },
    {
      id: 3,
      title: "Money Heist",
      description: "An intelligent professor and his robber friend lead a team of ambitious misfits on a high-stakes heist in Madrid.",
      image: bgPoster2,
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(timer);
  }, [autoPlay, heroMovies.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
    setAutoPlay(false);
  };

  const currentMovie = heroMovies[currentSlide];

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {heroMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-[20%] left-12 max-w-xl">
        <h1 className="text-white text-5xl font-bold mb-4">{currentMovie.title}</h1>
        <p className="text-white text-lg mb-6 line-clamp-3">{currentMovie.description}</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition">
            <FaPlay className="w-6 h-6" />
            Play
          </button>
          <button className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/80 transition">
            <FaInfoCircle className="w-6 h-6" />
            More Info
          </button>
        </div>
      </div>

      {/* Volume Control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-[20%] right-12 p-3 border-2 border-white rounded-full hover:bg-white/20 transition"
      >
        {isMuted ? (
          <FaVolumeMute className="text-white w-6 h-6" />
        ) : (
          <FaVolumeUp className="text-white w-6 h-6" />
        )}
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setAutoPlay(false)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        onMouseEnter={() => setAutoPlay(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-12 flex gap-2 z-30">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide
                ? "bg-red-600 w-8"
                : "bg-white/50 w-2 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </div>
  );
};