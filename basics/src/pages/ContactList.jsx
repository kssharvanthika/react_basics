import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch contacts from MongoDB
  const fetchContacts = () => {
    axios.get('http://localhost:5000/contacts')
      .then((res) => setContacts(res.data))
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Create or Update form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update contact
      axios.put(`http://localhost:5000/contacts/${editingId}`, form)
        .then(() => {
          fetchContacts();
          setForm({ name: '', email: '', message: '' });
          setEditingId(null);
        })
        .catch(err => alert('Error updating contact'));
    } else {
      // Create contact
      axios.post('http://localhost:5000/contacts', form)
        .then(() => {
          fetchContacts();
          setForm({ name: '', email: '', message: '' });
        })
        .catch(err => alert('Error creating contact'));
    }
  };

  // Delete a contact
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      axios.delete(`http://localhost:5000/contacts/${id}`)
        .then(() => fetchContacts())
        .catch(err => alert('Error deleting contact'));
    }
  };

  // Prepare contact for editing
  const handleEdit = (contact) => {
    setForm({ name: contact.name, email: contact.email, message: contact.message });
    setEditingId(contact._id);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({ name: '', email: '', message: '' });
    setEditingId(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Contact Manager</h2>

      {editingId && <p style={{ color: 'orange' }}>Editing contact...</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
        />

        {editingId ? (
          <>
            <button type="submit" style={{ marginLeft: '10px' }}>Update</button>
            <button
              type="button"
              onClick={handleCancel}
              style={{ marginLeft: '10px', background: '#ccc' }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button type="submit" style={{ marginLeft: '10px' }}>Create</button>
        )}
      </form>

      <h3>All Contacts</h3>
      {contacts.length === 0 ? (
        <p>No data</p>
      ) : (
        <ul>
          {contacts.map(contact => (
            <li key={contact._id} style={{ marginBottom: '10px' }}>
              <strong>{contact.name}</strong> ({contact.email}) — {contact.message}
              <br />
              <button onClick={() => handleEdit(contact)} style={{ marginRight: '5px' }}>Edit</button>
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
