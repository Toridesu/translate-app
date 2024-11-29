"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslationStore } from '@/lib/zustand/translationStore';
import { ScrollArea } from "@/components/ui/scroll-area";

const TranslationApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('EN');
  
  const { addTranslation, getHistoryByLang } = useTranslationStore();
  const history = getHistoryByLang(targetLang);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    // 実際のAPIが実装されるまでのモック
    const mockTranslated = `Translated: ${inputText} (to ${targetLang})`;
    setTranslatedText(mockTranslated);
    
    // 履歴に追加
    addTranslation(targetLang, inputText, mockTranslated);
  };

  const handleLanguageChange = (newLang: string) => {
    setTargetLang(newLang);
    setTranslatedText(''); // 言語変更時に翻訳テキストをクリア
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Translation Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input Text:</label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={targetLang}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="JA">Japanese</SelectItem>
                    <SelectItem value="ES">Spanish</SelectItem>
                    <SelectItem value="FR">French</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={handleTranslate}
                  className="flex-1"
                >
                  Translate
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Translation:</label>
                <div className="p-4 bg-gray-50 rounded-md min-h-[100px]">
                  {translatedText || 'Translation will appear here...'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                History ({targetLang})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                        <div className="font-medium">
                          {item.inputText}
                        </div>
                        <div className="text-gray-600 bg-gray-50 p-2 rounded">
                          {item.translatedText}
                        </div>
                      </div>
                    </Card>
                  ))}
                  {history.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      No translation history for this language
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranslationApp;