export function QuestionRender({ q, value, onChange }){
    const common = (node)=> (
    <div className="space-y-1">
      <label className="text-sm font-medium">{q.title}{q.required && <span className="text-red-500"> *</span>}</label>
      {q.desc && <div className="text-xs opacity-70">{q.desc}</div>}
      {node}
    </div>
  );
  if(q.type==='short') return common(<input className="input" value={value||''} onChange={(e)=> onChange(e.target.value)} />);
  if(q.type==='paragraph') return common(<textarea className="input" value={value||''} onChange={(e)=> onChange(e.target.value)} />);
  if(q.type==='mcq') return common(
    <div className="space-y-1">
      {(q.shuffle? shuffle(q.options): q.options).map((opt,i)=> (
        <label key={i} className="flex items-center gap-2"><input type="radio" name={q.id} checked={value===opt} onChange={()=> onChange(opt)} /> {opt}</label>
      ))}
    </div>
  );
  if(q.type==='checkbox') return common(
    <div className="space-y-1">
      {(q.shuffle? shuffle(q.options): q.options).map((opt,i)=> {
        const arr = Array.isArray(value)? value:[];
        const checked = arr.includes(opt);
        return <label key={i} className="flex items-center gap-2"><input type="checkbox" checked={checked} onChange={(e)=>{
          const next = new Set(arr); e.target.checked? next.add(opt) : next.delete(opt); onChange(Array.from(next));
        }} /> {opt}</label>;
      })}
    </div>
  );
  if(q.type==='dropdown') return common(
    <select className="input" value={value||''} onChange={(e)=> onChange(e.target.value)}>
      <option value="" disabled>— Select —</option>
      {q.options.map((opt,i)=> <option key={i} value={opt}>{opt}</option>)}
    </select>
  );
  if(q.type==='linear') return common(
    <div className="flex items-center gap-2">
      <input type="range" min={1} max={q.scaleMax||5} value={Number(value||1)} onChange={(e)=> onChange(Number(e.target.value))} className="w-full"/>
      <span className="text-sm w-10 text-right">{value||1}</span>
    </div>
  );
  if(q.type==='date') return common(<input type="date" className="input" value={value||''} onChange={(e)=> onChange(e.target.value)} />);
  if(q.type==='time') return common(<input type="time" className="input" value={value||''} onChange={(e)=> onChange(e.target.value)} />);
  if(q.type==='file') return common(<input type="file" className="input" onChange={(e)=> onChange(e.target.files?.[0]?.name||'')} />);
  // Grid types (simplified):
  if(q.type==='mcgrid' || q.type==='cbgrid') return common(
    <table className="w-full text-sm border">
      <thead><tr><th className="border p-2"></th>{q.columns?.map((c,i)=>(<th key={i} className="border p-2">{c}</th>))}</tr></thead>
      <tbody>
        {q.rows?.map((r,ri)=> (
          <tr key={ri}>
            <td className="border p-2 font-medium">{r}</td>
            {q.columns?.map((c,ci)=> (
              <td key={ci} className="border p-2 text-center">
                {q.type==='mcgrid' ? (
                  <input type="radio" name={`${q.id}-${ri}`} checked={value?.[ri]===ci} onChange={()=> onChange({ ...(value||{}), [ri]: ci })} />
                ):(
                  <input type="checkbox" checked={!!value?.[ri]?.includes(ci)} onChange={(e)=>{
                    const arr = new Set(value?.[ri]||[]); e.target.checked? arr.add(ci):arr.delete(ci); onChange({ ...(value||{}), [ri]: Array.from(arr) });
                  }} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
  return common(<div>Unsupported type</div>);
}
function shuffle(arr){ return [...arr].sort(()=> Math.random()-0.5); }
