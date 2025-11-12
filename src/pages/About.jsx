// client/src/pages/About.jsx

export default function About() {
  return (
    <div className="container">

      {/* HERO */}
      <section className="section" style={{marginBottom:24}}>
        <h1 className="h1" style={{fontSize:34, marginBottom:8}}>
          About EstateVerse
        </h1>
        <p style={{color:"#4b5563", maxWidth:720, lineHeight:1.55}}>
          EstateVerse is a MERN-stack real-estate platform built to make buying, renting and 
          listing homes in Pakistan **simpler, faster and more transparent**.
          We focus on trust — verified listings, clean UI, honest data, modern search.
        </p>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="section" style={{marginBottom:24}}>
        <h2 className="h2" style={{marginBottom:14}}>What makes us different</h2>

        <div className="grid">
          <article className="card"><div className="card__body">
            <div className="badge">Verified</div>
            <h3 className="h2" style={{fontSize:20}}>Verified Listings</h3>
            <p className="muted">
              Photos & prices checked before going live so you don’t waste time.
            </p>
          </div></article>

          <article className="card"><div className="card__body">
            <div className="badge">Search</div>
            <h3 className="h2" style={{fontSize:20}}>Smart Filters</h3>
            <p className="muted">
              City, price, home-type — fast matching on clean UI.
            </p>
          </div></article>

          <article className="card"><div className="card__body">
            <div className="badge">Support</div>
            <h3 className="h2" style={{fontSize:20}}>Help & Guidance</h3>
            <p className="muted">
              Buyers & Sellers — both get clarity on process, paperwork & valuation.
            </p>
          </div></article>
        </div>
      </section>

      {/* MISSION */}
      <section className="section" style={{marginBottom:24}}>
        <h2 className="h2" style={{marginBottom:10}}>Our mission</h2>
        <p className="muted" style={{maxWidth:760}}>
          To build Pakistan’s most trusted property marketplace where people
          make confident decisions — without confusion, guesswork or fraud.
        </p>

        <div className="grid" style={{marginTop:16}}>
          <div className="card"><div className="card__body">
            <div className="h2" style={{fontWeight:800}}>24h</div>
            <div className="muted">Listing verification target</div>
          </div></div>

          <div className="card"><div className="card__body">
            <div className="h2" style={{fontWeight:800}}>99.9%</div>
            <div className="muted">Search uptime</div>
          </div></div>

          <div className="card"><div className="card__body">
            <div className="h2" style={{fontWeight:800}}>3-steps</div>
            <div className="muted">Posting flow</div>
          </div></div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <h2 className="h2" style={{marginBottom:8}}>Partner with us</h2>
        <p className="muted" style={{marginBottom:12}}>
          Agents / Owners — post your listing on EstateVerse and reach serious buyers.
        </p>

        <a href="mailto:hello@estateverse.com" className="btn btn--primary">
          Contact Sales
        </a>
        <a href="/create" className="btn" style={{marginLeft:8}}>Post a Listing</a>
      </section>

    </div>
  );
}