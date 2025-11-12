import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myListings } from "../features/listings/listingsSlice";

export default function MyListings() {
  const dispatch = useDispatch();
  const mine = useSelector((s) => s.listings?.mine || []);

  useEffect(() => { dispatch(myListings()); }, [dispatch]);

  if (!mine.length) return <div className="container" style={{marginTop:16}}>No listings yet.</div>;

  return (
    <div className="container" style={{marginTop:16}}>
      <h3 className="section-title">My Listings</h3>
      <div className="grid">
        {mine.map((it) => (
          <div key={it._id} className="card">
            <img src={(it.images && it.images[0]) || "https://picsum.photos/seed/7/800/560"} alt="" />
            <div className="body">
              <div className="meta">{it.city} • {it.type}</div>
              <div className="price">{(it.offer && it.discountPrice) ? it.discountPrice : it.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}