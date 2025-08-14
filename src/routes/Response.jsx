import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Responses(){
  const { formId } = useParams();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  useEffect(()=>{
    (async()=>{
      const [rSnap, fSnap] = await Promise.all([
        getDocs(collection(db,'responses', formId, 'items')),
        getDocs(collection(db,'forms')) // quick fetch to get form (for brevity fetch by iteration)
      ]);
      const it=[]; rSnap.forEach(d=> it.push({ id:d.id, ...d.data() }));
      setItems(it);
      // naive: find form by id via client; in production fetch doc directly
      fSnap.forEach((d)=>{ if(d.id===formId) setForm({ id:d.id, ...d.data() }); });
    })();
  },[formId]);

  const csv = useMemo(()=>{
    if(!items.length) return '';
    const keys = Array.from(new Set(items.flatMap(i=> Object.keys(i.answers||{}))));
    const head = ['id','submittedAt', ...keys];
    const rows = items.map(i=> [i.id, i.submittedAt?.toDate?.()?.toISOString?.()||'', ...keys.map(k=> JSON.stringify(i.answers?.[k]??''))]);
    return [head.join(','), ...rows.map(r=> r.join(','))].join('\n');
  },[items]);

  const downloadCSV = ()=>{
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `responses-${formId}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="container-card flex items-center justify-between">
        <div>
          <div className="font-semibold">Responses</div>
          <div className="text-sm opacity-70">{items.length} total</div>
        </div>
        <button className="btn" onClick={downloadCSV}>Download CSV</button>
      </div>

      {/* Example charts for the first MCQ/checkbox question */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="container-card h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rollup(items)}>
              <XAxis dataKey="name" /><YAxis /><Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="container-card h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={rollup(items)} dataKey="count" nameKey="name" outerRadius={100} label>
                {rollup(items).map((e,i)=> <Cell key={i} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
function rollup(items){
  const map = new Map();
  for(const it of items){
    for(const v of Object.values(it.answers||{})){
      if(Array.isArray(v)) v.forEach(x=> map.set(x, (map.get(x)||0)+1));
      else map.set(v, (map.get(v)||0)+1);
    }
  }
  return Array.from(map.entries()).map(([name,count])=> ({ name, count }));
}