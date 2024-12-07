import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store/translation';
import { SavedPhraseItem } from './SavedPhraseItem';

interface SavedPhrasesManagerProps {
  selectedLang: string;
}

export const SavedPhrasesManager: React.FC<SavedPhrasesManagerProps> = ({ selectedLang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { savedPhrases, categories, removePhrase } = useStore();

  const filteredPhrases = savedPhrases.filter(
    (phrase) =>
      phrase.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          const categoryPhrases = filteredPhrases.filter((p) => p.category === category);
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
                    <SavedPhraseItem
                      key={phrase.id}
                      phrase={phrase}
                      targetLang={selectedLang}
                      onRemove={() => removePhrase(phrase.id)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
