'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) setError(result.error);
    else router.push('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '400px', padding: '40px 36px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '14px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 22
          }}>🔐</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Bienvenido</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Inicia sesión en tu cuenta</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleCredentialsSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <input
            className="glass-input"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="glass-input"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="divider">o continúa con</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn-social" onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
            <FaGoogle size={15} /> Continuar con Google
          </button>
          <button className="btn-social" onClick={() => signIn('github', { callbackUrl: '/dashboard' })}>
            <FaGithub size={15} /> Continuar con GitHub
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 24 }}>
          ¿No tienes cuenta?{' '}
          <Link href="/register" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 500 }}>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}