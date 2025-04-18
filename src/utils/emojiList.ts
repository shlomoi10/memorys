// רשימת אימוג'ים קבועה, כל אימוג'י כולל שם עברי ותמונה (Twemoji)
export interface EmojiData {
  shortName: string; // אנגלית (למפתח)
  name: string; // שם עברי
  src: string; // קישור ל-SVG
}

export const emojiList: EmojiData[] = [
  { shortName: 'smile', name: 'חיוך', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f604.svg' },
  { shortName: 'heart', name: 'לב', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2764.svg' },
  { shortName: 'star', name: 'כוכב', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg' },
  { shortName: 'rocket', name: 'רקטה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg' },
  { shortName: 'unicorn', name: 'חד קרן', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f984.svg' },
  { shortName: 'fire', name: 'אש', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f525.svg' },
  { shortName: 'cat', name: 'חתול', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg' },
  { shortName: 'soccer', name: 'כדורגל', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26bd.svg' },
  { shortName: 'pizza', name: 'פיצה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f355.svg' },
  { shortName: 'alien', name: 'חייזר', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f47d.svg' },
  { shortName: 'dog', name: 'כלב', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' },
  { shortName: 'monkey', name: 'קוף', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f435.svg' },
  { shortName: 'sun', name: 'שמש', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg' },
  { shortName: 'moon', name: 'ירח', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f319.svg' },
  { shortName: 'car', name: 'מכונית', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg' },
  { shortName: 'bicycle', name: 'אופניים', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6b2.svg' },
  { shortName: 'apple', name: 'תפוח', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' },
  { shortName: 'banana', name: 'בננה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg' },
  { shortName: 'grapes', name: 'ענבים', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f347.svg' },
  { shortName: 'strawberry', name: 'תות', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f353.svg' },
  { shortName: 'watermelon', name: 'אבטיח', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f349.svg' },
  { shortName: 'cherry', name: 'דובדבן', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f352.svg' },
  { shortName: 'lemon', name: 'לימון', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34b.svg' },
  { shortName: 'pear', name: 'אגס', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f350.svg' },
  { shortName: 'carrot', name: 'גזר', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f955.svg' },
  { shortName: 'broccoli', name: 'ברוקולי', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f966.svg' },
  { shortName: 'cheese', name: 'גבינה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c0.svg' },
  { shortName: 'cake', name: 'עוגה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f370.svg' },
  { shortName: 'icecream', name: 'גלידה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f368.svg' },
  { shortName: 'gift', name: 'מתנה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f381.svg' },
  { shortName: 'balloon', name: 'בלון', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f388.svg' },
  { shortName: 'book', name: 'ספר', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg' },
  { shortName: 'pencil', name: 'עיפרון', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270f.svg' },
  { shortName: 'camera', name: 'מצלמה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f7.svg' },
  { shortName: 'music', name: 'מוזיקה', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3b5.svg' }
];
