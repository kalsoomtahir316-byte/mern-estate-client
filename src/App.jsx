import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateListing from "./pages/CreateListing";
import ProtectedRoute from "./components/ProtectedRoute";
import MyListings from "./pages/MyListings";
import About from "./pages/About";
export default function App(){
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/listings" element={<Listings/>}/>
        <Route path="/listings/:id" element={<ListingDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<ProtectedRoute><CreateListing/></ProtectedRoute>}/>
        <Route path="/me" element={<ProtectedRoute><MyListings/></ProtectedRoute>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </>
  );
}