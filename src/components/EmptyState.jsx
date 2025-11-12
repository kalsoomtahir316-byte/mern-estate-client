export default function EmptyState({title="Nothing found", hint="Try changing filters or add a listing."}){
  return <div className="empty">
    <div style={{fontWeight:700, marginBottom:6}}>{title}</div>
    <div style={{fontSize:14}}>{hint}</div>
  </div>;
}