export interface Translation {
  id: string;
  inputText: string;
  translatedText: string;
  timestamp: Date;
  category?: string;
  isSaved: boolean;
}

export interface TranslationState {
  activeLanguages: string[];
  sourceLanguage: string;
  targetLanguage: string;
  categories: string[];
  savedPhrases: Translation[];
  history: Translation[];

  setLanguages: (source: string, target: string) => void;
  addTranslation: (translation: Translation) => void;
  savePhrase: (translationId: string) => void;
  removePhrase: (translationId: string) => void;
  addCategory: (category: string) => void;
  clearHistory: () => void;
}

export const LANGUAGES: { [key: string]: string } = {
  JA: '日本語',
  EN: '英語',
  ES: 'スペイン語',
  FR: 'フランス語',
  DE: 'ドイツ語',
  IT: 'イタリア語',
  PT: 'ポルトガル語',
  RU: 'ロシア語',
  KO: '韓国語',
  ZH: '中国語',
} as const;
