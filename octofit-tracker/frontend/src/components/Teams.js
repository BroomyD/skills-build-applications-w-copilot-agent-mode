import React, { useEffect, useState } from 'react';

function renderTable(items, onRowClick) {
  if (!items || items.length === 0) return <div className="centered-empty small-muted">No data</div>;
  const firstObj = items.find((i) => typeof i === 'object' && i !== null) || items[0];
  if (typeof firstObj !== 'object') {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-clickable">
          <thead><tr><th>Value</th></tr></thead>
          <tbody>{items.map((it, idx) => <tr key={idx} onClick={() => onRowClick && onRowClick(it)}><td>{String(it)}</td></tr>)}</tbody>
        </table>
      </div>
    );
  }
  const headers = Object.keys(firstObj);
  return (
    <div className="table-responsive">
      <table className="table table-striped table-clickable">
        <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{items.map((row, idx) => (<tr key={idx} onClick={() => onRowClick && onRowClick(row)}>{headers.map((h) => <td key={h}>{row[h] !== undefined ? String(row[h]) : ''}</td>)}</tr>))}</tbody>
      </table>
    </div>
  );
}

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const fetchData = () => {
    setLoading(true);
    const comp = 'teams';
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const url = codespace ? `https://${codespace}-8000.app.github.dev/api/${comp}/` : `${window.location.protocol}//${window.location.host}/api/${comp}/`;
    console.log('Fetching Teams from', url);
    fetch(url).then((r) => r.json()).then((data) => {
      console.log('Teams response:', data);
      const list = data && data.results ? data.results : data || [];
      console.log('Teams list:', list);
      setItems(list);
    }).catch((err) => console.error('Teams fetch error:', err)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);
  const openModal = (row) => { setModalContent(row); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setModalContent(null); };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Teams</h2>
        <div className="mb-3"><button className="btn btn-primary me-2" onClick={fetchData} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button></div>
        {renderTable(items, openModal)}
      </div>

      {modalOpen && (
        <>
          <div className="modal show" style={{display:'block'}} tabIndex="-1">
            <div className="modal-dialog modal-lg"><div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Team details</h5><button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button></div>
              <div className="modal-body"><pre>{JSON.stringify(modalContent, null, 2)}</pre></div>
              <div className="modal-footer"><button className="btn btn-secondary" onClick={closeModal}>Close</button></div>
            </div></div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
}

export default Teams;
