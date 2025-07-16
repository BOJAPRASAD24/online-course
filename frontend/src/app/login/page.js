'use client'

import { useRouter } from 'next/router';
import { useState } from 'react';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (

    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
      
    </div>

  );
}
