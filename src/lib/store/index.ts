import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Translation {
  id: string;
  inputText: string;
  translatedText: string;
  timestamp: Date;
  category?: string;
  isSaved: boolean;
}

interface TranslationState {
  // 言語関連
  activeLanguages: string[];
  sourceLanguage: string;
  targetLanguage: string;
  
  // カテゴリー関連
  categories: string[];
  
  // 翻訳データ関連
  savedPhrases: Translation[];
  history: Translation[];
  
  // アクション
  setLanguages: (source: string, target: string) => void;
  addTranslation: (translation: Translation) => void;
  savePhrase: (translationId: string) => void;
  removePhrase: (translationId: string) => void;
  addCategory: (category: string) => void;
  clearHistory: () => void;
}

export const useTranslationStore = create<TranslationState>()(
  persist(
    (set, get) => ({
      // 初期状態
      activeLanguages: ['EN', 'ES', 'FR'],
      sourceLanguage: 'JA',
      targetLanguage: 'EN',
      categories: ['挨拶', '自己紹介', '日常会話', 'ビジネス', '旅行', 'その他'],
      savedPhrases: [],
      history: [],

      // アクション
      setLanguages: (source, target) => set({ sourceLanguage: source, targetLanguage: target }),
      
      addTranslation: (translation) => set(state => ({
        history: [translation, ...state.history].slice(0, 50)
      })),
      
      savePhrase: (translationId) => set(state => {
        const translation = state.history.find(t => t.id === translationId);
        if (!translation) return state;
        
        return {
          savedPhrases: [...state.savedPhrases, { ...translation, isSaved: true }]
        };
      }),

      removePhrase: (translationId) => set(state => ({
        savedPhrases: state.savedPhrases.filter(phrase => phrase.id !== translationId)
      })),

      addCategory: (category) => set(state => ({
        categories: [...state.categories, category]
      })),

      clearHistory: () => set({ history: [] })
    }),
    {
      name: 'translation-store',
      partialize: (state) => ({
        savedPhrases: state.savedPhrases,
        categories: state.categories,
        activeLanguages: state.activeLanguages,
        sourceLanguage: state.sourceLanguage,
        targetLanguage: state.targetLanguage,
      }),
    }
  )
);