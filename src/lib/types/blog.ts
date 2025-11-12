/**
 * ブログ記事のメタデータを表すインターフェース
 * マークダウンファイルのfrontmatterから読み込まれる
 */
export interface BlogMetadata {
  /** 記事の一意のID（URLスラッグとしても使用） */
  id: string;

  /** 記事のタイトル（多言語対応） */
  title: Record<'ja' | 'en', string>;

  /** 記事の説明（多言語対応） */
  description: Record<'ja' | 'en', string>;

  /** 記事で扱う技術・トピックのタグ */
  tags: string[];

  /** 記事の公開日（YYYY-MM-DD形式） */
  publishedAt: string;

  /** 記事の最終更新日（YYYY-MM-DD形式） */
  updatedAt?: string;

  /** サムネイル画像のパス */
  thumbnail?: string;

  /** 記事が公開状態かどうか */
  published: boolean;

  /** Zennからの移行記事の場合、元のZenn記事のURL */
  zennUrl?: string;

  /** Zennでのいいね数（移行時の記録用） */
  zennLikes?: number;

  /** 表示順序（小さいほど先に表示、未指定の場合は公開日順） */
  order?: number;
}

/**
 * マークダウンから読み込まれたブログ記事データ
 * メタデータとコンテンツを含む
 */
export interface BlogData {
  /** 記事のメタデータ */
  metadata: BlogMetadata;

  /** 記事の詳細コンテンツ（HTMLとして解析されたマークダウン） */
  content: string;
}

/**
 * ブログ記事フィルタリングオプション
 */
export interface BlogFilterOptions {
  /** タグでフィルタリング */
  tag?: string;

  /** 公開済み記事のみを表示 */
  publishedOnly?: boolean;
}

/**
 * ブログ記事ソートオプション
 */
export type BlogSortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc' | 'order';

/**
 * Umami API統合用の型定義
 */
export interface UmamiPageStats {
  /** ページビュー数 */
  pageviews: number;

  /** ユニーク訪問者数 */
  visitors?: number;
}
