import { useState } from 'react';
import { mockTranslate } from '@/lib/utils/mock-translation';
import { useToast } from '@/hooks/use-toast';

export const useTranslation = (targetLang: string) => {
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const translate = async (text: string) => {
    setIsTranslating(true);
    try {
      const result = await mockTranslate(text, targetLang);
      setTranslatedText(result.text);

      toast({
        title: '翻訳完了',
        description: '翻訳が正常に完了しました。',
      });
    } catch (error) {
      toast({
        title: 'エラー',
        description: '翻訳中にエラーが発生しました。',
        variant: 'destructive',
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const resetTranslation = () => {
    setTranslatedText('');
  };

  return {
    translatedText,
    isTranslating,
    translate,
    resetTranslation,
  };
};
