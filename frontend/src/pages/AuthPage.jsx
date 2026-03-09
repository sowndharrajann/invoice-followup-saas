import { useState } from 'react';
import api from '../services/api';

export default function AuthPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await api.post('/auth/signup', form);
      }

      const loginResponse = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem('token', loginResponse.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel card">
        <div className="brand">
          <img src="/images/logo.svg" alt="Invoice Follow-up logo" className="logo" />
          <h1>Invoice Follow-up</h1>
        </div>
        <p className="muted">
          Send timely reminders before and after due dates so clients never miss payments.
        </p>

        <form onSubmit={submit}>
          {isSignup && (
            <>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Jane Founder"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="you@company.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="••••••••"
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Login'}
          </button>
        </form>

        <button className="link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
