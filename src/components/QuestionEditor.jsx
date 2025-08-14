import { Trash2, Copy, Shuffle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionEditor({ q, onChange, onRemove, onDuplicate }){
  return (
    <motion.div layout className="container-card space-y-2">
      <div className="flex items-center gap-2">
        <input className="input" value={q.title} placeholder="Question"
               onChange={(e)=> onChange({ ...q, title: e.target.value })} />
        <select className="input w-40" value={q.type} onChange={(e)=> onChange({ ...q, type:e.target.value })}>
          <option value="short">Short answer</option>
          <option value="paragraph">Paragraph</option>
          <option value="mcq">Multiple choice</option>
          <option value="checkbox">Checkboxes</option>
          <option value="dropdown">Dropdown</option>
          <option value="linear">Linear scale</option>
          <option value="mcgrid">Multiple choice grid</option>
          <option value="cbgrid">Checkbox grid</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="file">File (meta)</option>
        </select>
      </div>
      {['mcq','checkbox','dropdown'].includes(q.type) && (
        <OptionsEditor q={q} onChange={onChange} />
      )}
      {q.type==='linear' && (
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-70">Scale</span>
          <input className="input w-24" type="number" min={2} max={10} value={q.scaleMax||5} onChange={(e)=> onChange({ ...q, scaleMax:Number(e.target.value) })} />
        </div>
      )}
      <textarea className="input" placeholder="Description (optional)" value={q.desc||''} onChange={(e)=> onChange({ ...q, desc:e.target.value })} />
      <div className="flex items-center gap-3 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!q.required} onChange={(e)=> onChange({ ...q, required:e.target.checked })}/> Required</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!q.shuffle} onChange={(e)=> onChange({ ...q, shuffle:e.target.checked })}/><Shuffle className="w-4 h-4"/> Shuffle options</label>
        <details>
          <summary className="cursor-pointer inline-flex items-center gap-1">Validation <ChevronDown className="w-4 h-4"/></summary>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input className="input" placeholder="Regex" value={q.validation?.regex||''} onChange={(e)=> onChange({ ...q, validation:{ ...(q.validation||{}), regex:e.target.value } })} />
            <input className="input" placeholder="Min length / value" type="number" value={q.validation?.min||''} onChange={(e)=> onChange({ ...q, validation:{ ...(q.validation||{}), min:Number(e.target.value) } })} />
            <input className="input" placeholder="Max length / value" type="number" value={q.validation?.max||''} onChange={(e)=> onChange({ ...q, validation:{ ...(q.validation||{}), max:Number(e.target.value) } })} />
          </div>
        </details>
        <details>
          <summary className="cursor-pointer inline-flex items-center gap-1">Quiz</summary>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input className="input" placeholder="Points" type="number" value={q.points||0} onChange={(e)=> onChange({ ...q, points:Number(e.target.value) })} />
            <input className="input" placeholder="Answer key (exact match)" value={q.answerKey||''} onChange={(e)=> onChange({ ...q, answerKey:e.target.value })} />
          </div>
        </details>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn" onClick={onDuplicate}><Copy className="w-4 h-4"/> Duplicate</button>
          <button className="btn" onClick={onRemove}><Trash2 className="w-4 h-4"/> Delete</button>
        </div>
      </div>
    </motion.div>
  );
}

function OptionsEditor({ q, onChange }){
  const options = q.options||['Option 1'];
  return (
    <div className="space-y-2">
      {options.map((opt, i)=> (
        <div key={i} className="flex items-center gap-2">
          <input className="input" value={opt} onChange={(e)=>{
            const next=[...options]; next[i]=e.target.value; onChange({ ...q, options: next });
          }} />
          <button className="btn" onClick={()=> onChange({ ...q, options:[...options.slice(0,i), ...options.slice(i+1)] })}>Remove</button>
        </div>
      ))}
      <button className="btn" onClick={()=> onChange({ ...q, options:[...options, `Option ${options.length+1}`] })}>+ Add option</button>
    </div>
  );
}
