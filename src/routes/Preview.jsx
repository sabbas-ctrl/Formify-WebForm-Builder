import { useParams } from 'react-router-dom';
import { useFormDoc } from '../store/useFormDoc.js';
import { QuestionRender } from '../components/QuestionRender.jsx';

export default function Preview(){
  const { formId } = useParams();
  const { form, loading } = useFormDoc(formId);
  if(loading || !form) return <div>Loading…</div>;
  const section = form.sections[0];
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      <div className="container-card">
        <h1 className="text-2xl font-semibold">{form.meta.title}</h1>
        <p className="opacity-70">{form.meta.desc}</p>
      </div>
      {section.questions.map((q)=> (
        <div key={q.id} className="container-card">
          <QuestionRender q={q} value={''} onChange={()=>{}} />
        </div>
      ))}
      <div className="container-card text-right">
        <button className="btn">Submit</button>
      </div>
    </div>
  );
}