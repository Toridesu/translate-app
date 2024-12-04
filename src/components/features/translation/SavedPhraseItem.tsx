import React, { useState, useEffect } from 'react';
import { Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockTranslate } from '@/lib/utils/mock-translation';
import { Translation } from '@/lib/types/translation';

interface SavedPhraseItemProps {
  phrase: {
    id: string;
    japanese: string;
    timestamp: number;
  };
  targetLang: string;
  onRemove: () => void;
}

export const SavedPhraseItem: React.FC<SavedPhraseItemProps> = ({ phrase, targetLang, onRemove }) => {
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    mockTranslate(phrase.japanese, targetLang)
      .then(setTranslation)
      .finally(() => setIsLoading(false));
  }, [phrase.japanese, targetLang]);

  const handleTextToSpeech = () => {
    if (translation) {
      const utterance = new SpeechSynthesisUtterance(translation.text);
      utterance.lang = targetLang.toLowerCase();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start mb-2'>
        <div className='flex-1'>
          <div className='text-base font-medium'>{phrase.japanese}</div>
          <div className='text-sm text-slate-500'>{new Date(phrase.timestamp).toLocaleDateString()}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleTextToSpeech}
            className='h-8 w-8 p-0'
            disabled={isLoading || !translation}
          >
            <Volume2 className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='sm' onClick={onRemove} className='h-8 w-8 p-0 text-red-500 hover:text-red-600'>
            <X className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className='text-sm text-slate-500'>翻訳中...</div>
      ) : (
        translation && (
          <div className='space-y-1'>
            <div className='text-sm'>{translation.text}</div>
            <div className='text-xs text-slate-600'>{translation.pronunciation}</div>
          </div>
        )
      )}
    </div>
  );
};
