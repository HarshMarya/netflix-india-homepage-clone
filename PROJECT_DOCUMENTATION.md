# Netflix Clone - Complete Project Documentation

## 🎬 Project Overview

A fully-functional Netflix clone built with React, Vite, and Tailwind CSS that integrates with the OMDB API to provide a complete movie streaming experience. The application includes movie browsing, detailed information, search functionality, favorites/watchlist management, and a video player with comprehensive controls.

## ✨ Features Implemented

### 1. **Home Page (Browse)**
- Multiple movie categories with curated selections
- Beautiful hero section with featured content
- Horizontal scrolling movie carousels
- Hover effects showing movie details, ratings, and action buttons
- Responsive design for all screen sizes

### 2. **Movie Details Page**
- Comprehensive movie information display
- IMDB ratings and voting data
- Full plot synopsis
- Director, cast, and genre information
- Awards and box office data
- Add to Favorites and Watchlist functionality
- Movie poster and metadata display

### 3. **Search Functionality**
- Real-time search with debouncing (300ms)
- Search history (last 10 searches)
- Responsive grid display of search results
- Quick add to favorites from search results
- Movie year and rating information

### 4. **Favorites & Watchlist Management**
- Persistent storage using localStorage
- Separate tabs for Favorites and Watchlist
- Add/remove movies with visual feedback
- Display count of items in each collection
- Quick access navigation from navbar

### 5. **Video Player**
- Fullscreen support
- Play/pause controls
- Progress bar with time display
- Volume control with mute option
- Quality selection (Auto, 1080p, 720p, 480p)
- Subtitle support UI
- Auto-hiding controls with mouse tracking
- Watch history tracking

### 6. **Navigation & UI**
- Sticky navbar with quick navigation
- Links to Browse, Search, and Favorites
- Profile icon and notifications
- Responsive mobile menu
- Smooth transitions and animations

### 7. **State Management**
- Context API for global state management
- Movie favorites tracking
- Watchlist management
- Watch history
- Search results caching

## 📁 Project Structure

```
src/
├── Components/
│   ├── NavBar.jsx                 # Navigation bar with links
│   ├── HeroSection.jsx            # Featured content section
│   ├── NetflixHomepage.jsx        # Main browse page
│   ├── MovieDetails.jsx           # Movie information page
│   ├── SearchPage.jsx             # Search interface
│   ├── FavoritesPage.jsx          # Favorites & Watchlist
│   ├── MoviePlayer.jsx            # Video player
│   ├── MovieCard.jsx              # Movie card component
│   ├── MovieRow.jsx               # Movie row component
│   ├── Header.jsx                 # Header component
│   ├── Footer.jsx                 # Footer component
│   └── Img/                       # Images folder
│
├── context/
│   └── MovieContext.jsx           # Global state management
│
├── utils/
│   ├── apiService.js              # OMDB API calls
│   └── localStorage.js            # LocalStorage utilities
│
├── pages/
│   └── Layout.jsx                 # Layout wrapper
│
├── App.jsx                        # Main app component
├── main.jsx                       # Entry point
├── index.css                      # Global styles
└── vite.config.js                 # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harsh-maurya-dev/Netflix-SignIn-UI-clone.git
cd Netflix-SignIn-UI-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔑 API Integration

### OMDB API
- **API Endpoint**: `https://www.omdbapi.com`
- **API Key**: `ee51dca` (Provided in apiService.js)
- **Features Used**:
  - Movie search by title
  - Movie details with full information
  - Plot, ratings, cast, director, awards

### API Calls

**Search Movies**
```javascript
import { searchMovies } from './utils/apiService';

const results = await searchMovies('Avengers', page = 1);
```

**Get Movie Details**
```javascript
import { getMovieDetails } from './utils/apiService';

const movie = await getMovieDetails('tt0848228'); // IMDB ID
```

**Get Category Movies**
```javascript
import { getMoviesByCategory } from './utils/apiService';

const action = await getMoviesByCategory('Action');
```

## 💾 Local Storage

The application uses localStorage for persistent data:

- `netflix_favorites` - User's favorite movies
- `netflix_watchlist` - Movies to watch later
- `netflix_watch_history` - Recently watched movies (up to 50 entries)
- `netflix_search_history` - Last 10 searches

### Usage Examples

```javascript
import { 
  addToFavorites, 
  removeFromFavorites,
  isFavorite,
  getWatchlist,
  addToWatchlist 
} from './utils/localStorage';

// Add to favorites
addToFavorites(movieObject);

// Check if favorite
const isFav = isFavorite(imdbID);

// Get watchlist
const watchlist = getWatchlist();
```

## 🎨 Styling

- **Framework**: Tailwind CSS v3
- **Icons**: React Icons (FaIcons)
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects

## 🔄 State Management

### MovieContext

The app uses React Context API for global state management:

```javascript
import { useMovieContext } from './context/MovieContext';

const {
  favorites,           // Array of favorite movies
  toggleFavorite,      // Function to add/remove favorites
  watchlist,           // Array of watchlist movies
  toggleWatchlist,     // Function to add/remove watchlist
  watchHistory,        // Array of watched movies
  addMovieToHistory,   // Function to log watch history
  searchResults,       // Current search results
  setSearchResults,    // Set search results
  isLoading,           // Loading state
  setIsLoading         // Set loading state
} = useMovieContext();
```

## 🎬 Movie Object Structure

```javascript
{
  Title: "Movie Name",
  Year: "2023",
  imdbID: "tt1234567",
  Type: "movie",
  Poster: "https://...",
  Runtime: "120 min",
  Genre: "Action, Sci-Fi",
  Director: "Director Name",
  Actors: "Actor 1, Actor 2",
  Plot: "Movie plot...",
  imdbRating: "8.5",
  imdbVotes: "100,000",
  Rated: "PG-13",
  Language: "English",
  Country: "USA",
  Awards: "Won 2 Awards",
  BoxOffice: "$500,000,000"
}
```

## 📱 Responsive Design

- **Mobile**: Full-screen optimized
- **Tablet**: Two-column layout
- **Desktop**: Full multi-column layout
- **Large Screens**: Optimized viewing experience

## 🔐 Key Components Details

### MovieDetails Component
- Fetches full movie information from OMDB
- Displays comprehensive metadata
- Quick actions (Play, Add to Watchlist, Favorite)
- Beautiful layout with gradient overlays

### SearchPage Component
- Debounced search input
- Search history tracking
- Grid-based results display
- Quick favorite toggle
- Movie click navigation

### MoviePlayer Component
- HTML5 video element
- Full player controls
- Fullscreen capability
- Volume and quality controls
- Auto-hiding UI
- Progress tracking

### FavoritesPage Component
- Dual tabs for Favorites and Watchlist
- Add/remove functionality
- Movie grid with hover actions
- Navigate to movie details or player
- Empty state handling

## 🚨 Error Handling

- Try-catch blocks in all API calls
- User-friendly error messages
- Fallback UI for missing data
- Network error handling

## 🎯 Future Enhancements

1. **Authentication System**
   - User sign-up and login
   - Profile management
   - Personalized recommendations

2. **Advanced Features**
   - Genre filtering and sorting
   - Rating filters
   - Year range selection
   - Watch time tracking and statistics

3. **Performance Optimization**
   - Lazy loading for images
   - Code splitting
   - Service workers for offline support

4. **Additional Integrations**
   - More API sources (TMDB, etc.)
   - Social sharing
   - User reviews and ratings

5. **Mobile App**
   - React Native version
   - Native player integration
   - Offline downloads

## 📊 Performance Metrics

- Optimized image loading
- Debounced search (300ms)
- Lazy component loading
- Efficient state management
- LocalStorage for instant data access

## 🐛 Known Issues & Limitations

1. **OMDB API**: Free tier has limited requests (1000/day)
2. **Video Player**: Uses sample video URL (can be replaced with actual streaming)
3. **Search**: Limited to OMDB free tier results
4. **Ratings**: Depends on OMDB data availability

## 💡 Best Practices Implemented

- ✅ React Hooks for state management
- ✅ Context API for global state
- ✅ Component composition
- ✅ Responsive CSS
- ✅ Error boundary handling
- ✅ Performance optimization
- ✅ Accessibility considerations
- ✅ Clean code structure

## 📝 Environment Variables

If needed, create a `.env` file:

```env
VITE_API_URL=https://www.omdbapi.com
VITE_API_KEY=your_api_key_here
```

Update `apiService.js` to use environment variables:

```javascript
const API_KEY = import.meta.env.VITE_API_KEY;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Harsh Maurya**
- GitHub: [@harsh-maurya-dev](https://github.com/harsh-maurya-dev)

## 🙏 Acknowledgments

- OMDB API for movie data
- React and Vite communities
- Tailwind CSS for styling
- React Icons for icon library

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Last Updated**: November 2024
**Version**: 1.0.0
