・環境構築開始 2024/11/29 13:00
npm run dev

$ npx create-next-app@14
"next": "14.2.18",
"node": "v22.10.0",

## shadcn の追加

npx shadcn@latest add button

shadcn/ui
clsx
tailwind-merge
class-variance-authority
@radix-ui/react-slot

## 状態管理とデータフェッチ

zustand: シンプルな状態管理ライブラリ
@tanstack/react-query: サーバーデータの取得、キャッシュ、更新を管理
zod: TypeScript ファーストなバリデーションライブラリ

settings.jsonに記載でglobal.cssのエラーは解消
"files.associations": {
"\*.css": "tailwindcss"
}

・いったん環境構築は終わった。 2024/11/29 15:00
・UIはほぼ完成。

2024/12/04
npm install -D prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm run format
