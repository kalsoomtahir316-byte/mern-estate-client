import { useEffect } from "react";

export default function UploadWidget({ onDone }){
  useEffect(()=>{
    if(!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      { cloudName: import.meta.env.VITE_CLOUD_NAME, uploadPreset: import.meta.env.VITE_CLOUD_PRESET, multiple: true, maxFiles: 6, sources:["local","camera","url"] },
      (err, res)=>{
        if(!err && res && res.event === "queues-end"){
          const urls = res.info.files.map(f=>f.uploadInfo.secure_url);
          onDone(urls);
        }
      }
    );
    const btn = document.getElementById("cld-btn");
    btn.onclick = ()=> widget.open();
  }, [onDone]);

  return <button id="cld-btn" type="button" className="btn outline">UPLOAD</button>;
}