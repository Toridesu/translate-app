'use client';

import React, { useState } from 'react';
import { create } from 'zustand';
import { Bookmark, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// モック翻訳データ
const MOCK_TRANSLATIONS = {
  こんにちは: {
    EN: { text: 'Hello', pronunciation: 'Konnichiwa' },
    ES: { text: 'Hola', pronunciation: 'Konnichiwa' },
    FR: { text: 'Bonjour', pronunciation: 'Konnichiwa' },
    KO: { text: '안녕하세요', pronunciation: 'Konnichiwa' },
    ZH: { text: '你好', pronunciation: 'Konnichiwa' },
  },
  ありがとう: {
    EN: { text: 'Thank you', pronunciation: 'Arigatou' },
    ES: { text: 'Gracias', pronunciation: 'Arigatou' },
    FR: { text: 'Merci', pronunciation: 'Arigatou' },
    KO: { text: '감사합니다', pronunciation: 'Arigatou' },
    ZH: { text: '谢谢', pronunciation: 'Arigatou' },
  },
};

// モック翻訳関数
const mockTranslate = (text: string, targetLang: string) => {
  // モックデータにない場合は、ダミーの翻訳を返す
  if (!MOCK_TRANSLATIONS[text]) {
    return Promise.resolve({
      text: `[${targetLang}] ${text}`,
      pronunciation: `[読み方] ${text}`,
    });
  }
  return Promise.resolve(MOCK_TRANSLATIONS[text][targetLang]);
};

interface SavedPhrase {
  id: string;
  japanese: string;
  category: string;
}

interface TranslationStore {
  savedPhrases: SavedPhrase[];
  categories: string[];
  activeLanguages: string[];
  addPhrase: (phrase: SavedPhrase) => void;
  addCategory: (category: string) => void;
  updateActiveLanguages: (languages: string[]) => void;
}

const LANGUAGES = {
  EN: '英語',
  ES: 'スペイン語',
  FR: 'フランス語',
  KO: '韓国語',
  ZH: '中国語',
} as const;

const useStore = create<TranslationStore>((set) => ({
  savedPhrases: [],
  categories: ['挨拶', '自己紹介', '日常会話'],
  activeLanguages: ['EN', 'ES', 'FR', 'KO', 'ZH'],
  addPhrase: (phrase) =>
    set((state) => ({
      savedPhrases: [...state.savedPhrases, phrase],
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

const TranslationApp = () => {
  const [inputText, setInputText] = useState('');
  const [currentTranslation, setCurrentTranslation] = useState<{
    text: string;
    pronunciation: string;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isTranslating, setIsTranslating] = useState(false);

  const store = useStore();

  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating) return;

    setIsTranslating(true);
    try {
      // 遅延を追加してローディング状態を確認できるようにする
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await mockTranslate(inputText, selectedLang);
      setCurrentTranslation(result);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSavePhrase = () => {
    if (!inputText || !selectedCategory || !currentTranslation) return;

    store.addPhrase({
      id: Date.now().toString(),
      japanese: inputText,
      category: selectedCategory,
    });

    setInputText('');
    setCurrentTranslation(null);
    setSelectedCategory('');
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* 2カラムレイアウト */}
      <div className='flex h-screen'>
        {/* メイン翻訳エリア */}
        <div className='flex-1 p-6 overflow-y-auto'>
          <div className='max-w-2xl mx-auto space-y-6'>
            {/* 言語選択ボタン */}
            <div className='flex flex-wrap gap-2'>
              {store.activeLanguages.map((lang) => (
                <Button key={lang} onClick={() => setSelectedLang(lang)} variant={selectedLang === lang ? 'default' : 'outline'} className='w-24' disabled={isTranslating}>
                  {LANGUAGES[lang]}
                </Button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <Edit2 className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>表示する言語を選択</DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-wrap gap-2 p-4'>
                    {Object.entries(LANGUAGES).map(([code, name]) => (
                      <Button
                        key={code}
                        variant={store.activeLanguages.includes(code) ? 'default' : 'outline'}
                        onClick={() => {
                          const newLanguages = store.activeLanguages.includes(code) ? store.activeLanguages.filter((lang) => lang !== code) : [...store.activeLanguages, code];
                          store.updateActiveLanguages(newLanguages);
                        }}
                        className='w-32'
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* 入力エリア */}
            <Card className='bg-white shadow-lg'>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='翻訳したい日本語を入力してください' className='min-h-[100px] text-lg' disabled={isTranslating} />

                  <Button onClick={handleTranslate} className='w-full' disabled={isTranslating || !inputText.trim()}>
                    {isTranslating ? '翻訳中...' : `${LANGUAGES[selectedLang]}に翻訳`}
                  </Button>

                  {currentTranslation && (
                    <div className='space-y-4 mt-6'>
                      <div className='p-4 bg-slate-50 rounded-lg space-y-2'>
                        <div className='font-bold text-slate-700'>{LANGUAGES[selectedLang]}</div>
                        <div className='text-lg'>{currentTranslation.text}</div>
                        <div className='text-sm text-slate-600'>{currentTranslation.pronunciation}</div>
                      </div>

                      <div className='flex items-center gap-4'>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='カテゴリを選択' />
                          </SelectTrigger>
                          <SelectContent>
                            {store.categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleSavePhrase} disabled={!selectedCategory || isTranslating} className='flex items-center gap-2'>
                          <Bookmark className='w-4 h-4' />
                          保存
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* サイドバー: 保存フレーズ */}
        <div className='w-96 border-l bg-white overflow-y-auto'>
          <div className='p-4 border-b bg-slate-50'>
            <h2 className='text-xl font-bold text-slate-800'>保存したフレーズ（{LANGUAGES[selectedLang]}）</h2>
          </div>
          <div className='p-4'>
            <Accordion type='single' collapsible className='space-y-2'>
              {store.categories.map((category) => {
                const phrases = store.savedPhrases.filter((p) => p.category === category);
                if (phrases.length === 0) return null;

                return (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className='text-lg font-semibold text-slate-700 hover:bg-slate-50 rounded-lg px-4'>{category}</AccordionTrigger>
                    <AccordionContent>
                      <div className='space-y-4 p-2'>
                        {phrases.map((phrase) => (
                          <SavedPhraseItem key={phrase.id} phrase={phrase} targetLang={selectedLang} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

// SavedPhraseItemコンポーネントの更新
const SavedPhraseItem = ({ phrase, targetLang }) => {
  const [translation, setTranslation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    mockTranslate(phrase.japanese, targetLang)
      .then(setTranslation)
      .finally(() => setIsLoading(false));
  }, [phrase.japanese, targetLang]);

  return (
    <div className='rounded-lg border bg-white p-3 shadow-sm'>
      <div className='text-base mb-2 font-medium'>{phrase.japanese}</div>
      {isLoading ? (
        <div className='text-sm text-slate-500'>翻訳中...</div>
      ) : (
        <>
          <div className='text-sm'>{translation?.text}</div>
          <div className='text-xs text-slate-600 mt-1'>{translation?.pronunciation}</div>
        </>
      )}
    </div>
  );
};

export default TranslationApp;
