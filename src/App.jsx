import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthGate } from './modules/auth/AuthGate.jsx';
import Shell from './layout/Shell.jsx';
import Builder from './routes/Builder.jsx';
import Preview from './routes/Preview.jsx';
import Fill from './routes/Fill.jsx';
import Responses from './routes/Responses.jsx';
import Settings from './routes/Settings.jsx';

export default function App(){
  return (
    <ThemeProvider>
      <AuthGate>
        <Shell>
          <Routes>
            <Route path="/" element={<Navigate to="/forms/new" replace />} />
            <Route path="/forms/new" element={<Builder />} />
            <Route path="/forms/:formId/builder" element={<Builder />} />
            <Route path="/forms/:formId/preview" element={<Preview />} />
            <Route path="/forms/:formId/fill" element={<Fill />} />
            <Route path="/forms/:formId/responses" element={<Responses />} />
            <Route path="/forms/:formId/settings" element={<Settings />} />
          </Routes>
        </Shell>
      </AuthGate>
    </ThemeProvider>
  );
}