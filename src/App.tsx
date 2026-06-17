import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { AiAssistant } from './pages/AiAssistant/AiAssistant';
import { ClientDetails } from './pages/ClientDetails/ClientDetails';
import { Clients } from './pages/Clients/Clients';
import { Communication } from './pages/Communication/Communication';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Documents } from './pages/Documents/Documents';
import { Finance } from './pages/Finance/Finance';
import { Tasks } from './pages/Tasks/Tasks';
import { NotFoundPanel, NotFoundText, NotFoundTitle } from './App.styled';

// Компонент App відповідає за маршрути VS Studio OS та підключення основного Layout.
export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:clientId" element={<ClientDetails />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/ai-assistant" element={<AiAssistant />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route
        path="*"
        element={
          <NotFoundPanel>
            <NotFoundTitle>Page not found</NotFoundTitle>
            <NotFoundText>This VS Studio OS module is not available yet.</NotFoundText>
          </NotFoundPanel>
        }
      />
    </Route>
  </Routes>
);
