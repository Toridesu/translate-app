import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookmark } from 'lucide-react';
import { useTranslationStore } from '@/lib/store';
import { useTranslation } from '@/hooks/use-translation'; // 新しいカスタムフック
import { LANGUAGES } from '@/lib/types/translation';
import { TranslateButton } from '@/components/atoms/TranslateButton';
import { useToast } from '@/hooks/use-toast';

export const TranslationInput: React.FC<{ selectedLang: string }> = ({ selectedLang }) => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { toast } = useToast();

  const { translatedText, isTranslating, translate, resetTranslation } = useTranslation(selectedLang);

  const { categories, addTranslation, savePhrase } = useTranslationStore();

  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating) return;
    await translate(inputText);
  };

  const handleSavePhrase = () => {
    if (!inputText || !selectedCategory || !translatedText) return;

    const translationId = uuidv4();
    const translation = {
      id: translationId,
      inputText,
      translatedText,
      timestamp: new Date(),
      category: selectedCategory,
      isSaved: true,
    };

    addTranslation(translation);
    savePhrase(translationId);

    toast({
      title: 'フレーズを保存しました',
      description: `「${inputText}」を${selectedCategory}カテゴリに保存しました。`,
    });

    setInputText('');
    setSelectedCategory('');
    resetTranslation();
  };

  return (
    <Card className='bg-white shadow-lg'>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='翻訳したい日本語を入力してください'
            className='min-h-[120px] text-lg resize-none'
            disabled={isTranslating}
          />

          <TranslateButton
            isTranslating={isTranslating}
            onClick={handleTranslate}
            inputText={inputText}
            selectedLang={selectedLang}
          />

          {translatedText && (
            <div className='space-y-4 mt-4'>
              <div className='p-4 bg-slate-50 rounded-lg space-y-2'>
                <div className='font-bold text-slate-700'>{LANGUAGES[selectedLang]}</div>
                <div className='text-base md:text-lg'>{translatedText}</div>
              </div>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4'>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className='w-full sm:w-[180px]'>
                    <SelectValue placeholder='カテゴリを選択' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSavePhrase}
                  disabled={!selectedCategory || isTranslating}
                  className='flex items-center gap-2'
                >
                  <Bookmark className='w-4 h-4' />
                  保存
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
