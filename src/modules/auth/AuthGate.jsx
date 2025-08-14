import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase.ts';
export function AuthGate({ children }){
  const [ready, setReady] = useState(false);
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, ()=> setReady(true));
    return ()=>unsub();
  },[]);
  return ready? children : <div className="p-6">Loading…</div>;
}
