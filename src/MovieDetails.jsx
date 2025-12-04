import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const api = process.env.REACT_APP_TMDB_API_KEY;
  const imgBase = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    if (!api) return;

    async function loadData() {
      try {
        // Movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);

        // Cast
        const castRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api}`
        );
        const castData = await castRes.json();
        setCast(castData.cast || []);

        // Similar Movies
        const simRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api}`
        );
        const simData = await simRes.json();
        setSimilar(simData.results || []);

      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, [id, api]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">

      {/* HERO / HEADER */}
      <div className="hero">
        <img
          className="hero-img"
          src={imgBase + movie.poster_path}
          alt={movie.title}
        />

        <div className="hero-info">
          <h1>{movie.title}</h1>

          <div className="sub-info">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.runtime} min</span>
          </div>

          <p className="overview">{movie.overview}</p>

          <button className="trailer-btn">► Watch Trailer</button>
        </div>
      </div>

      {/* CAST SECTION */}
      <h2 className="section-title">Cast</h2>
      <div className="cast-row">
        {cast.slice(0, 12).map((c) => (
          <div key={c.id} className="cast-card">
            <img
              src={
                c.profile_path
                  ? imgBase + c.profile_path
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={c.name}
            />
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      {/* SIMILAR MOVIES */}
      <h2 className="section-title">Similar Movies</h2>
      <div className="similar-row">
        {similar.map((m) => (
          <Link key={m.id} to={`/movie/${m.id}`} className="similar-card">
            <img
              src={
                m.poster_path
                  ? imgBase + m.poster_path
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={m.title}
            />
            <p>{m.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
