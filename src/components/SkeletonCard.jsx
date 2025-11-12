export default function SkeletonCard(){
  return (
    <div className="skel-card">
      <div className="skeleton skel-img"></div>
      <div className="skel-body">
        <div className="skeleton skel-line" style={{width:"70%"}}/>
        <div className="skeleton skel-line" style={{width:"40%"}}/>
        <div className="skeleton skel-line" style={{width:"55%"}}/>
      </div>
    </div>
  );
}