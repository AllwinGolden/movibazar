const BASE = "https://api.themoviedb.org/3";

// Get the API key from Netlify / .env
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

// If not found, show an alert (only in development)
if (!apiKey) {
  alert("Set REACT_APP_TMDB_API_KEY in Netlify Environment Variables");
}

// ────────────────────────────────────────────
// COLLECTION PARTS
// ────────────────────────────────────────────

export async function getCollectionParts(collectionId) {
  if (!collectionId) return [];
  const url = `${BASE}/collection/${collectionId}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Collection fetch failed");
  const data = await res.json();
  return data.parts || [];
}

// ────────────────────────────────────────────
// MOVIE SEARCH
// ────────────────────────────────────────────

export async function searchMovies(query) {
  if (!query) return [];
  const url = `${BASE}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.results || [];
}

// ────────────────────────────────────────────
// MOVIE DETAILS
// ────────────────────────────────────────────

export async function getMovieDetails(id) {
  const url = `${BASE}/movie/${id}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Movie details fetch failed");
  return res.json();
}
