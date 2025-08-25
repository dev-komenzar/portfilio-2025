# 鴨川デジタル相談所のポートフォリオ

## 目的

鴨川デジタル相談所（以下、「かもデジ」）のポートフォリオを作成する。サイトは静的な構成。ユーザーがかもデジのプロジェクトやスキルについて知ることを目的とする。このサイト自体のユーザー体験がかもデジのプロダクトの品質を体感できるように、サイト内の動線やアニメーションの設置など細かな工夫を行う。

## 技術

フロントエンド

- Svelte, SvelteKit
- Paraglide JS

ホスティング

- Coolify: 自分のサーバーでホスティング
- Docker: Coolifyでアプリケーションをビルド

## 開発の始め方

1. リポジトリをクローンします。
2. 依存関係をインストールします。パッケージマネージャーはPNPMです。

    ```bash
    pnpm install
    ```

3. 開発サーバーを起動します。

    ```bash
    pnpm run dev
    ```

### 主なnpmスクリプト

- `dev`: 開発サーバーを起動します。
- `build`: プロダクション用にビルドします。
- `lint`: ESLintでコードをチェックします。
- `lint:fix`: ESLintでコードを自動修正します。
- `check`: Svelte Checkで型チェックなどを行います。
- `compile:translations`: Paraglide JSの翻訳ファイルをコンパイルします。

## プロジェクト構造

このプロジェクトはSvelteKitの標準的なディレクトリ構造に従っています。各ディレクトリの役割は以下の通りです。

- src/routes/:

ページのルーティングを定義します。各ディレクトリがURLのパスに対応します。
例: src/routes/+page.svelte はサイトのトップページ (/) になります。

- src/lib/:
Svelteコンポーネント、ユーティリティ関数、型定義など、アプリケーションのコアとなるモジュールを格納します。このディレクトリ内のファイルは $lib/ というエイリアスでインポートできます。
  - components/: `<NavBar>`のような再利用可能なUIコンポーネントを配置します。
  - assets/: アイコン(SVG)など、JavaScript/TypeScriptコード内で直接 import して使用するアセットを配置します。
  - works/: ポートフォリオに表示するプロジェクトデータを格納します。データの作成方法については src/lib/works/README.md を参照してください。
  - paraglide/: (自動生成) Paraglide JSによって生成される翻訳関連のファイルです。このディレクトリは手動で編集しないでください。
  - types/: プロジェクト全体で使われるTypeScriptの型定義（例: Project型など）を配置します。

- static/:
画像、フォント、ファビコンなど、ビルド処理を介さずにそのままの形で配信される静的ファイルを格納します。
- src/app.css: サイト全体に適用されるグローバルなCSSスタイルを記述します。
- src/app.html: アプリケーション全体のHTMLテンプレートです。`<head>` タグ内のメタ情報などを編集します。

## コーディング規約

- フォーマットとリンティング: コードをコミットする前に pnpm run lint:fix を実行してください。lint-staged が設定されているため、コミット時に自動的にチェックと修正が行われます。
- コンポーネント: Svelteコンポーネントは PascalCase で命名してください (例: src/lib/components/NavBar.svelte)。
- スタイル: スタイルはSvelteコンポーネント内の `<style>` タグに記述し、スコープをコンポーネント内に限定してください。グローバルなスタイルは src/app.css に記述します。

## 国際化 (i18n)

このプロジェクトでは Paraglide JS を使用して国際化に対応しています。

- 翻訳メッセージは messages/{lang}.json に定義します。
- 新しいメッセージを追加・変更した後は pnpm run compile:translations を実行して型定義を更新してください。
- Svelteコンポーネント内では、import * as m from '$lib/paraglide/messages' のようにインポートして使用します。

## ページの構成

### レイアウト

- ファイル: `src/routes/+layout.svelte`
- 構成:
  - コンテンツ
  - ナビゲーションバー

#### ナビゲーションバー `<NavBar>`

スタイル

- background-color: `light-dark(#ddddddbb, #55555588)`
- backdrop-filter: `blur(0.5em)`
- 位置：モバイルでは画面下部中央に配置、デスクトップでは画面左中央に配置する。

使用イメージ：ページごとに子コンポーネント`<NavItem>`を変えて、動的なナビゲーションバーを作成する。

```svelte
// トップページのナビゲーションバーの例

<NavRoot>
  <NavItem
    icon={SomeIconComponent}
    link="#works"
    text="works"
  />
  <NavItem
    icon={AnotherIconComponent}
    link="#about"
    text="about me"
  />
  <NavItem
    icon={YetAnotherIconComponent}
    link="#contact"
    text="contact"
  />
</NavRoot>
```

### トップページ

ファイル: `src/routes/+page.svelte`

大きく4つのセクションから成り立つ。

- `<Hero>`
- `<Works>`
- `<About>`
- `<Contact>`

#### Hero セクション

- 構成要素:
  - コピーライティング
  - 各種SNSへのリンク
    - Github
    - Instagram
  - 背景に`three.js`を使用して、動く3Dグラフィックがほしい。
    - TODO: デザインをどうするか？

- コピーライティング
  - かもデジの理念: "Techs for Communities"

#### Works セクション

- Worksの紹介のためにカードUIを横２列で並べる。
- カードUIは各サイトへのリンクになっている。
- 初期のworks
  - 寳幢寺サイト
  - ポートフォリオ
  - 生まれてから1万日目を計算するサイト: My 10k Day
- 随時追加していく
- カードUIのデザイン
  - 上部に画像、下部はタイトルを表示する

#### About セクション

- 自己紹介
  - 顔写真
  - 自己紹介文
    - TODO: 自己紹介文を作成する。
- スキルを表示
  - アイコンを並べる
  - JS
  - TS
  - React
  - Svelte
  - Vue
  - Elixir
  - Clojure
  - Obsidian
  - Logseq

- 自己紹介のアイデア
- コミュニティの運営
- セルフホスト
- デジタル赤字、国内インフラの使用
- 社会情勢を

#### Contact セクション

「Gmailあるいは各種SNSで連絡」と表記

## スタイルガイド

カラーパレット

- Primary color:
  - soft: #A2D2E2
  - DEFAULT: #6BB392
  - dark: #48864D
- Accent color:
  - DEFAULT: #F08437
  - soft: #FBCA5A
  - pale: #BBB3D8
- Neutral color:
  - dark: #080808
  - DEFAULT: #414143
  - soft: #757578
  - light: #B4B4B7
  - pale: #D8D8D8
  - verypale: #F1F1F4
  - white: #FFFFFF

## アクセシビリティ

TODO: ある程度マークアップを進めてから考える。
