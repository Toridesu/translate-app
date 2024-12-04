'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { TranslationInput } from '@/components/features/translation/TranslationInput';
import { LanguageSelector } from '@/components/features/translation/LanguageSelector';
import { SavedPhrasesManager } from '@/components/features/translation/SavedPhrasesManager';

export default function TranslationApp() {
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='flex flex-col md:flex-row h-screen'>
        {/* メイン翻訳エリア */}
        <div className='flex-1 p-4 md:p-6 overflow-y-auto'>
          <div className='max-w-2xl mx-auto space-y-6'>
            <LanguageSelector selectedLang={selectedLang} onLanguageSelect={setSelectedLang} />
            <TranslationInput selectedLang={selectedLang} />
          </div>
        </div>

        {/* サイドバー（デスクトップ） */}
        <div className='hidden md:block w-96 border-l bg-white overflow-y-auto'>
          <div className='p-4 border-b bg-slate-50'>
            <h2 className='text-xl font-bold text-slate-800'>保存したフレーズ</h2>
          </div>
          <div className='p-4'>
            <SavedPhrasesManager selectedLang={selectedLang} />
          </div>
        </div>

        {/* モバイル用サイドバー */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg'
            >
              <Menu className='h-4 w-4' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-full sm:w-[400px] p-0'>
            <SheetHeader className='p-4 border-b bg-slate-50'>
              <SheetTitle>保存したフレーズ</SheetTitle>
            </SheetHeader>
            <div className='overflow-y-auto h-full p-4'>
              <SavedPhrasesManager selectedLang={selectedLang} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
