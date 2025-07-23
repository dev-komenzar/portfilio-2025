/**
 * プロジェクトのメタデータを表すインターフェース
 * マークダウンファイルのfrontmatterから読み込まれる
 */
export interface ProjectMetadata {
  /** プロジェクトの一意のID（URLスラッグとしても使用） */
  id: string;
  
  /** プロジェクトのタイトル（多言語対応） */
  title: Record<'ja' | 'en', string>;
  
  /** プロジェクトの詳細説明（多言語対応） */
  description: Record<'ja' | 'en', string>;
  
  /** プロジェクトの短い説明（カード表示用、多言語対応） */
  shortDescription: Record<'ja' | 'en', string>;
  
  /** プロジェクトで使用された技術のリスト */
  technologies: string[];

  /** プロジェクトのカテゴリ */
  category: 'web' | 'mobile' | 'desktop' | 'other';

  /** プロジェクトの状態 */
  status: 'completed' | 'in-progress' | 'archived';
  
  /** プロジェクトの開始日（YYYY-MM-DD形式） */
  startDate: string;
  
  /** プロジェクトの終了日（YYYY-MM-DD形式、進行中の場合は未定義） */
  endDate?: string;
  
  /** プロジェクトの画像情報 */
  images: {
    /** サムネイル画像のパス */
    thumbnail: string;
    
    /** ギャラリー画像のパスリスト */
    gallery: string[];
  };
  
  /** プロジェクトの関連リンク */
  links: {
    /** デモサイトのURL */
    demo?: string;
    
    /** GitHubリポジトリのURL */
    github?: string;
    
    /** プロジェクトWebサイトのURL */
    website?: string;
  };
  
  /** 特集プロジェクトかどうか（ホームページでハイライト表示） */
  featured: boolean;
  
  /** 表示順序（小さいほど先に表示） */
  order: number;
}

/**
 * マークダウンから読み込まれたプロジェクトデータ
 * メタデータとコンテンツを含む
 */
export interface ProjectData {
  /** プロジェクトのメタデータ */
  metadata: ProjectMetadata;
  
  /** プロジェクトの詳細コンテンツ（HTMLとして解析されたマークダウン） */
  content: string;
}

/**
 * プロジェクトフィルタリングオプション
 */
export interface ProjectFilterOptions {
  /** カテゴリでフィルタリング */
  category?: 'web' | 'mobile' | 'desktop' | 'other';
  
  /** ステータスでフィルタリング */
  status?: 'completed' | 'in-progress' | 'archived';
  
  /** 特集プロジェクトのみを表示 */
  featuredOnly?: boolean;
  
  /** 技術でフィルタリング */
  technology?: string;
}

/**
 * プロジェクトソートオプション
 */
export type ProjectSortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';