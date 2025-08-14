import { useParams } from 'react-router-dom';
import { useFormDoc } from '../store/useFormDoc.js';

export default function Settings(){
  const { formId } = useParams();
  const { form, save, loading } = useFormDoc(formId);
  if(loading || !form) return <div>Loading…</div>;
  const meta = form.meta;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="container-card space-y-3">
        <div className="font-semibold">General</div>
        <label className="text-sm">Title<input className="input" value={meta.title} onChange={(e)=> save({ ...form, meta:{ ...meta, title:e.target.value } })} /></label>
        <label className="text-sm">Description<textarea className="input" value={meta.desc} onChange={(e)=> save({ ...form, meta:{ ...meta, desc:e.target.value } })} /></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={meta.isQuiz} onChange={(e)=> save({ ...form, meta:{ ...meta, isQuiz:e.target.checked } })}/> Quiz mode</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={meta.settings.collectEmail} onChange={(e)=> save({ ...form, meta:{ ...meta, settings:{ ...meta.settings, collectEmail:e.target.checked } } })}/> Collect email</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={meta.settings.limitOne} onChange={(e)=> save({ ...form, meta:{ ...meta, settings:{ ...meta.settings, limitOne:e.target.checked } } })}/> Limit to 1 response</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={meta.settings.editAfter} onChange={(e)=> save({ ...form, meta:{ ...meta, settings:{ ...meta.settings, editAfter:e.target.checked } } })}/> Allow edit after submit</label>
        <label className="text-sm">Confirmation message<textarea className="input" value={meta.settings.confirmMsg} onChange={(e)=> save({ ...form, meta:{ ...meta, settings:{ ...meta.settings, confirmMsg:e.target.value } } })} /></label>
      </div>
      <div className="container-card space-y-3">
        <div className="font-semibold">Theme</div>
        <label className="text-sm flex items-center justify-between">Mode
          <select className="input w-40" value={meta.theme.mode} onChange={(e)=> save({ ...form, meta:{ ...meta, theme:{ ...meta.theme, mode:e.target.value } } })}>
            <option>system</option><option>light</option><option>dark</option>
          </select>
        </label>
        <label className="text-sm">Accent Hue<input type="range" min={0} max={360} value={meta.theme.hue} onChange={(e)=> save({ ...form, meta:{ ...meta, theme:{ ...meta.theme, hue:Number(e.target.value) } } })} className="w-full"/></label>
        <label className="text-sm">Corner Radius<input type="range" min={4} max={28} value={meta.theme.radius} onChange={(e)=> save({ ...form, meta:{ ...meta, theme:{ ...meta.theme, radius:Number(e.target.value) } } })} className="w-full"/></label>
        <label className="text-sm">Font Size<input type="range" min={12} max={22} value={meta.theme.font} onChange={(e)=> save({ ...form, meta:{ ...meta, theme:{ ...meta.theme, font:Number(e.target.value) } } })} className="w-full"/></label>
        <label className="text-sm">Wallpaper URL<input className="input" value={meta.theme.wallpaper} onChange={(e)=> save({ ...form, meta:{ ...meta, theme:{ ...meta.theme, wallpaper:e.target.value } } })} /></label>
      </div>
    </div>
  );
}