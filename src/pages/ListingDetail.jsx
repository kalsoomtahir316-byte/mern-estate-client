// client/src/pages/ListingDetail.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchListing } from "../features/listings/listingsSlice";

export default function ListingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // ---- safe state reads ----
  const status = useSelector((s) => s.listings?.status || "idle");
  const current = useSelector((s) => s.listings?.current || null);
  const items = useSelector((s) => s.listings?.items || []);

  // Fallback: if current missing, try to find from items
  const fallback = useMemo(
    () => items.find((x) => String(x._id) === String(id)),
    [items, id]
  );
  const data = current && String(current._id) === String(id) ? current : fallback;

  // Fetch if needed
  useEffect(() => {
    if (!data) dispatch(fetchListing(id));
  }, [id, data, dispatch]);

  if (!data) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <div className="skeleton hero" />
        <div className="skeleton line" />
        <div className="skeleton line" style={{ width: "60%" }} />
      </div>
    );
  }

  const {
    images = [],
    title,
    city,
    type,
    price,
    beds,
    baths,
    area,
    description,
    mode, // rent | sale
  } = data;

  const hero = images[0] || "https://picsum.photos/seed/estateverse-hero/1280/720";
  const priceStr = Number(price || 0).toLocaleString("en-PK");

  return (
  <div className="container detail-wrap">
    {/* HERO with SALE badge on image (yeh theek jagah hai) */}
    <div className="detail-hero">
      <img src={hero} alt={(title || city)} loading="lazy" />
      <span className="detail-badge">{(mode || "sale").toUpperCase()}</span>
    </div>

    {/* HEAD: Title */}
    <div className="detail-head">
      <h1 className="detail-title">{title} • {city} {type ? ` / ${type}` : ""}</h1>
    </div>

    {/* PRICE */}
    <div className="detail-price">PKR {priceStr}</div>

    {/* ✅ SPEC ROW (NEW) — yahan chips use NAHI ho rahi */}
    <div className="detail-specs">
      {beds != null && <span>{beds} bed</span>}
      {baths != null && <span>{baths} bath</span>}
      {area && <span>{area} {areaUnit || "sq ft"}</span>}
    </div>

    {/* BODY GRID (agar aap use kar rahe ho to keep it) */}
    <div className="detail-grid">
      <div className="detail-main">
        <p className="detail-desc">
          {description || "No description provided. Contact the owner/agent for more details."}
        </p>

          {/* small gallery if more images */}
          {images.length > 1 && (
            <div className="thumbs">
              {images.slice(1, 7).map((src, i) => (
                <img key={i} src={src} alt={`photo ${i + 2}`} loading="lazy" />
              ))}
            </div>
          )}
        </div>

        <aside className="detail-side">
          <div className="contact-card">
            <div className="cc-title">Interested?</div>
            <div className="cc-note">Sign in to message the owner/agent.</div>
            <Link to="/login" className="btn btn-primary">Sign in</Link>
            <Link to="/register" className="btn btn-ghost" style={{marginTop:8}}>Create account</Link>
          </div>
          <Link to="/listings" className="back-link">← Back to listings</Link>
        </aside>
      </div>
    </div>
  );
}