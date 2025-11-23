import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import NetflixHomepage from './Components/NetflixHomepage'
import MovieDetails from './Components/MovieDetails'
import SearchPage from './Components/SearchPage'
import FavoritesPage from './Components/FavoritesPage'
import MoviePlayer from './Components/MoviePlayer'
import { MovieProvider } from './context/MovieContext'

function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/browse" replace />} />
          <Route path="/browse" element={<NetflixHomepage />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/player/:imdbID" element={<MoviePlayer />} />
          <Route path="*" element={<Navigate to="/browse" replace />} />
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  )
}

export default App
