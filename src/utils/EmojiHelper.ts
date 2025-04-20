// Emoji Helper - בוחר אימוג'ים מגוונים (לא רק פרצופים, ללא חזירים)
// הסרתי את הייבוא של openmoji כי אינו בשימוש
import { emojiList } from './emojiList';

// מחזיר מערך של אובייקטי EmojiItem מלאים (כולל name)
export function getAvailableEmojis(count: number) {
  // בוחר אקראית מתוך emojiList את הכמות המבוקשת
  const shuffled = emojiList.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
