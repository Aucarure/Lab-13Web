import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const initials = session?.user?.name
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '?';

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>

      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Mi Perfil</h1>

      <div className="glass" style={{ padding: '36px', textAlign: 'center', marginBottom: 20 }}>
        {session?.user?.image ? (
          <Image
            src={session.user.image} alt="Avatar"
            width={90} height={90}
            style={{ borderRadius: '50%', border: '3px solid rgba(139,92,246,0.55)', margin: '0 auto 16px' }}
          />
        ) : (
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, fontWeight: 700, color: '#fff',
            margin: '0 auto 16px'
          }}>{initials}</div>
        )}
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{session?.user?.name}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{session?.user?.email}</p>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Detalles de cuenta
        </h3>
        {[
          { label: 'Nombre completo', value: session?.user?.name ?? '—' },
          { label: 'Correo electrónico', value: session?.user?.email ?? '—' },
          { label: 'Estado de cuenta', value: '✅ Verificado' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0',
            borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none'
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
}