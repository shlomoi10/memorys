// EmojiHelper - סינון ואיסוף אימוג'ים מגוונים ללא חזירים/חזירי בר
import openmojiJson from '../assets/openmoji.json';

const forbiddenKeywords = [
  'pig', 'boar', 'hog', 'חזיר', 'wild boar', '猪', '🐗', '🐖'
];

export function getValidEmojis(count: number): string[] {
  const valid = openmojiJson.filter((e: any) => {
    const desc = (e.annotation || '').toLowerCase();
    return !forbiddenKeywords.some(k => desc.includes(k));
  });
  // Shuffle and pick
  for (let i = valid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valid[i], valid[j]] = [valid[j], valid[i]];
  }
  return valid.slice(0, count).map((e: any) => e.emoji);
}
