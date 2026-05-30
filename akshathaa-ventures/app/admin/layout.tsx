'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { LayoutDashboard, Home, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm uppercase tracking-[0.15em] opacity-50">Loading...</div>;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#12100C] text-[#F5F0E8] min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Admin Panel</h2>
            <nav className="space-y-2">
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-4 py-3 transition text-sm uppercase tracking-[0.15em] ${
                  pathname === '/admin' ? 'text-[#BFA16A]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <LayoutDashboard size={18} strokeWidth={1.5} />
                Dashboard
              </Link>
              <Link
                href="/admin/properties"
                className={`flex items-center gap-3 px-4 py-3 transition text-sm uppercase tracking-[0.15em] ${
                  pathname.startsWith('/admin/properties') ? 'text-[#BFA16A]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Home size={18} strokeWidth={1.5} />
                Properties
              </Link>
              <Link
                href="/admin/enquiries"
                className={`flex items-center gap-3 px-4 py-3 transition text-sm uppercase tracking-[0.15em] ${
                  pathname === '/admin/enquiries' ? 'text-[#BFA16A]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <MessageSquare size={18} strokeWidth={1.5} />
                Enquiries
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 transition w-full text-left text-sm uppercase tracking-[0.15em] opacity-70 hover:opacity-100 mt-8"
              >
                <LogOut size={18} strokeWidth={1.5} />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
