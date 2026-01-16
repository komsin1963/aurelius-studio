import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const checkAndAwardBadges = async (userId: string) => {
  try {
    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', userId).single();
    const { count: ebookCount } = await supabase.from('unlocked_ebooks').select('*', { count: 'exact', head: true }).eq('user_id', userId);
    const { data: existing } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId);
    const ownedIds = existing?.map(b => b.badge_id) || [];

    const newBadges = [];
    if (!ownedIds.includes('pioneer')) newBadges.push({ user_id: userId, badge_id: 'pioneer' });
    if (profile && profile.credits >= 1000 && !ownedIds.includes('wealthy')) newBadges.push({ user_id: userId, badge_id: 'wealthy' });
    if (ebookCount && ebookCount >= 3 && !ownedIds.includes('bibliophile')) newBadges.push({ user_id: userId, badge_id: 'bibliophile' });

    if (newBadges.length > 0) {
      await supabase.from('user_badges').insert(newBadges);
      return newBadges;
    }
    return [];
  } catch (err) { return []; }
};