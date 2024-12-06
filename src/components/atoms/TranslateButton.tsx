import { Button } from '../ui/button';
import { LANGUAGES } from '@/lib/types/translation';

interface TranslateButtonProps {
  isTranslating: boolean;
  onClick: () => void;
  inputText: string;
  selectedLang: string;
}

export const TranslateButton: React.FC<TranslateButtonProps> = ({
  isTranslating,
  onClick,
  inputText,
  selectedLang,
}) => {
  return (
    <Button onClick={onClick} className='w-full h-12 text-lg' disabled={isTranslating || !inputText.trim()}>
      {isTranslating ? (
        <span className='flex items-center gap-2'>
          <span className='animate-spin'>⭕</span>
          翻訳中...
        </span>
      ) : (
        `${LANGUAGES[selectedLang]}に翻訳`
      )}
    </Button>
  );
};
