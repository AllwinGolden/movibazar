import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, closeMenu }) {
  return (
    <aside className={`sidebar ${open ? "show" : ""}`}>
      <h2 className="logo">MOVIBAZAR</h2>

      {/* <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
        ✕
      </button> */}

      <nav>
        <Link to="/" onClick={closeMenu} className="active">Films</Link>
        <Link to="/series" onClick={closeMenu}>Series</Link>
        <Link to="/my-list" onClick={closeMenu}>My List</Link>
      </nav>

      <div className="menu">
        <Link to="/all-films" onClick={closeMenu}>All Films</Link>
        <Link to="/features" onClick={closeMenu}>Features</Link>
        <Link to="/documents" onClick={closeMenu}>Documents</Link>
        <Link to="/shorts" onClick={closeMenu}>Shorts</Link>
        <Link to="/tv-shows" onClick={closeMenu}>TV Shows</Link>
      </div>
    </aside>
  );
}
