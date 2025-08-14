import { useEffect, useMemo, useState } from 'react';
import { doc, getDoc, serverTimestamp, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase.ts';
import { v4 as uuid } from 'uuid';

export function newForm(){
  const qid = ()=> uuid();
  return {
    id: uuid(),
    meta: { ownerUid: auth.currentUser?.uid||'anon', title:'Untitled form', desc:'', isQuiz:false,
      settings:{ collectEmail:false, limitOne:false, editAfter:false, confirmMsg:'Response recorded.', progress:true },
      theme:{ mode:'system', hue:210, radius:16, font:16, wallpaper:'' }, createdAt: Date.now(), updatedAt: Date.now() },
    sections:[{ id: uuid(), title:'Section 1', desc:'', shuffle:false, questions:[
      { id: qid(), type:'short', title:'Full name', required:true, desc:'', validation:{}, points:0 },
      { id: qid(), type:'mcq', title:'Your role', required:false, options:['Student','Teacher','Other'], validation:{}, points:0 }
    ]}]
  };
}

export function useFormDoc(formId){
  const [docState, setDocState] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(!formId || formId==='new'){ setDocState(newForm()); setLoading(false); return; }
    const ref = doc(db,'forms',formId);
    const unsub = onSnapshot(ref,(snap)=>{ if(snap.exists()) setDocState({ id: snap.id, ...snap.data() }); else setDocState(newForm()); setLoading(false); });
    return ()=>unsub();
  },[formId]);
  const save = async (patch)=>{
    const next = { ...(docState||{}), ...patch, meta:{ ...(docState?.meta||{}), updatedAt: Date.now() } };
    setDocState(next);
    const ref = doc(db,'forms', next.id||formId||newForm().id);
    await setDoc(ref, next, { merge:true });
    return ref.id;
  };
  return { form: docState, setForm: setDocState, save, loading };
}