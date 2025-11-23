import { useRef, useState, useEffect } from "react";
import { FaSearch, FaBell, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useClickAway } from "react-use";
import profileImg from "../Img/profile.png";

export const NavBar = () => {
  const navigate = useNavigate();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const searchDropdownRef = useRef(null);

  const logoUrl =
    "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('netflix_search_history');
    if (saved) {
      const history = JSON.parse(saved);
      setRecentSearches(history.slice(0, 5));
    }
  }, []);

  // Close dropdown on click away
  useClickAway(searchDropdownRef, () => setShowSearchDropdown(false));

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      navigate("/search");
      setShowSearchDropdown(false);
      setSearchInput('');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-colors duration-300 bg-gradient-to-b from-black/80 to-transparent hover:from-black/95 hover:to-black/70">
      <div className="flex items-center justify-between px-12 py-4">
        {/* Left section */}
        <div className="flex items-center gap-8">
          <div 
            className="w-[150px] relative z-10 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/browse")}
          >
            <img src={logoUrl} alt="netflix-logo" />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate("/browse")}
              className="text-white text-sm hover:text-gray-300 transition"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/search")}
              className="text-white text-sm hover:text-gray-300 transition"
            >
              Movies
            </button>
            <button 
              onClick={() => navigate("/favorites")}
              className="text-white text-sm hover:text-gray-300 transition"
            >
              My List
            </button>
            <a href="#" className="text-white text-sm hover:text-gray-300 transition">
              New & Popular
            </a>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Search with Dropdown */}
          <div ref={searchDropdownRef} className="relative">
            <button
              onClick={() => setShowSearchDropdown(!showSearchDropdown)}
              className="text-white hover:text-red-500 transition p-2 relative"
              title="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
                {/* Search Input */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchInput)}
                    placeholder="Search movies..."
                    className="w-full bg-gray-800 text-white pl-3 pr-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                    autoFocus
                  />
                </div>

                {/* Search Button */}
                {searchInput && (
                  <button
                    onClick={() => handleSearchSubmit(searchInput)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold mb-3 transition"
                  >
                    Search
                  </button>
                )}

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs font-semibold mb-2">Recent</p>
                    <div className="space-y-1">
                      {recentSearches.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchInput(item.query);
                            handleSearchSubmit(item.query);
                          }}
                          className="w-full text-left text-gray-300 hover:text-white text-sm p-2 rounded hover:bg-gray-800 transition"
                        >
                          {item.query}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <FaBell className="text-white hover:text-red-500 transition w-5 h-5 cursor-pointer" />
          <button
            onClick={() => navigate("/favorites")}
            className="text-white hover:text-red-500 transition p-2"
            title="My List"
          >
            <FaHeart className="w-5 h-5" />
          </button>
          <img src={profileImg} alt="Profile" className="w-8 h-8 rounded cursor-pointer hover:opacity-80 transition" />
        </div>
      </div>
    </nav>
  );
};
