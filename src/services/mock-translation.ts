import { Translation, TranslationData } from '../types/translation';

const MOCK_TRANSLATIONS: TranslationData = {
  こんにちは: {
    EN: { text: 'Hello', pronunciation: 'həˈloʊ' },
    ES: { text: 'Hola', pronunciation: 'oʊˈlɑː' },
    FR: { text: 'Bonjour', pronunciation: 'bɔ̃ˈʒuʁ' },
    KO: { text: '안녕하세요', pronunciation: 'annyeonghaseyo' },
    ZH: { text: '你好', pronunciation: 'nǐ hǎo' },
    JA: { text: 'こんにちは', pronunciation: 'Konnichiwa' },
    IT: { text: 'Ciao', pronunciation: 'tʃaʊ' },
    PT: { text: 'Olá', pronunciation: 'oˈla' },
    RU: { text: 'Привет', pronunciation: 'privet' },
    DE: { text: 'Hallo', pronunciation: 'haˈloː' },
  },
  ありがとう: {
    EN: { text: 'Thank you', pronunciation: 'θæŋk juː' },
    ES: { text: 'Gracias', pronunciation: 'ˈgɾasjas' },
    FR: { text: 'Merci', pronunciation: 'mɛʁsi' },
    KO: { text: '감사합니다', pronunciation: 'gamsahamnida' },
    ZH: { text: '谢谢', pronunciation: 'xièxie' },
    JA: { text: 'ありがとう', pronunciation: 'Arigatou' },
    IT: { text: 'Grazie', pronunciation: 'ˈgratsje' },
    PT: { text: 'Obrigado', pronunciation: 'oβɾiˈɣaðu' },
    RU: { text: 'Спасибо', pronunciation: 'spasibo' },
    DE: { text: 'Danke', pronunciation: 'ˈdaŋkə' },
  },
};

export const mockTranslate = async (text: string, targetLang: string): Promise<Translation> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

  if (!MOCK_TRANSLATIONS[text]) {
    return {
      text: `[${targetLang}] ${text}`,
      pronunciation: `[Pronunciation of ${text}]`,
    };
  }

  return MOCK_TRANSLATIONS[text][targetLang];
};
