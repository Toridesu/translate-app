import { create } from 'zustand';

interface Translation {
  inputText: string;
  translatedText: string;
  timestamp: Date;
}

interface TranslationHistory {
  [key: string]: Translation[]; // 言語コードをキーとして使用
}

interface TranslationStore {
  history: TranslationHistory;
  addTranslation: (lang: string, input: string, translated: string) => void;
  getHistoryByLang: (lang: string) => Translation[];
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  history: {},

  addTranslation: (lang, input, translated) =>
    set((state) => {
      const langHistory = state.history[lang] || [];
      return {
        history: {
          ...state.history,
          [lang]: [
            {
              inputText: input,
              translatedText: translated,
              timestamp: new Date(),
            },
            ...langHistory,
          ].slice(0, 50), // 最新の100件のみを保持
        },
      };
    }),

  getHistoryByLang: (lang) => {
    return get().history[lang] || [];
  },
}));
