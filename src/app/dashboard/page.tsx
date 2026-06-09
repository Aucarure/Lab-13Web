import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const initials = session?.user?.name
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '?';

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

      <div className="glass" style={{ padding: '32px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        {session?.user?.image ? (
          <Image
            src={session.user.image} alt="Avatar"
            width={64} height={64}
            style={{ borderRadius: '50%', border: '3px solid rgba(139,92,246,0.5)' }}
          />
        ) : (
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0
          }}>{initials}</div>
        )}
        <div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Bienvenido de vuelta</p>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>{session?.user?.name ?? 'Usuario'} 👋</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{session?.user?.email}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { icon: '🛡️', label: 'Estado', value: 'Activo' },
          { icon: '🔑', label: 'Proveedor', value: session?.user?.email?.includes('github') ? 'GitHub' : 'Google/Email' },
          { icon: '📅', label: 'Sesión', value: 'Vigente' },
        ].map(card => (
          <div key={card.label} className="glass-card" style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{card.icon}</div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>{card.label}</p>
            <p style={{ fontSize: 18, fontWeight: 600 }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'rgba(255,255,255,0.9)' }}>
          Información de sesión
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Nombre', value: session?.user?.name },
            { label: 'Email', value: session?.user?.email },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}