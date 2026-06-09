'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push('/signIn');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">Registro</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border rounded px-3 py-2 text-sm text-gray-800"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border rounded px-3 py-2 text-sm text-gray-800"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border rounded px-3 py-2 text-sm text-gray-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/signIn" className="text-blue-600 hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}