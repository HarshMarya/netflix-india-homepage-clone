import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const MovieRow = ({ title, movies }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-4 px-12">{title}</h2>
      <div className="relative group">
        <div className="flex gap-2 overflow-x-hidden px-12">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative transition-transform duration-300 ease-out"
              style={{ width: "240px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className={`w-full rounded-md transition-transform duration-300 ${
                  hoveredIndex === index ? "scale-110 z-10" : ""
                }`}
              />
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-black/60 rounded-md">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold">{movie.title}</h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="absolute left-0 top-0 bottom-0 px-4 bg-black/50 hidden group-hover:block">
          <FaChevronLeft className="text-white w-6 h-6" />
        </button>
        <button className="absolute right-0 top-0 bottom-0 px-4 bg-black/50 hidden group-hover:block">
          <FaChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
