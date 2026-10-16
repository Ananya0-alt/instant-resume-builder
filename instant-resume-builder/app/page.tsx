"use client";
import { useState } from "react";
import jsPDF from "jspdf";

type ResumeData = {
  name: string; email: string; phone: string; location: string; linkedin: string;
  summary: string;
  experience: { company: string; role: string; duration: string; desc: string }[];
  education: { school: string; degree: string; year: string }[];
  skills: string;
};

export default function Home() {
  const [template, setTemplate] = useState(1);
  const [data, setData] = useState<ResumeData>({
    name: "Ananya Sharma", email: "ananya@email.com", phone: "+91 98765 43210",
    location: "Trivandrum, Kerala", linkedin: "linkedin.com/in/ananya",
    summary: "Motivated BCA graduate passionate about web development. Seeking entry-level role to apply React and Next.js skills.",
    experience: [{ company: "Tech Intern", role: "Web Developer Intern", duration: "Jan 2024 - May 2024", desc: "Built responsive websites using React and Tailwind. Improved page speed by 40%." }],
    education: [{ school: "University of Kerala", degree: "BCA", year: "2022-2025" }],
    skills: "React, Next.js, JavaScript, Tailwind CSS, Git, GitHub, HTML, CSS"
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(22); doc.text(data.name, 20, y); y+=10;
    doc.setFontSize(10); doc.text(`${data.email} | ${data.phone} | ${data.location} | ${data.linkedin}`, 20, y); y+=10;
    doc.setFontSize(12); doc.text("Summary:", 20, y); y+=7; doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(data.summary, 170); doc.text(summaryLines, 20, y); y+= summaryLines.length*5 + 5;
    doc.setFontSize(12); doc.text("Experience:", 20, y); y+=7; doc.setFontSize(10);
    data.experience.forEach(exp => {
      doc.text(`${exp.role} at ${exp.company} (${exp.duration})`, 20, y); y+=5;
      const descLines = doc.splitTextToSize(exp.desc, 170); doc.text(descLines, 20, y); y+= descLines.length*5 + 5;
    });
    doc.setFontSize(12); doc.text("Education:", 20, y); y+=7; doc.setFontSize(10);
    data.education.forEach(edu => { doc.text(`${edu.degree} - ${edu.school} (${edu.year})`, 20, y); y+=7; });
    y+=3; doc.setFontSize(12); doc.text("Skills:", 20, y); y+=7; doc.setFontSize(10); doc.text(data.skills, 20, y);
    doc.save(`${data.name.replace(/\s+/g,'_')}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* FORM LEFT */}
      <div className="w-full md:w-[45%] p-6 bg-white overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-4">Instant Resume Builder</h1>

        <div className="flex gap-2 mb-6">
          {[1,2,3].map(t => (
            <button key={t} onClick={()=>setTemplate(t)} className={`px-3 py-1 rounded ${template===t?'bg-black text-white':'bg-gray-200'}`}>Template {t}</button>
          ))}
        </div>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Full Name" value={data.name} onChange={e=>setData({...data, name:e.target.value})}/>
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded" placeholder="Email" value={data.email} onChange={e=>setData({...data, email:e.target.value})}/>
            <input className="border p-2 rounded" placeholder="Phone" value={data.phone} onChange={e=>setData({...data, phone:e.target.value})}/>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded" placeholder="Location" value={data.location} onChange={e=>setData({...data, location:e.target.value})}/>
            <input className="border p-2 rounded" placeholder="LinkedIn" value={data.linkedin} onChange={e=>setData({...data, linkedin:e.target.value})}/>
          </div>
          <textarea className="w-full border p-2 rounded" rows={3} placeholder="Professional Summary" value={data.summary} onChange={e=>setData({...data, summary:e.target.value})}/>

          <h3 className="font-bold pt-2">Experience</h3>
          <input className="w-full border p-2 rounded" placeholder="Company" value={data.experience[0].company} onChange={e=>{ const ne=[...data.experience]; ne[0].company=e.target.value; setData({...data, experience:ne})}}/>
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded" placeholder="Role" value={data.experience[0].role} onChange={e=>{ const ne=[...data.experience]; ne[0].role=e.target.value; setData({...data, experience:ne})}}/>
            <input className="border p-2 rounded" placeholder="Duration" value={data.experience[0].duration} onChange={e=>{ const ne=[...data.experience]; ne[0].duration=e.target.value; setData({...data, experience:ne})}}/>
          </div>
          <textarea className="w-full border p-2 rounded" rows={2} placeholder="Description" value={data.experience[0].desc} onChange={e=>{ const ne=[...data.experience]; ne[0].desc=e.target.value; setData({...data, experience:ne})}}/>

          <h3 className="font-bold pt-2">Education</h3>
          <input className="w-full border p-2 rounded" placeholder="School" value={data.education[0].school} onChange={e=>{ const ne=[...data.education]; ne[0].school=e.target.value; setData({...data, education:ne})}}/>
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded" placeholder="Degree" value={data.education[0].degree} onChange={e=>{ const ne=[...data.education]; ne[0].degree=e.target.value; setData({...data, education:ne})}}/>
            <input className="border p-2 rounded" placeholder="Year" value={data.education[0].year} onChange={e=>{ const ne=[...data.education]; ne[0].year=e.target.value; setData({...data, education:ne})}}/>
          </div>

          <h3 className="font-bold pt-2">Skills (comma separated)</h3>
          <input className="w-full border p-2 rounded" placeholder="Skills" value={data.skills} onChange={e=>setData({...data, skills:e.target.value})}/>

          <button onClick={downloadPDF} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-4">⬇ Download PDF</button>
        </div>
      </div>

      {/* PREVIEW RIGHT */}
      <div className="w-full md:w-[55%] p-8 bg-gray-200 overflow-y-auto h-screen flex justify-center">
        <div className={`bg-white w-[700px] p-10 shadow-lg ${template===2?'font-serif':''} ${template===3?'border-l-8 border-black':''}`}>
          {template===1 && (
            <>
              <h1 className="text-3xl font-bold uppercase">{data.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{data.email} | {data.phone} | {data.location} | {data.linkedin}</p>
              <hr className="my-4"/>
              <h2 className="font-bold bg-gray-100 p-1">SUMMARY</h2><p className="text-sm mt-2">{data.summary}</p>
              <h2 className="font-bold bg-gray-100 p-1 mt-4">EXPERIENCE</h2>
              {data.experience.map((ex,i)=><div key={i} className="mt-2"><p className="font-bold text-sm">{ex.role} - {ex.company} <span className="font-normal italic">({ex.duration})</span></p><p className="text-sm">{ex.desc}</p></div>)}
              <h2 className="font-bold bg-gray-100 p-1 mt-4">EDUCATION</h2>
              {data.education.map((ed,i)=><p key={i} className="text-sm mt-1">{ed.degree}, {ed.school} ({ed.year})</p>)}
              <h2 className="font-bold bg-gray-100 p-1 mt-4">SKILLS</h2><p className="text-sm mt-1">{data.skills}</p>
            </>
          )}
          {template===2 && (
            <>
              <h1 className="text-4xl font-light text-center">{data.name}</h1>
              <p className="text-center text-xs mt-2 tracking-widest">{data.email} • {data.phone} • {data.location}</p>
              <p className="text-center text-xs">{data.linkedin}</p>
              <hr className="my-6"/>
              <p className="text-sm italic text-center">{data.summary}</p>
              <h3 className="text-center font-bold mt-6 tracking-[0.3em] text-xs">EXPERIENCE</h3><hr className="my-2"/>
              {data.experience.map((ex,i)=><div key={i} className="text-center mt-3"><p className="font-bold">{ex.company}</p><p className="text-sm">{ex.role} | {ex.duration}</p><p className="text-sm mt-1">{ex.desc}</p></div>)}
              <h3 className="text-center font-bold mt-6 tracking-[0.3em] text-xs">EDUCATION</h3><hr className="my-2"/>
              {data.education.map((ed,i)=><p key={i} className="text-sm text-center">{ed.degree} — {ed.school} ({ed.year})</p>)}
              <h3 className="text-center font-bold mt-6 tracking-[0.3em] text-xs">SKILLS</h3><hr className="my-2"/><p className="text-sm text-center">{data.skills}</p>
            </>
          )}
          {template===3 && (
            <>
              <h1 className="text-3xl font-black">{data.name}</h1>
              <p className="text-sm mt-1">{data.email} | {data.phone}</p><p className="text-sm">{data.location} | {data.linkedin}</p>
              <div className="mt-6"><h2 className="font-black border-b-2 border-black">PROFESSIONAL SUMMARY</h2><p className="text-sm mt-2">{data.summary}</p></div>
              <div className="mt-4"><h2 className="font-black border-b-2 border-black">WORK EXPERIENCE</h2>
                {data.experience.map((ex,i)=><div key={i} className="mt-2"><p className="font-bold">{ex.role} | {ex.company}</p><p className="text-xs italic">{ex.duration}</p><p className="text-sm mt-1">{ex.desc}</p></div>)}
              </div>
              <div className="mt-4"><h2 className="font-black border-b-2 border-black">EDUCATION</h2>{data.education.map((ed,i)=><p key={i} className="text-sm mt-1"><b>{ed.school}</b> — {ed.degree} ({ed.year})</p>)}</div>
              <div className="mt-4"><h2 className="font-black border-b-2 border-black">SKILLS</h2><p className="text-sm mt-1">{data.skills}</p></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}