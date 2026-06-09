import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import LogoutButton from './components/LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import Provider from './components/SessionProvider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Auth App',
  description: 'My Next Auth App',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(15, 12, 41, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '0 24px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15
              }}>🔐</div>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>MyAuthApp</span>
            </Link>

            <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              
              <li>
                <Link href="/dashboard" style={{
                  textDecoration: 'none', color: 'rgba(255,255,255,0.7)',
                  fontSize: 14, padding: '6px 14px', borderRadius: 8,
                }}>
                  Dashboard
                </Link>
              </li>
              {session?.user && (
                <li>
                  <Link href="/profile" style={{
                    textDecoration: 'none', color: 'rgba(255,255,255,0.7)',
                    fontSize: 14, padding: '6px 14px', borderRadius: 8,
                  }}>
                    Perfil
                  </Link>
                </li>
              )}
              {session?.user?.image && (
                <li>
                  <Image
                    height={34} width={34}
                    src={session.user.image}
                    alt="Avatar"
                    style={{ borderRadius: '50%', border: '2px solid rgba(139,92,246,0.6)' }}
                  />
                </li>
              )}
              {session?.user && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}