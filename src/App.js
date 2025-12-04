import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetails from "./MovieDetails";
import Sidebar from "./components/Sidebar";
import Filters from "./components/Filters";
import MovieCard from "./components/MovieCard";
import { getCollectionParts, searchMovies } from "./api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collectionId, setCollectionId] = useState(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  async function loadCollection(id = collectionId) {
    if (!apiKey) return alert("Set REACT_APP_TMDB_API_KEY in .env");
    setLoading(true);
    try {
      const parts = await getCollectionParts(id, apiKey);
      setMovies(parts || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadMultiple(ids = []) {
    if (!apiKey) return alert("Set REACT_APP_TMDB_API_KEY in .env");
    setLoading(true);
    try {
      const all = [];
      for (const id of ids) {
        const parts = await getCollectionParts(id, apiKey);
        if (Array.isArray(parts)) all.push(...parts);
      }
      const map = new Map(all.map((m) => [m.id, m]));
      setMovies(Array.from(map.values()));
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!apiKey) return alert("Set REACT_APP_TMDB_API_KEY in .env");
    if (!searchText.trim()) return;

    setLoading(true);
    try {
      const results = await searchMovies(searchText, apiKey);
      setMovies(results || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiKey) loadCollection();
  }, []);

  const filteredMovies = movies.filter((m) =>
    (m.title || "").toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar open={menuOpen} closeMenu={() => setMenuOpen(false)} />

      <main className="content">
        

        {/* ⭐ MOBILE HAMBURGER MENU BUTTON (Animated) ⭐ */}
        <div className="mobile-header">
  <button
    className={`menu-btn ${menuOpen ? "open" : ""}`}
    onClick={() => setMenuOpen((s) => !s)}
    aria-label={menuOpen ? "Close menu" : "Open menu"}
  >
    <span />
    <span />
    <span />
  </button>

  <h2 className="mobile-logo">MOVIBAZAR</h2>
</div>

       

        {/* SEARCH + COLLECTION AREA */}
        <div className="top-bar">
          <div className="search-box">
            <input
              className="search"
              placeholder="Find whatever you want"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>

          <div className="collection-input">
            <input
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            />
            <button onClick={() => loadCollection(collectionId)}>
              Load
            </button>

            <button
              className="small"
              onClick={() => loadMultiple([10, 556, 125574])}
            >
              Load Collections (sample)
            </button>
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="section-title">All Films</h2>
                <Filters />

                {loading ? (
                  <div className="loading">Loading...</div>
                ) : (
                  <div className="movie-grid">
                    {filteredMovies.map((m) => (
                      <MovieCard key={m.id} movie={m} />
                    ))}
                  </div>
                )}
              </>
            }
          />

          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Static Pages */}
          <Route path="/series" element={<h1 style={{ padding: 20 }}>Series Page Coming Soon</h1>} />
          <Route path="/my-list" element={<h1 style={{ padding: 20 }}>My List (Favorites)</h1>} />
          <Route path="/all-films" element={<h1 style={{ padding: 20 }}>All Films</h1>} />
          <Route path="/features" element={<h1 style={{ padding: 20 }}>Features</h1>} />
          <Route path="/documents" element={<h1 style={{ padding: 20 }}>Documents</h1>} />
          <Route path="/shorts" element={<h1 style={{ padding: 20 }}>Shorts</h1>} />
          <Route path="/tv-shows" element={<h1 style={{ padding: 20 }}>TV Shows</h1>} />
        </Routes>
      </main>
    </div>
  );
}
