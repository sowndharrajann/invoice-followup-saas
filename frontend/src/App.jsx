import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));

  if (!authenticated) {
    return <AuthPage onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <DashboardPage
      onLogout={() => {
        localStorage.removeItem('token');
        setAuthenticated(false);
      }}
    />
  );
}
