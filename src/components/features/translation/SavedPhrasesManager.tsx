import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useTranslationStore } from '@/lib/store';
import { SavedPhraseItem } from './SavedPhraseItem';

export const SavedPhrasesManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { savedPhrases, categories, removePhrase } = useTranslationStore();

  const filteredPhrases = savedPhrases.filter(
    (phrase) =>
      phrase.inputText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (phrase.category && phrase.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const phrasesByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = filteredPhrases.filter((p) => p.category === category);
      return acc;
    },
    {} as Record<string, typeof filteredPhrases>
  );

  return (
    <div className='space-y-4'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4' />
        <Input
          placeholder='フレーズを検索...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='pl-10'
        />
      </div>

      <Accordion type='multiple' className='space-y-2'>
        {categories.map((category) => {
          const categoryPhrases = phrasesByCategory[category] || [];
          if (categoryPhrases.length === 0) return null;

          return (
            <AccordionItem key={category} value={category} className='border rounded-lg overflow-hidden'>
              <AccordionTrigger className='px-4 py-2 hover:bg-slate-50'>
                <div className='flex items-center gap-2'>
                  <span>{category}</span>
                  <Badge variant='secondary'>{categoryPhrases.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className='space-y-2 p-2'>
                  {categoryPhrases.map((phrase) => (
                    <SavedPhraseItem key={phrase.id} phrase={phrase} onRemove={removePhrase} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {filteredPhrases.length === 0 && (
        <div className='text-center text-slate-500 py-4'>保存されたフレーズはありません</div>
      )}
    </div>
  );
};
