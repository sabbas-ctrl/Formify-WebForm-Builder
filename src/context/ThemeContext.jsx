import { createContext, useContext, useEffect, useState } from 'react';
const ThemeCtx = createContext(null);
export function ThemeProvider({ children }){
  const [mode, setMode] = useState(localStorage.getItem('mode')||'system');
  const [hue, setHue] = useState(Number(localStorage.getItem('hue')||210));
  const [radius, setRadius] = useState(Number(localStorage.getItem('radius')||16));
  const [font, setFont] = useState(Number(localStorage.getItem('font')||16));
  useEffect(()=>{
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode==='dark' || (mode==='system' && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.setProperty('--accent-hue', String(hue));
    document.documentElement.style.setProperty('--radius', radius+'px');
    document.documentElement.style.setProperty('--font-base', font+'px');
    localStorage.setItem('mode', mode); localStorage.setItem('hue', String(hue)); localStorage.setItem('radius', String(radius)); localStorage.setItem('font', String(font));
  },[mode,hue,radius,font]);
  return <ThemeCtx.Provider value={{ mode,setMode,hue,setHue,radius,setRadius,font,setFont }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = ()=> useContext(ThemeCtx);