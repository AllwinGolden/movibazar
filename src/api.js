const BASE = "https://api.themoviedb.org/3";

export async function getCollectionParts(collectionId, apiKey) {
  if (!collectionId) return [];
  const url = `${BASE}/collection/${collectionId}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Collection fetch failed");
  const data = await res.json();
  // TMDB collection has 'parts' array
  return data.parts || [];
}

export async function searchMovies(query, apiKey) {
  if (!query) return [];
  const url = `${BASE}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.results || [];
}

export async function getMovieDetails(id, apiKey) {
  const url = `${BASE}/movie/${id}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Movie details fetch failed");
  return res.json();
}
