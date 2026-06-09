'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      style={{
        background: 'rgba(239,68,68,0.15)',
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#fca5a5',
        padding: '6px 16px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      onMouseOver={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.28)')}
      onMouseOut={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
    >
      Cerrar sesión
    </button>
  );
}