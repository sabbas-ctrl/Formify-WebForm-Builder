import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ensureAuth } from '../lib/firebase.ts';
import { useFormDoc, newForm } from '../store/useFormDoc.js';
import QuestionEditor from '../components/QuestionEditor.jsx';
import { v4 as uuid } from 'uuid';

export default function Builder(){
  const { formId } = useParams();
  const nav = useNavigate();
  const { form, setForm, save, loading } = useFormDoc(formId);
  useEffect(()=>{ ensureAuth(); },[]);
  if(loading || !form) return <div>Loading…</div>;
  const active = form.sections[0];

  const updateQ = (qid, patch)=>{
    const next = { ...form, sections: form.sections.map(s=> s.id===active.id? { ...s, questions:[...s.questions, q] }: s) };
    setForm(next); save(next);
  };
  const removeQ = (qid)=>{
    const next = { ...form, sections: form.sections.map(s=> s.id===active.id? { ...s, questions: s.questions.filter(q=> q.id!==qid) }: s) };
    setForm(next); save(next);
  };
  const duplicateQ = (qid)=>{
    const q = active.questions.find(x=> x.id===qid); if(!q) return;
    const copy = { ...q, id: uuid(), title: q.title+" (copy)" };
    const next = { ...form, sections: form.sections.map(s=> s.id===active.id? { ...s, questions:[...s.questions, copy] }: s) };
    setForm(next); save(next);
  };

  const newFormFlow = async ()=>{
    const fresh = newForm();
    await save(fresh); nav(`/forms/${fresh.id}/builder`);
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        <div className="container-card">
          <input className="input text-xl font-semibold" value={form.meta.title}
                 onChange={(e)=> save({ ...form, meta:{ ...form.meta, title: e.target.value } })} />
          <textarea className="input mt-2" placeholder="Form description" value={form.meta.desc}
                    onChange={(e)=> save({ ...form, meta:{ ...form.meta, desc: e.target.value } })} />
        </div>
        {active.questions.map((q)=> (
          <QuestionEditor key={q.id}
            q={q}
            onChange={(next)=> updateQ(q.id, next)}
            onRemove={()=> removeQ(q.id)}
            onDuplicate={()=> duplicateQ(q.id)}
          />
        ))}
        <div className="flex flex-wrap gap-2">
          {['short','paragraph','mcq','checkbox','dropdown','linear','date','time'].map(t=> (
            <button key={t} className="btn" onClick={()=> addQ(t)}>+ {t}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="container-card">
          <div className="font-semibold">Section</div>
          <div className="text-sm opacity-70">(Single section shown for brevity; add more in Settings)</div>
        </div>
        <div className="container-card">
          <div className="font-semibold mb-2">Share</div>
          <button className="btn w-full" onClick={()=> navigator.clipboard.writeText(window.location.origin+`/forms/${form.id}/fill`)}>Copy Fill Link</button>
          <button className="btn w-full mt-2" onClick={()=> window.open(`/forms/${form.id}/preview`, '_blank')}>Open Preview</button>
          <button className="btn w-full mt-2" onClick={newFormFlow}>New Form</button>
        </div>
      </div>
    </div>
  );
}
