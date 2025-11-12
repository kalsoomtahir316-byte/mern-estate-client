import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; // adjust: ../../api if your api.js is at client/src/api.js

// ---- Toggle MOCK mode (frontend-only listings) ----
const MOCK = true;

// Dummy listings (sirf demo ke liye)
const mockListings = [
  {
    _id: "m1",
    title: "DHA Phase 6 • 1 Kanal",
    city: "Karachi",
    type: "house",
    beds: 5,
    price: 850000,
    offer: true,
    discountPrice: 820000,
    images: ["https://picsum.photos/seed/1/800/560"],
    mode: "rent",
  },
  {
    _id: "m2",
    title: "Bahria Town • 1 Kanal",
    city: "Lahore",
    type: "house",
    beds: 4,
    price: 175000000,
    offer: false,
    images: ["https://picsum.photos/seed/2/800/560"],
    mode: "sale",
  },
  {
    _id: "m3",
    title: "E-11 • Apartment",
    city: "Islamabad",
    type: "apartment",
    beds: 2,
    price: 45000,
    offer: false,
    images: ["https://picsum.photos/seed/3/800/560"],
    mode: "rent",
  },
];

// ---------- Thunks ----------
export const fetchListings = createAsyncThunk("listings/fetch", async (params) => {
  if (MOCK) {
    // optional client-side filtering
    const q = (params?.q || "").toLowerCase();
    const items = mockListings.filter(
      (it) =>
        (!q || it.city.toLowerCase().includes(q) || it.title.toLowerCase().includes(q))
    );
    return { items, total: items.length, filters: params || {} };
  }
  const { data } = await api.get("/api/listings", { params });
  return data;
});

export const fetchBlocks = createAsyncThunk("listings/blocks", async () => {
  if (MOCK) {
    return {
      offers: mockListings.filter((x) => x.offer),
      rent: mockListings.filter((x) => x.mode === "rent"),
      sale: mockListings.filter((x) => x.mode === "sale"),
    };
  }
  const { data } = await api.get("/api/listings/recent/blocks");
  return data; // {offers, rent, sale}
});

export const fetchListing = createAsyncThunk("listings/fetchOne", async (id) => {
  if (MOCK) {
    const hit = mockListings.find((x) => x._id === id) || mockListings[0];
    return hit;
  }
  const { data } = await api.get(`/api/listings/${id}`);
  return data;
});

export const createListing = createAsyncThunk("listings/create", async (payload) => {
  if (MOCK) {
    const created = { ...payload, _id: `m${Date.now()}`, images: payload.images || [] };
    return created;
  }
  const { data } = await api.post("/api/listings", payload);
  return data;
});

export const myListings = createAsyncThunk("listings/mine", async () => {
  if (MOCK) {
    return mockListings.slice(0, 2);
  }
  const { data } = await api.get("/api/listings/me/all");
  return Array.isArray(data?.items) ? data.items : data;
});

// ---------- Slice ----------
const slice = createSlice({
  name: "listings",
  initialState: {
    items: [],
    blocks: { offers: [], rent: [], sale: [] },
    current: null,
    mine: [],
    status: "idle",
    total: 0,
    filters: {},
  },
  reducers: {},
  extraReducers: (b) => {
    // fetchListings
    b.addCase(fetchListings.pending, (s) => { s.status = "loading"; });
    b.addCase(fetchListings.fulfilled, (s, a) => {
      const payload = a.payload || {};
      s.items = Array.isArray(payload.items) ? payload.items : (payload || []);
      s.total = Array.isArray(payload.items) ? payload.items.length : s.items.length;
      s.filters = payload.filters || {};
      s.status = "succeeded";
    });
    b.addCase(fetchListings.rejected, (s) => { s.status = "failed"; });

    // blocks
    b.addCase(fetchBlocks.fulfilled, (s, a) => {
      const blk = a.payload || {};
      s.blocks = {
        offers: Array.isArray(blk.offers) ? blk.offers : [],
        rent: Array.isArray(blk.rent) ? blk.rent : [],
        sale: Array.isArray(blk.sale) ? blk.sale : [],
      };
    });

    // fetchOne
    b.addCase(fetchListing.fulfilled, (s, a) => { s.current = a.payload || null; });

    // create
    b.addCase(createListing.fulfilled, (s, a) => {
      const created = a.payload;
      s.items = [created, ...s.items];
      if (created?.mode === "rent") s.blocks.rent.unshift(created);
      if (created?.mode === "sale") s.blocks.sale.unshift(created);
      if (created?.offer) s.blocks.offers.unshift(created);
    });

    // mine
    b.addCase(myListings.fulfilled, (s, a) => {
      s.mine = Array.isArray(a.payload) ? a.payload : [];
    });
  },
});

export default slice.reducer;