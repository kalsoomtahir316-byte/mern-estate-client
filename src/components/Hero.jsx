import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">Find a home you’ll love—fast.</h1>
        <p className="hero__sub">
          Verified listings, clear pricing, and quick messaging with owners & agents.
        </p>
        <Link to="/listings" className="hero__cta">Let’s start now →</Link>
      </div>
    </section>
  );
}