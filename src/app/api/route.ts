import { NextResponse } from 'next/server';
import { googleTranslate } from '@/services/google-translation';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const translatedText = await googleTranslate.translateText(text, targetLang);

    return NextResponse.json({
      text: translatedText,
      pronunciation: '', // Google APIは発音を提供しないため空文字を返す
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
