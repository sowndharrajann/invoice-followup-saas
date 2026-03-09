import { useEffect, useState } from 'react';
import api from '../services/api';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';

export default function DashboardPage({ onLogout }) {
  const [stats, setStats] = useState({ total_invoices: 0, paid_invoices: 0, overdue_invoices: 0 });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const [statsRes, invoicesRes] = await Promise.all([api.get('/dashboard'), api.get('/invoices')]);
      setStats(statsRes.data);
      setInvoices(invoicesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createInvoice = async (payload) => {
    await api.post('/invoices', payload);
    await load();
  };

  const markPaid = async (id) => {
    await api.patch(`/invoices/${id}/pay`);
    await load();
  };

  return (
    <div className="container">
      <header className="topbar card">
        <div>
          <h1>Invoice Follow-up Dashboard</h1>
          <p className="muted">Track invoices and automate client payment reminders.</p>
        </div>
        <button className="btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </header>

      {error && <p className="error card">{error}</p>}

      <section className="stats-grid">
        <div className="stat card">
          <span className="stat-title">Total Invoices</span>
          <strong>{stats.total_invoices}</strong>
        </div>
        <div className="stat card">
          <span className="stat-title">Paid</span>
          <strong>{stats.paid_invoices}</strong>
        </div>
        <div className="stat card">
          <span className="stat-title">Overdue</span>
          <strong>{stats.overdue_invoices}</strong>
        </div>
      </section>

      <InvoiceForm onCreate={createInvoice} />
      <InvoiceList invoices={invoices} onMarkPaid={markPaid} loading={loading} />
    </div>
  );
}
