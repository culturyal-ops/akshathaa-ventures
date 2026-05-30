'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Home, MessageSquare, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    availableProperties: 0,
    featuredProperties: 0,
    totalEnquiries: 0,
    recentEnquiries: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { count: totalProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true });

    const { count: availableProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'available');

    const { count: featuredProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'featured');

    const { count: totalEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { count: recentEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    setStats({
      totalProperties: totalProperties || 0,
      availableProperties: availableProperties || 0,
      featuredProperties: featuredProperties || 0,
      totalEnquiries: totalEnquiries || 0,
      recentEnquiries: recentEnquiries || 0
    });
  }

  return (
    <div>
      <h1 className="text-5xl mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#EDE8DC] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Total Properties</h3>
            <Home className="text-[#BFA16A]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-5xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stats.totalProperties}</p>
          <p className="text-sm opacity-60">
            {stats.availableProperties} available, {stats.featuredProperties} featured
          </p>
        </div>

        <div className="bg-[#EDE8DC] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Total Enquiries</h3>
            <MessageSquare className="text-[#BFA16A]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-5xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stats.totalEnquiries}</p>
          <p className="text-sm opacity-60">All time enquiries</p>
        </div>

        <div className="bg-[#EDE8DC] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Recent Enquiries</h3>
            <TrendingUp className="text-[#BFA16A]" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-5xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stats.recentEnquiries}</p>
          <p className="text-sm opacity-60">Last 7 days</p>
        </div>
      </div>

      <div className="bg-[#EDE8DC] p-8">
        <h2 className="text-2xl mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/admin/properties/new" className="btn-outline">
            Add New Property
          </a>
          <a href="/admin/enquiries" className="btn-outline">
            View Enquiries
          </a>
        </div>
      </div>
    </div>
  );
}
