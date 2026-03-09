function statusClass(status) {
  if (status === 'paid') return 'badge badge-paid';
  if (status === 'pending') return 'badge badge-pending';
  return 'badge';
}

export default function InvoiceList({ invoices, onMarkPaid, loading }) {
  if (loading) {
    return (
      <div className="card">
        <h2>Invoices</h2>
        <p className="muted">Loading invoices...</p>
      </div>
    );
  }

  if (!invoices.length) {
    return (
      <div className="card">
        <h2>Invoices</h2>
        <img
          src="/images/empty-invoices.svg"
          alt="No invoices illustration"
          className="empty-image"
        />
        <p className="muted">No invoices yet. Add your first invoice above.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Invoices</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.client_name}</td>
                <td>{invoice.client_email}</td>
                <td>${Number(invoice.amount).toFixed(2)}</td>
                <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                <td>
                  <span className={statusClass(invoice.status)}>{invoice.status}</span>
                </td>
                <td>
                  {invoice.status === 'pending' ? (
                    <button className="btn-small" onClick={() => onMarkPaid(invoice.id)}>
                      Mark Paid
                    </button>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
