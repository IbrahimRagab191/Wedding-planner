import React, { useEffect, useState } from 'react';
import './Guest.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const GuestPage = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', phone: '' });
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [editingGuest, setEditingGuest] = useState({ name: '', phone: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/guests')
      .then(res => res.json())
      .then(data => setGuests(data))
      .catch(() => setError('⚠️ Failed to load guest list.'));
  }, []);

  const handleAddGuest = () => {
    if (!newGuest.name.trim() || !newGuest.phone.trim()) return;

    fetch('http://localhost:8000/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGuest),
    })
      .then(res => res.json())
      .then(guest => {
        setGuests([...guests, guest]);
        setNewGuest({ name: '', phone: '' });
      })
      .catch(() => setError('⚠️ Failed to add guest.'));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to remove this guest?')) return;

    fetch(`http://localhost:8000/guests/${id}`, { method: 'DELETE' })
      .then(() => setGuests(guests.filter(g => g.id !== id)))
      .catch(() => setError('⚠️ Failed to delete guest.'));
  };

  const handleUpdate = (id) => {
    if (!editingGuest.name.trim() || !editingGuest.phone.trim()) return;

    fetch(`http://localhost:8000/guests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingGuest),
    })
      .then(() => {
        setGuests(guests.map(g => (g.id === id ? { ...g, ...editingGuest } : g)));
        setEditingGuestId(null);
        setEditingGuest({ name: '', phone: '' });
      })
      .catch(() => setError('⚠️ Failed to update guest.'));
  };

  return (
    <div className="page-layout">
      <Header customClass="header-light" />
      <div className="guest-page">
        <h2 className="guest-header">Guest List</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="guest-input">
          <input
            type="text"
            placeholder="Guest Name"
            value={newGuest.name}
            onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
            maxLength={100}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newGuest.phone}
            onChange={e => setNewGuest({ ...newGuest, phone: e.target.value })}
            maxLength={20}
          />
          <button onClick={handleAddGuest} disabled={!newGuest.name.trim() || !newGuest.phone.trim()}>
            Add Guest
          </button>
        </div>

        {guests.length === 0 ? (
          <p className="no-guests">No guests yet. Start inviting!</p>
        ) : (
          <ul className="guest-list">
            {guests.map(guest => (
              <li key={guest.id} className="guest-item">
                {editingGuestId === guest.id ? (
                  <>
                    <input
                      type="text"
                      value={editingGuest.name}
                      onChange={e => setEditingGuest({ ...editingGuest, name: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingGuest.phone}
                      onChange={e => setEditingGuest({ ...editingGuest, phone: e.target.value })}
                    />
                    <button onClick={() => handleUpdate(guest.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <span><strong>{guest.name}</strong> - {guest.phone}</span>
                    <button onClick={() => {
                      setEditingGuestId(guest.id);
                      setEditingGuest({ name: guest.name, phone: guest.phone });
                    }}>Edit</button>
                    <button onClick={() => handleDelete(guest.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GuestPage;
