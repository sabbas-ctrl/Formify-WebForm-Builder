import { Link, useLocation, useParams } from 'react-router-dom';
import { Sun, Moon, Settings as SettingsIcon, PanelsTopLeft, Eye, PenSquare, BarChart3, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Shell({ children }){
  const { mode, setMode } = useTheme();
  const loc = useLocation();
  const { formId } = useParams();
  return (
    <div className="min-h-screen bg-[hsl(var(--accent-hue),40%,97%)] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/forms/new" className="flex items-center gap-2 font-semibold"><PanelsTopLeft className="w-5 h-5"/> Forms Pro</Link>
          <nav className="flex items-center gap-2 text-sm">
            {formId && (
              <>
                <Link className={navClass(loc.pathname, 'builder')} to={`/forms/${formId}/builder`}><PenSquare className="w-4 h-4"/> Builder</Link>
                <Link className={navClass(loc.pathname, 'preview')} to={`/forms/${formId}/preview`}><Eye className="w-4 h-4"/> Preview</Link>
                <Link className={navClass(loc.pathname, 'fill')} to={`/forms/${formId}/fill`}><Share2 className="w-4 h-4"/> Fill</Link>
                <Link className={navClass(loc.pathname, 'responses')} to={`/forms/${formId}/responses`}><BarChart3 className="w-4 h-4"/> Responses</Link>
                <Link className={navClass(loc.pathname, 'settings')} to={`/forms/${formId}/settings`}><SettingsIcon className="w-4 h-4"/> Settings</Link>
              </>
            )}
            <button className="ml-2 btn" onClick={()=> setMode(mode==='dark'?'light':'dark')}>{mode==='dark'?<Sun className="w-4 h-4"/>:<Moon className="w-4 h-4"/>}</button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-4">{children}</main>
    </div>
  );
}
function navClass(path, key){
  const active = path.includes(key);
  return `btn ${active? 'bg-black/5 dark:bg-white/10':''}`;
}