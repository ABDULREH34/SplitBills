"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/Backend/Password/ForgetPassword', { email });

      if (response.status === 200) {
        router.push('/api/Frontend/User/Password/Verify'); 
      } else {
        setError('Email does not exist.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center', width: '300px' }}>
        <h1>Email Verification</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Verifying...' : 'Submit'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}
