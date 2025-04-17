// Emoji Helper - בוחר אימוג'ים מגוונים (לא רק פרצופים, ללא חזירים)
import openmoji from '../assets/openmoji.json';

export function getAvailableEmojis(count: number): string[] {
  // סינון אימוג'ים: לא פרצופים בלבד, ללא חזירים/חזירי בר
  const forbidden = ['pig', 'boar'];
  const filtered = (openmoji as {emoji: string; annotation: string}[]).filter((e) =>
    !forbidden.some(f => e.annotation.includes(f))
  );
  // ערבוב ובחירה
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(e => e.emoji);
}
