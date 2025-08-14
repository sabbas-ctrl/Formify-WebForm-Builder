import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, ensureAuth } from '../lib/firebase.ts';
import { QuestionRender } from '../components/QuestionRender.jsx';

export default function Fill(){
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  useEffect(()=>{ ensureAuth(); },[]);
  useEffect(()=>{
    (async()=>{
      const snap = await getDoc(doc(db,'forms',formId));
      if(snap.exists()) setForm({ id:snap.id, ...snap.data() });
    })();
  },[formId]);
  const onChange = (qid, val)=> setAnswers((p)=> ({...p, [qid]: val }));
  const section = form?.sections?.[0];

  const score = useMemo(()=>{
    if(!form?.meta?.isQuiz) return undefined;
    let s=0; for(const q of section?.questions||[]){ if(typeof q.points==='number' && q.answerKey!==undefined){ if(String(answers[q.id]||'').trim()===String(q.answerKey).trim()) s+=q.points; } }
    return s;
  },[answers, form, section]);

  const submit = async ()=>{
    const payload = { byUid: auth.currentUser?.uid||null, email: auth.currentUser?.email||null, answers, score, submittedAt: serverTimestamp() };
    await addDoc(collection(db,'responses', formId, 'items'), payload);
    if(form.meta.settings.editAfter){
      const me = auth.currentUser?.uid; if(me){ await setDoc(doc(db,'responses', formId, 'edits', me), payload, { merge:true }); }
    }
    setSubmitted(true);
  };

  if(!form) return <div>Loading…</div>;
  if(submitted) return <div className="max-w-xl mx-auto container-card">{form.meta.settings.confirmMsg||'Response recorded.'}</div>;
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      <div className="container-card">
        <h1 className="text-2xl font-semibold">{form.meta.title}</h1>
        <p className="opacity-70">{form.meta.desc}</p>
      </div>
      {section.questions.map((q)=> (
        <div key={q.id} className="container-card">
          <QuestionRender q={q} value={answers[q.id]} onChange={(v)=> onChange(q.id, v)} />
        </div>
      ))}
      <div className="container-card text-right">
        <button className="btn" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}