'use client';

import { useEffect, useState } from 'react';
import { Enquiry } from '@/types';
import { formatPhoneNumber } from '@/lib/utils';
import { markEnquiryRead, markAllRead } from '@/lib/queries/enquiries';
import { supabase } from '@/lib/supabase';
import { Check, CheckCheck } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setEnquiries(data);
    setLoading(false);
  }

  async function handleMarkRead(id: string) {
    // Optimistic update
    setEnquiries(prev =>
      prev.map(e => e.id === id ? { ...e, is_read: true } : e)
    );
    await markEnquiryRead(id);
  }

  async function handleMarkAllRead() {
    if (!confirm('Mark all enquiries as read?')) return;
    
    // Optimistic update
    setEnquiries(prev => prev.map(e => ({ ...e, is_read: true })));
    await markAllRead();
  }

  const unreadCount = enquiries.filter(e => !e.is_read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Enquiries</h1>
          {unreadCount > 0 && (
            <p className="text-sm uppercase tracking-[0.15em] text-[#BFA16A]">
              {unreadCount} unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="btn-outline flex items-center gap-2"
          >
            <CheckCheck size={18} strokeWidth={1.5} />
            Mark All Read
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 text-sm uppercase tracking-[0.15em] opacity-50">Loading...</div>
      ) : enquiries.length === 0 ? (
        <div className="bg-[#EDE8DC] p-16 text-center">
          <p className="opacity-60">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(enquiry => (
            <div
              key={enquiry.id}
              className="bg-[#EDE8DC] p-8 transition-opacity"
              style={{ opacity: enquiry.is_read ? 0.5 : 1 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="grid md:grid-cols-2 gap-6 flex-1">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#BFA16A] mb-2">Name</p>
                    <p className="text-lg">{enquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#BFA16A] mb-2">Phone</p>
                    <p className="text-lg">{formatPhoneNumber(enquiry.phone)}</p>
                  </div>
                  {enquiry.email && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#BFA16A] mb-2">Email</p>
                      <p className="text-lg">{enquiry.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#BFA16A] mb-2">Date</p>
                    <p className="text-lg">
                      {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                {!enquiry.is_read && (
                  <button
                    onClick={() => handleMarkRead(enquiry.id)}
                    className="btn-outline flex items-center gap-2 ml-4"
                    title="Mark as read"
                  >
                    <Check size={18} strokeWidth={1.5} />
                    Mark Read
                  </button>
                )}
              </div>
              
              {enquiry.message && (
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#BFA16A] mb-2">Message</p>
                  <p className="opacity-80 leading-relaxed">{enquiry.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
