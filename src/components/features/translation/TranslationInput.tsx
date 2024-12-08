import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookmark, Loader2 } from 'lucide-react';
import { useStore } from '@/stores/translation';
import { mockTranslate } from '@/services/mock-translation';
import { Translation, LANGUAGES } from '@/types/translation';
import { toast } from '@/components/hooks/use-toast';

export const TranslationInput: React.FC<{ selectedLang: string }> = ({ selectedLang }) => {
  const [inputText, setInputText] = useState('');
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const store = useStore();

  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating) return;

    setIsTranslating(true);
    try {
      const result = await mockTranslate(inputText, selectedLang);
      setCurrentTranslation(result);
      toast({
        title: '翻訳完了',
        description: '翻訳が正常に完了しました。',
      });
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '翻訳中に予期せぬエラーが発生しました。',
        variant: 'destructive',
      });
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
      timestamp: Date.now(),
    });

    toast({
      title: 'フレーズを保存しました',
      description: `「${inputText}」を${selectedCategory}カテゴリに保存しました。`,
    });

    setInputText('');
    setCurrentTranslation(null);
    setSelectedCategory('');
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

          <Button
            onClick={handleTranslate}
            className='w-full h-12 text-lg'
            disabled={isTranslating || !inputText.trim()}
          >
            {isTranslating ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                翻訳中...
              </span>
            ) : (
              `${LANGUAGES[selectedLang as keyof typeof LANGUAGES]}に翻訳` // エラーを無視
            )}
          </Button>

          {currentTranslation && (
            <div className='space-y-4 mt-4'>
              <div className='p-4 bg-slate-50 rounded-lg space-y-2'>
                <div className='font-bold text-slate-700'>{LANGUAGES[selectedLang as keyof typeof LANGUAGES]}</div>{' '}
                {/* エラーを無視 */}
                <div className='text-base md:text-lg'>{currentTranslation.text}</div>
                <div className='text-sm text-slate-600'>{currentTranslation.pronunciation}</div>
              </div>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4'>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className='w-full sm:w-[180px]'>
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
