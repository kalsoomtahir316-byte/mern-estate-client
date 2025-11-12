// client/src/pages/Listings.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchListings } from "../features/listings/listingsSlice";

export default function Listings() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.listings?.items || []);
  const total = useSelector((s) => s.listings?.total ?? items.length);
  const status = useSelector((s) => s.listings?.status || "idle");

  // simple search by city/title (client-side for now)
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return items;
    return items.filter(
      (x) =>
        (x.city || "").toLowerCase().includes(q.toLowerCase()) ||
        (x.title || "").toLowerCase().includes(q.toLowerCase())
    );
  }, [items, q]);

  useEffect(() => {
    if (status === "idle" || items.length === 0) dispatch(fetchListings({}));
  }, [dispatch, status, items.length]);

  return (
    <div className="container listings-wrap">
      {/* Sidebar */}
      <aside className="filters">
        <div className="panel">
          <div className="panel-title">Search (city/title)</div>
          <input
            className="input"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginTop: 8 }}>
            Search
          </button>

          <div className="panel-title" style={{ marginTop: 18 }}>
            Showing <b>{results.length}</b> {results.length === 1 ? "result" : "results"}
          </div>
        </div>
      </aside>

      {/* Results */}
      <section className="results">
        {status === "loading" && (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card skeleton" />
            ))}
          </div>
        )}

        {status !== "loading" && results.length === 0 && (
          <div className="empty">
            No matching results. Try another keyword or filters.
          </div>
        )}

        <div className="cards-grid">
  {items.map((it) => (
    <Link key={it._id} to={`/listings/${it._id}`} className="list-card">
      <img
        src={it.images?.[0] || "https://plus.unsplash.com/premium_photo-168..."}
        alt={it.title}
      />
      <div className="card-body">
        <div className="card-top">
          <h4 className="card-title">{it.title}</h4>
          {it.mode && (
            <span className={`badge ${it.mode.toLowerCase()}`}>
              {it.mode}
            </span>
          )}
        </div>
        <p className="card-meta">
          {it.city} • {it.type || "property"}
        </p>
        <div className="card-price">PKR {Number(it.price).toLocaleString()}</div>
      </div>
    </Link>
  ))}
</div>
      </section>
    </div>
  );
}