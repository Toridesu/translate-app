import React from 'react';
import { Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Translation } from '@/lib/types/translation';
import { useTranslationStore } from '@/lib/store';
import { useTextToSpeech } from '@/hooks/use-text-to-speech'; // 新しいカスタムフック

interface SavedPhraseItemProps {
  phrase: Translation;
  onRemove: (id: string) => void;
}

export const SavedPhraseItem: React.FC<SavedPhraseItemProps> = ({ phrase, onRemove }) => {
  const { targetLanguage } = useTranslationStore();
  const { speak, isSpeaking } = useTextToSpeech();

  const handleTextToSpeech = () => {
    speak(phrase.translatedText, targetLanguage.toLowerCase());
  };

  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start mb-2'>
        <div className='flex-1'>
          <div className='text-base font-medium'>{phrase.inputText}</div>
          <div className='text-sm text-slate-500'>{new Date(phrase.timestamp).toLocaleDateString()}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' onClick={handleTextToSpeech} className='h-8 w-8 p-0' disabled={isSpeaking}>
            <Volume2 className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onRemove(phrase.id)}
            className='h-8 w-8 p-0 text-red-500 hover:text-red-600'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-sm'>{phrase.translatedText}</div>
        {phrase.category && <div className='text-xs text-slate-600'>カテゴリー: {phrase.category}</div>}
      </div>
    </div>
  );
};
