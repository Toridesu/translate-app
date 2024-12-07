import { create } from 'zustand';
import { TranslationStore } from '../types/translation';

const INITIAL_CATEGORIES = ['挨拶', '自己紹介', '日常会話', 'ビジネス', '旅行', 'その他'];
const INITIAL_LANGUAGES = ['EN', 'ES', 'FR'];

export const useStore = create<TranslationStore>((set) => ({
  savedPhrases: [],
  categories: INITIAL_CATEGORIES,
  activeLanguages: INITIAL_LANGUAGES,

  addPhrase: (phrase) =>
    set((state) => ({
      savedPhrases: [phrase, ...state.savedPhrases],
    })),

  removePhrase: (id) =>
    set((state) => ({
      savedPhrases: state.savedPhrases.filter((phrase) => phrase.id !== id),
    })),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  updateActiveLanguages: (languages) =>
    set({
      activeLanguages: languages,
    }),
}));
