import UploadWidget from "../components/UploadWidget";
import { useDispatch } from "react-redux";
import { createListing } from "../features/listings/listingsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateListing(){
  const d = useDispatch(); const nav = useNavigate();
  const [form,set] = useState({
    title:"", description:"", address:"", type:"rent",
    bedrooms:1, bathrooms:1, price:0, discountPrice:0, offer:false,
    parking:false, furnished:false, images:""
  });
  const on = (k)=>(e)=>{
    const v = e.target.type==="number" ? +e.target.value :
              e.target.type==="checkbox" ? e.target.checked : e.target.value;
    set({...form,[k]:v});
  };

  const submit = async (e)=>{
    e.preventDefault();
    const payload = { ...form, images: form.images? form.images.split(",").map(s=>s.trim()):[] };
    if (payload.offer && payload.discountPrice >= payload.price) { alert("Discount must be less than price"); return; }
    const r = await d(createListing(payload));
    if(r.meta.requestStatus==="fulfilled") nav(`/listings/${r.payload._id}`);
  };

 return (
  <div className="container">
    <h2 className="page-title">Create Listing</h2>

    <form onSubmit={submit} className="form card">

      <div className="row">
        <div className="label">Title</div>
        <input className="input" name="title" value={form.title} onChange={onChange}/>
      </div>

      <div className="row">
        <div className="label">Address</div>
        <input className="input" name="address" value={form.address} onChange={onChange}/>
      </div>

      <div className="row">
        <div className="label">Bedrooms</div>
        <input className="input" type="number" name="bedrooms" value={form.bedrooms} onChange={onChange}/>
      </div>

      <div className="row">
        <div className="label">Bathrooms</div>
        <input className="input" type="number" name="bathrooms" value={form.bathrooms} onChange={onChange}/>
      </div>

      <UploadWidget onUpload={(urls)=> setForm({...form, images:urls})} />

      <button className="btn" type="submit">Create Listing</button>
    </form>

  </div>
);
}