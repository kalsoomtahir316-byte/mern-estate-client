import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlocks } from "../features/listings/listingsSlice";
import Hero from "../components/Hero";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((s) => s.listings?.status || "idle");
  const blocks = useSelector((s) => s.listings?.blocks || { offers: [], rent: [], sale: [] });

  useEffect(() => {
    dispatch(fetchBlocks());
  }, [dispatch]);

  function Row({ title, items }) {
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <section className="container" style={{ marginTop: 24 }}>
        <h3 className="section-title">{title}</h3>
        <div className="grid">
          {items.map((it) => (
            <Link to={`/listings/${it._id}`} key={it._id} className="card">
              <img
                src={(it.images && it.images[0]) || "https://picsum.photos/seed/1/800/560"}
                alt=""
              />
              <div className="body">
                <div className="meta">{it.city} • {it.type}</div>
                <div className="price">
                  {(it.offer && it.discountPrice) ? it.discountPrice : it.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <Hero />
      {status === "loading" ? (
        <div className="container grid">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          <Row title="Popular right now" items={blocks.offers} />
          <Row title="For Rent" items={blocks.rent} />
          <Row title="For Sale" items={blocks.sale} />
        </>
      )}
      <EmptyState />
    </>
  );
}