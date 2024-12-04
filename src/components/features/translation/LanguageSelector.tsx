import React from 'react';
import { Globe2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store/translation';
import { LANGUAGES } from '@/lib/types/translation';

interface LanguageSelectorProps {
  selectedLang: string;
  onLanguageSelect: (lang: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLang, onLanguageSelect }) => {
  const { activeLanguages, updateActiveLanguages } = useStore();

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
          <Globe2 className='h-5 w-5' />
          言語選択
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm'>
              言語を管理
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[90vw] max-w-lg'>
            <DialogHeader>
              <DialogTitle>表示する言語を選択</DialogTitle>
            </DialogHeader>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 p-4'>
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <Button
                  key={code}
                  variant={activeLanguages.includes(code) ? 'default' : 'outline'}
                  onClick={() => {
                    const newLanguages = activeLanguages.includes(code)
                      ? activeLanguages.filter((lang) => lang !== code)
                      : [...activeLanguages, code];
                    updateActiveLanguages(newLanguages);
                  }}
                  className='w-full justify-start gap-2'
                >
                  {name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='flex flex-wrap justify-center gap-2'>
        {activeLanguages.map((lang) => (
          <Button
            key={lang}
            onClick={() => onLanguageSelect(lang)}
            variant={selectedLang === lang ? 'default' : 'outline'}
            className='flex justify-center min-w-[100px] max-w-[100px]'
          >
            {LANGUAGES[lang]}
          </Button>
        ))}
      </div>
    </div>
  );
};
