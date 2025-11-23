# Netflix Clone - Quick Start Guide

## 🎬 What's New in This Update

This update includes a complete overhaul of the Netflix Clone project with the following major features:

### ✨ New Features
1. ✅ **Movie Search** - Real-time search with history tracking
2. ✅ **Movie Details** - Complete movie information with ratings
3. ✅ **Favorites System** - Save and manage favorite movies
4. ✅ **Watchlist** - Add movies to watch later
5. ✅ **Video Player** - Full-featured player with controls
6. ✅ **Browse Categories** - Multiple curated movie categories
7. ✅ **Global State Management** - Context API for app-wide state
8. ✅ **Local Storage** - Persistent data storage

---

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173`

---

## 🎯 How to Use

### **Home Page (Browse)**
- Landing page with movie categories
- Browse through "Trending Now", "Action Movies", "Drama Series", etc.
- Hover over movies to see details, rating, and action buttons
- Click on a movie to view full details
- Click play button to watch (uses sample video)

### **Search Page**
1. Click the search icon in navbar (top right)
2. Type movie title (minimum 2 characters)
3. Results appear in real-time
4. Click a movie to view details
5. Recent searches saved automatically

### **Movie Details Page**
- View complete movie information
- See ratings and metadata
- Add to Favorites or Watchlist
- Play the movie
- View awards and box office info

### **Favorites & Watchlist**
1. Click heart icon in navbar to access
2. Two tabs: "Favorites" and "Watchlist"
3. Add/remove movies with one click
4. Data persists across sessions

### **Video Player**
- Press play button to start
- Use controls at bottom:
  - ▶ Play/Pause
  - 🔊 Volume control
  - ⚙ Quality selector
  - ⛶ Fullscreen mode
- Auto-hiding controls (move mouse to show)

---

## 📁 Project Structure

```
src/
├── Components/          # React components
│   ├── NavBar.jsx      # Top navigation
│   ├── MovieDetails.jsx # Movie info page
│   ├── SearchPage.jsx  # Search interface
│   ├── FavoritesPage.jsx # Favorites/Watchlist
│   ├── MoviePlayer.jsx # Video player
│   └── ...
├── context/            # Global state
│   └── MovieContext.jsx
├── utils/              # Helper functions
│   ├── apiService.js   # API calls
│   └── localStorage.js # Storage management
└── App.jsx            # Main app
```

---

## 🔑 Key Functions

### **Search Movies**
```javascript
import { searchMovies } from './utils/apiService';

const results = await searchMovies('Avengers');
```

### **Get Movie Details**
```javascript
import { getMovieDetails } from './utils/apiService';

const movie = await getMovieDetails('tt1234567');
```

### **Manage Favorites**
```javascript
import { 
  addToFavorites, 
  removeFromFavorites,
  isFavorite 
} from './utils/localStorage';

// Add favorite
addToFavorites(movie);

// Check if favorite
if (isFavorite(movie.imdbID)) {
  // Movie is favorite
}

// Remove favorite
removeFromFavorites(movie.imdbID);
```

---

## 🎨 Navigation Guide

### Navbar Links
| Icon/Link | Action |
|-----------|--------|
| Netflix Logo | Go to Home |
| Home | Browse movies |
| Movies | Go to Search |
| My List | View Favorites |
| 🔍 Search Icon | Open Search |
| 📢 Bell Icon | Notifications (placeholder) |
| ❤️ Heart Icon | Go to Favorites |

---

## 💾 Data Persistence

Your data is automatically saved:
- ✅ **Favorites** - Saved movies
- ✅ **Watchlist** - Movies to watch
- ✅ **Search History** - Last 10 searches
- ✅ **Watch History** - Recently watched (up to 50)

All data stored in browser's localStorage - no account needed!

---

## 🎬 Movie Data

Each movie displays:
- Title and poster image
- Year released
- IMDB rating and votes
- Runtime and rating (PG-13, etc.)
- Genre and country
- Director and cast
- Full plot synopsis
- Awards and box office info

---

## ⚙️ Settings & Quality

### Video Quality Options
- Auto (automatic)
- 1080p (Full HD)
- 720p (HD)
- 480p (Standard)

### Player Features
- Fullscreen mode
- Mute/Volume control
- Progress bar scrubbing
- Subtitle support (UI ready)
- Quality selection

---

## 🐛 Troubleshooting

### Movies Not Loading?
- Check internet connection
- OMDB API may have daily limits
- Wait a few seconds and refresh

### Data Not Saving?
- Check browser localStorage isn't disabled
- Clear browser cache and refresh
- Try a different browser

### Player Not Working?
- Video URL is a sample - replace with actual stream
- Check browser compatibility (HTML5)
- Fullscreen may need user interaction

---

## 📊 Statistics & Info

### Browse Features
- ✅ 5 movie categories
- ✅ 10 movies per category
- ✅ Real-time search
- ✅ Responsive design

### Storage Capacity
- 📦 Unlimited favorites (browser limited)
- 📦 Search history: Last 10
- 📦 Watch history: Last 50 movies

---

## 🎓 Learning Points

This project demonstrates:
- React Hooks & Context API
- API integration (OMDB)
- Component composition
- State management
- localStorage usage
- Responsive design
- Tailwind CSS
- Performance optimization

---

## 🚀 Next Steps

1. **Explore the app** - Browse and search movies
2. **Add favorites** - Build your collection
3. **Check watchlist** - Create your to-watch list
4. **Watch videos** - Try the video player
5. **Check storage** - See data persistence in action

---

## 📝 API Reference

### OMDB API Endpoints Used
- **Search**: `/api/?s=<movie_name>&apikey=<key>`
- **Details**: `/api/?i=<imdb_id>&apikey=<key>`

### Response Data Fields
```javascript
{
  Title,
  Year,
  imdbID,
  Type,
  Poster,
  Runtime,
  Genre,
  Director,
  Actors,
  Plot,
  imdbRating,
  imdbVotes,
  Rated,
  Language,
  Country,
  Awards,
  BoxOffice
}
```

---

## ✅ Feature Checklist

- [x] Browse movies by category
- [x] Search functionality with history
- [x] Movie details page
- [x] Favorites management
- [x] Watchlist functionality
- [x] Video player with controls
- [x] Responsive design
- [x] Local storage persistence
- [x] Beautiful UI with animations
- [x] Global state management

---

## 📞 Need Help?

1. Check the full documentation: `PROJECT_DOCUMENTATION.md`
2. Review component files for examples
3. Check browser console for errors
4. Test with different movies

---

**Enjoy your Netflix Clone! 🎬**

Made with ❤️ by Harsh Maurya
