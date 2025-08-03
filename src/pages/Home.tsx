import React, { useState } from 'react';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Welcome, ${formData.name}!\nWe'll reach you at: ${formData.email}`);
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>Welcome to Mimeus AI</h1>
      <p style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '2rem', opacity: 0.8 }}>
        Enter your details to begin your journey with your digital companion.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Your Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            required
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
          />
        </label>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Home;