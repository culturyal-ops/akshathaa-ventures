import { supabase } from '@/lib/supabase';

export const markEnquiryRead = async (id: string) => {
  const { error } = await supabase
    .from('enquiries')
    .update({ is_read: true })
    .eq('id', id);
  if (error) throw error;
};

export const markAllRead = async () => {
  const { error } = await supabase
    .from('enquiries')
    .update({ is_read: true })
    .eq('is_read', false);
  if (error) throw error;
};
