import { Translate } from '@google-cloud/translate/build/src/v2';

class GoogleTranslationService {
  private translate: Translate;
  private static instance: GoogleTranslationService;

  private constructor() {
    this.translate = new Translate({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      },
    });
  }

  public static getInstance(): GoogleTranslationService {
    if (!GoogleTranslationService.instance) {
      GoogleTranslationService.instance = new GoogleTranslationService();
    }
    return GoogleTranslationService.instance;
  }

  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      const [translation] = await this.translate.translate(text, targetLang.toLowerCase());
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error(`Failed to translate text: ${error.message}`);
    }
  }
}

export const googleTranslate = GoogleTranslationService.getInstance();
