import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        
        <div className="poster-wrap">
          <img src={poster} alt={movie.title || "Movie"} />
        </div>

        <h3 className="title">
          {movie.title || "Untitled Movie"}
        </h3>

        <div className="meta">
          {movie.release_date ? movie.release_date.slice(0, 4) : "—"}
        </div>

      </Link>
    </article>
  );
}
