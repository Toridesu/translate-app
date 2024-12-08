export interface Translation {
  text: string;
  pronunciation: string;
}

export interface TranslationData {
  [key: string]: {
    [key: string]: Translation;
  };
}

export interface SavedPhrase {
  id: string;
  japanese: string;
  category: string;
  timestamp: number;
}

export interface TranslationStore {
  savedPhrases: SavedPhrase[];
  categories: string[];
  activeLanguages: string[];
  addPhrase: (phrase: SavedPhrase) => void;
  removePhrase: (id: string) => void;
  addCategory: (category: string) => void;
  updateActiveLanguages: (languages: string[]) => void;
}

export const LANGUAGES = {
  EN: '英語',
  ES: 'スペイン語',
  FR: 'フランス語',
  KO: '韓国語',
  ZH: '中国語',
  JA: '日本語',
  IT: 'イタリア語',
  PT: 'ポルトガル語',
  RU: 'ロシア語',
  DE: 'ドイツ語',
} as const;

export type LanguageCode = keyof typeof LANGUAGES;
