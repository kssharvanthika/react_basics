// src/pages/Contact.jsx
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://react-basics-1-5dag.onrender.com/contacts', form);
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Failed to send message');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" required />
      <button type="submit">Send</button>
      <Link to='/contact-list'>Contact List</Link>
    </form>
  );
}
