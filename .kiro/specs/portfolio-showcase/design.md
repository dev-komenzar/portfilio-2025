# 設計書

## 概要

SvelteKit + TypeScript + Paraglide.js を使用した静的サイト生成によるポートフォリオサイトです。作品集とプロジェクトのショーケースを中心とし、レスポンシブデザインと多言語対応を実現します。

## アーキテクチャ

### 技術スタック
- **フレームワーク**: SvelteKit 2.x + Svelte 5.x
- **言語**: TypeScript
- **国際化**: Paraglide.js (@inlang/paraglide-js)
- **デプロイ**: 静的サイト生成 (@sveltejs/adapter-static)
- **スタイリング**: CSS + CSS Variables（ダークモード対応）
- **ビルドツール**: Vite

### アーキテクチャパターン
- **ページベースルーティング**: SvelteKitの標準ルーティング
- **コンポーネント指向**: 再利用可能なUIコンポーネント
- **Svelteベースデータ管理**: プロジェクトデータをSvelteコンポーネントで管理
- **レスポンシブファーストデザイン**: モバイルファーストアプローチ

## コンポーネントとインターフェース

### ページ構造
```
src/routes/
├── +layout.svelte          # 共通レイアウト
├── +layout.ts              # レイアウトデータ
├── +page.svelte            # ホームページ（メインポートフォリオ）
└── projects/
    ├── +page.svelte        # プロジェクト一覧ページ
    └── [slug]/
        └── +page.svelte    # プロジェクト詳細ページ
```

### 主要コンポーネント

#### 1. レイアウトコンポーネント
- `Header.svelte`: ナビゲーション + 言語切り替え
- `Footer.svelte`: フッター情報
- `Navigation.svelte`: スクロール連動ナビゲーション
  - スクロール位置に応じて現在のセクションを強調表示
  - スムーズスクロール機能
  - セクション間の自動ハイライト切り替え

#### 2. セクションコンポーネント
- `HeroSection.svelte`: ヒーローセクション
- `ProjectsSection.svelte`: プロジェクト一覧セクション
- `SkillsSection.svelte`: スキル紹介セクション

#### 3. UIコンポーネント
- `ProjectCard.svelte`: プロジェクトカード
- `SkillCard.svelte`: スキルカード
- `Modal.svelte`: モーダルダイアログ
- `Button.svelte`: 再利用可能ボタン
- `LanguageSwitcher.svelte`: 言語切り替えボタン

#### 4. ユーティリティコンポーネント
- `SEO.svelte`: メタタグ管理
- `LoadingSpinner.svelte`: ローディング表示
- `ImageOptimized.svelte`: 最適化された画像表示

## データモデル

### プロジェクトデータ構造
```typescript
// src/lib/types/project.ts
export interface ProjectMetadata {
  id: string;
  title: Record<'ja' | 'en', string>;
  description: Record<'ja' | 'en', string>;
  shortDescription: Record<'ja' | 'en', string>;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'other';
  status: 'completed' | 'in-progress' | 'archived';
  startDate: string;
  endDate?: string;
  images: {
    thumbnail: string; // Viteが処理した画像パス
    gallery: string[];
  };
  links: {
    demo?: string;
    github?: string;
    website?: string;
  };
  featured: boolean;
  order: number;
}

// Svelteコンポーネントの型定義
declare module '*.svelte' {
  import type { SvelteComponent } from 'svelte';
  import type { ProjectMetadata } from '$lib/types/project';
  
  // Svelteコンポーネントにmetadataプロパティを追加
  export default class extends SvelteComponent {
    metadata: ProjectMetadata;
  }
}
```

### スキルデータ構造
```typescript
interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other';
  level: 1 | 2 | 3 | 4 | 5; // 1: 初級, 5: エキスパート
  experience: string; // "2年" など
  icon?: string;
  description?: Record<'ja' | 'en', string>;
}

interface SkillCategory {
  id: string;
  name: Record<'ja' | 'en', string>;
  skills: Skill[];
  order: number;
}
```



## データ管理

### Svelteベースプロジェクトデータ
```
src/lib/projects/
├── ProjectEcommerce.svelte     # ECサイトプロジェクト
├── ProjectPortfolio.svelte     # ポートフォリオプロジェクト
├── ProjectMobile.svelte        # モバイルアプリプロジェクト
└── index.ts                    # プロジェクト一覧エクスポート
```

### プロジェクトファイル構造例
```svelte
<!-- src/lib/projects/ProjectEcommerce.svelte -->
<script lang="ts">
  import heroImage from '$lib/assets/projects/ecommerce-hero.webp';
  import gallery1 from '$lib/assets/projects/ecommerce-1.webp';
  import gallery2 from '$lib/assets/projects/ecommerce-2.webp';
  
  export const metadata = {
    id: 'ecommerce-site',
    title: { ja: 'ECサイト構築', en: 'E-commerce Site' },
    shortDescription: { 
      ja: 'モダンなECサイトの構築', 
      en: 'Modern e-commerce website development' 
    },
    technologies: ['SvelteKit', 'Stripe', 'Supabase'],
    images: {
      thumbnail: heroImage,
      gallery: [gallery1, gallery2]
    },
    links: {
      demo: 'https://demo.example.com',
      github: 'https://github.com/user/project'
    },
    featured: true,
    order: 1
  };
</script>

<div class="project-content">
  <img src={heroImage} alt="ECサイトのメイン画像" />
  <p>プロジェクトの詳細説明...</p>
</div>
```

### 静的データファイル
```
src/lib/data/
├── skills.json            # スキルデータ
└── profile.json           # プロフィール情報
```

### データアクセス層
```typescript
// src/lib/projects/index.ts
import ProjectEcommerce from './ProjectEcommerce.svelte';
import ProjectPortfolio from './ProjectPortfolio.svelte';
import ProjectMobile from './ProjectMobile.svelte';

const projectComponents = [
  ProjectEcommerce,
  ProjectPortfolio,
  ProjectMobile
];

export const getProjects = () => {
  return projectComponents.map(component => component.metadata);
};

export const getFeaturedProjects = () => {
  return getProjects().filter(project => project.featured);
};

export const getProjectBySlug = (slug: string) => {
  return getProjects().find(project => project.id === slug) || null;
};

export const getProjectComponent = (slug: string) => {
  const index = getProjects().findIndex(project => project.id === slug);
  return index !== -1 ? projectComponents[index] : null;
};
```

### Svelteベースデータ管理の利点
- **画像の直接インポート**: Viteによる自動最適化
- **型安全性**: TypeScriptによる完全な型チェック
- **コンポーネント化**: プロジェクト詳細のリッチなコンテンツ
- **ホットリロード**: 開発時の即座な反映
- **バンドル最適化**: 未使用画像の自動除外

## スタイリング設計

### デザインコンセプト
参考サイト（sameerasw.com, tonkotsu.ai）を基にした現代的なポートフォリオデザイン：
- **ミニマリズム**: 洗練されたシンプルなレイアウト
- **ダークファースト**: ダークテーマを主体とした設計
- **インタラクティブ**: ホバーエフェクトとスムーズなアニメーション
- **モダンタイポグラフィ**: 大胆で読みやすいフォント使用

### CSS設計方針
- **CSS Variables**: テーマとカラーパレット管理
- **BEM記法**: クラス命名規則
- **モバイルファースト**: レスポンシブデザイン
- **ダークモード対応**: ダークテーマ優先 + ライトモード切り替え
- **アニメーション**: CSS TransitionsとKeyframes活用

### カラーパレット
```css
:root {
  /* Dark theme (primary) */
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-surface-elevated: #2a2a2a;
  --color-text: #ffffff;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  --color-border: #27272a;
  
  /* Light theme */
  --color-primary-light: #4f46e5;
  --color-secondary-light: #7c3aed;
  --color-accent-light: #0891b2;
  --color-background-light: #ffffff;
  --color-surface-light: #f8fafc;
  --color-surface-elevated-light: #f1f5f9;
  --color-text-light: #0f172a;
  --color-text-secondary-light: #475569;
  --color-text-muted-light: #64748b;
  --color-border-light: #e2e8f0;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-accent: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  --gradient-surface: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}
```

### タイポグラフィ
```css
:root {
  /* Font families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
}
```

### アニメーション設計
```css
:root {
  /* Transitions */
  --transition-fast: 0.15s ease-out;
  --transition-base: 0.3s ease-out;
  --transition-slow: 0.5s ease-out;
  
  /* Easing functions */
  --ease-in-out-cubic: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
}
```

### レスポンシブブレークポイント
```css
/* Mobile: 320px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px - 1439px */
/* Large Desktop: 1440px+ */
```

## 国際化設計

### ルーティング戦略
Paraglide.jsが自動的にルーティングを処理：
- **日本語（標準）**: `/` - ルートパス（baseLocale）
- **英語**: `/en` - 言語コードプレフィックス
- **その他言語**: `/{lang}` - 言語コードプレフィックス

### URL構造例
```
日本語（標準）:
/ (ホーム)
/projects (プロジェクト一覧)
/projects/project-slug (プロジェクト詳細)

英語:
/en (ホーム)
/en/projects (プロジェクト一覧)
/en/projects/project-slug (プロジェクト詳細)
```

### Paraglide.js設定
- `baseLocale: "ja"` - 日本語を標準言語として設定
- 自動言語検出とリダイレクト
- 言語切り替え時のURL変換処理

### メッセージキー構造
```json
{
  "nav": {
    "home": "ホーム",
    "projects": "プロジェクト",
    "skills": "スキル"
  },
  "hero": {
    "title": "フロントエンド開発者",
    "subtitle": "美しく機能的なWebアプリケーションを作成します"
  },
  "projects": {
    "title": "プロジェクト",
    "viewAll": "すべて見る",
    "viewDemo": "デモを見る",
    "viewCode": "コードを見る"
  },
  "skills": {
    "title": "スキル",
    "experience": "{years}年の経験"
  }
}
```

## エラーハンドリング

### エラー処理戦略
1. **404エラー**: カスタム404ページ
2. **画像読み込みエラー**: フォールバック画像表示
3. **フォーム送信エラー**: ユーザーフレンドリーなエラーメッセージ
4. **データ読み込みエラー**: グレースフルデグラデーション

### エラーページ
```
src/routes/
├── +error.svelte           # 汎用エラーページ
└── 404.svelte             # 404専用ページ
```

## パフォーマンス最適化

### 画像最適化
- WebP形式の使用
- レスポンシブ画像（srcset）
- 遅延読み込み（lazy loading）
- 画像圧縮

### コード分割
- ページレベルでの自動コード分割
- 動的インポートによるコンポーネント分割
- 重要でないCSSの遅延読み込み

### SEO最適化
- メタタグの動的生成
- 構造化データ（JSON-LD）
- サイトマップ生成
- robots.txt

## デプロイメント設計

### Coolifyホスティング対応
- **Dockerfile**: 静的サイト用のマルチステージビルド
- **Nginx**: 静的ファイル配信とルーティング設定
- **Docker最適化**: レイヤーキャッシュとイメージサイズ最適化

### Dockerfile仕様
- **ベースイメージ**: node:22-alpine（最新安定版）
- **マルチステージビルド**: ビルドステージと実行ステージの分離
- **キャッシュ最適化**: 依存関係のレイヤーキャッシュ
- **ビルドプロセス**: SvelteKitのビルドベストプラクティスに準拠
- **実行環境**: 軽量なnginx:alpineイメージ
- **セキュリティ**: 非rootユーザーでの実行
- **設定**: SPA対応のNginx設定

### Nginx設定
- SPA用のフォールバック設定
- 静的アセットのキャッシュ設定
- Gzip圧縮の有効化
- セキュリティヘッダーの設定

## テスト戦略

### テスト種別
1. **単体テスト**: コンポーネントとユーティリティ関数
2. **統合テスト**: ページレベルの機能テスト
3. **E2Eテスト**: 主要ユーザーフローのテスト
4. **アクセシビリティテスト**: WCAG準拠チェック

### テストツール
- **単体テスト**: Bun Test + @testing-library/svelte
- **E2Eテスト**: Playwright
- **アクセシビリティ**: axe-core
- **テストランナー**: Bunの内蔵テストランナー使用

## 開発ワークフロー

### ESLint設定（SvelteKitベストプラクティス）
- **Flat Config**: eslint.config.js使用
- **プラグイン構成**:
  - `@eslint/js`: 基本JavaScript規則
  - `eslint-plugin-svelte`: Svelte専用規則
  - `typescript-eslint`: TypeScript統合
  - `@eslint/compat`: 互換性サポート
- **Svelte 5対応**: 最新Svelte構文サポート
- **TypeScript統合**: .svelte内TypeScript完全サポート
- **フォーマット規則**: ESLintでコードスタイルも管理

### Git フック設定
- **Husky**: Git フック管理
- **lint-staged**: ステージされたファイルのみ処理
- **プレコミットフック**: 
  - ESLint実行（自動修正）
  - TypeScript型チェック
  - Svelte Check実行

### 品質管理スクリプト
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "type-check": "svelte-check --tsconfig ./tsconfig.json",
    "check:all": "npm run lint && npm run type-check"
  }
}
```

### ESLint設定例
```javascript
// eslint.config.js
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import typescript from 'typescript-eslint';
import globals from 'globals';

export default typescript.config(
  js.configs.recommended,
  ...typescript.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: typescript.parser
      }
    }
  }
);
```

## セキュリティ考慮事項

### 静的サイトセキュリティ
- CSP（Content Security Policy）設定
- XSS対策（入力値のサニタイズ）
- 外部リンクのrel="noopener noreferrer"
- HTTPS強制

### フォームセキュリティ
- クライアントサイド検証
- レート制限（将来的にサーバーサイド実装時）
- スパム対策（reCAPTCHA等の検討）