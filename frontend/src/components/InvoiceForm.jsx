import { useState } from 'react';

export default function InvoiceForm({ onCreate }) {
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    dueDate: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onCreate(form);
      setForm({ clientName: '', clientEmail: '', amount: '', dueDate: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add Invoice</h2>

      <label htmlFor="client-name">Client Name</label>
      <input
        id="client-name"
        placeholder="Acme Inc"
        value={form.clientName}
        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
        required
      />

      <label htmlFor="client-email">Client Email</label>
      <input
        id="client-email"
        placeholder="ap@acme.com"
        type="email"
        value={form.clientEmail}
        onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
        required
      />

      <label htmlFor="invoice-amount">Invoice Amount (USD)</label>
      <input
        id="invoice-amount"
        placeholder="1200"
        type="number"
        min="0"
        step="0.01"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />

      <label htmlFor="due-date">Due Date</label>
      <input
        id="due-date"
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        required
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Create Invoice'}
      </button>
    </form>
  );
}
