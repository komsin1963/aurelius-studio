import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const checkAndAwardBadges = async (userId: string) => {
  try {
    // 1. ดึงข้อมูล Profile (เช็คเครดิต)
    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', userId).single();
    
    // 2. ดึงจำนวน E-book ที่ปลดล็อก
    const { count: ebookCount } = await supabase.from('unlocked_ebooks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    // 3. ดึง Badge ที่มีอยู่แล้วเพื่อไม่ให้แจกซ้ำ
    const { data: existing } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId);
    const ownedIds = existing?.map(b => b.badge_id) || [];

    const newBadges = [];

    // เงื่อนไขที่ 1: Pioneer (ได้ทุกคนที่เข้าใช้ระบบ)
    if (!ownedIds.includes('pioneer')) {
      newBadges.push({ user_id: userId, badge_id: 'pioneer' });
    }

    // เงื่อนไขที่ 2: Wealthy (เครดิต 1,000 ขึ้นไป)
    if (profile && profile.credits >= 1000 && !ownedIds.includes('wealthy')) {
      newBadges.push({ user_id: userId, badge_id: 'wealthy' });
    }

    // เงื่อนไขที่ 3: Bibliophile (ปลดล็อก E-book 3 เล่มขึ้นไป)
    if (ebookCount && ebookCount >= 3 && !ownedIds.includes('bibliophile')) {
      newBadges.push({ user_id: userId, badge_id: 'bibliophile' });
    }

    // ถ้ามี Badge ใหม่ ให้บันทึกลงฐานข้อมูล
    if (newBadges.length > 0) {
      await supabase.from('user_badges').insert(newBadges);
      return newBadges;
    }

    return [];
  } catch (err) {
    console.error('Badge System Error:', err);
    return [];
  }
};