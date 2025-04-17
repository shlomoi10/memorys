// רישום כל סוגי המשחקים במערכת
import { ClassicMemory } from './classic';
import { MinScoreMemory } from './minscore';
import { TripletMemory } from './triplet';
import { CategoriesMemory } from './categories';
import { ActionCardsMemory } from './actioncards';

export const memoryVariants = [
  {
    id: 'classic',
    name: 'זיכרון קלאסי',
    component: ClassicMemory
  },
  {
    id: 'minscore',
    name: 'מינימום ניקוד',
    component: MinScoreMemory
  },
  {
    id: 'triplet',
    name: 'השלישייה',
    component: TripletMemory
  },
  {
    id: 'categories',
    name: 'קטגוריות',
    component: CategoriesMemory
  },
  {
    id: 'actioncards',
    name: 'קלפי פעולה',
    component: ActionCardsMemory
  }
];
