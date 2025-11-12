import type { WorkData, WorkFilterOptions, WorkMetadata, WorkSortOption } from '$lib/types/work';
import { filterWorks, parseWorkMarkdown, sortWorks } from '$lib/utils/markdown';

/**
 * すべてのワークを取得する関数
 * 
 * @param options フィルタリングとソートのオプション
 * @returns ワークデータの配列
 */
export async function getWorks(
  filterOptions?: WorkFilterOptions,
  sortOption?: WorkSortOption
): Promise<WorkData[]> {
  // マークダウンファイルを読み込む
  const modules = import.meta.glob('./md/*.md', { query: '?raw', import: 'default', eager: true });
  const works = await Promise.all(Object.entries(modules).map(([, content]) => {
    return parseWorkMarkdown(content as string);
  }));
  
  // フィルタリングとソートを適用
  const filteredWorks = filterWorks(works, filterOptions);
  return sortWorks(filteredWorks, sortOption);
}

/**
 * すべてのワークのslugを取得する関数
 */
export async function getAllWorkSlugs(): Promise<string[]> {
  const modules = import.meta.glob('./md/*.md', { query: '?raw', import: 'default', eager: true });
  const slugs = Object.keys(modules).map(path => {
    const match = path.match(/\/md\/(.*)\.md$/);
    return match ? match[1] : '';
  }).filter(slug => slug !== '');
  console.log('All work slugs:', slugs);
  return slugs;
}



/**
 * 特集ワークのみを取得する関数
 * 
 * @param limit 取得する最大数
 * @returns 特集ワークデータの配列
 */
export async function getFeaturedWorks(limit?: number): Promise<WorkData[]> {
  const works = await getWorks({ featuredOnly: true });
  return limit ? works.slice(0, limit) : works;
}

/**
 * スラッグからワークを取得する関数
 * 
 * @param slug ワークのスラッグ（ID）
 * @returns ワークデータ、見つからない場合はnull
 */
export async function getWorkBySlug(slug: string): Promise<WorkData | null> {
  try {
    // 動的にモジュールをインポート
    const module = await import(`./md/${slug}.md?raw`);
    const content = await parseWorkMarkdown(module.default);
    return content;
  } catch (e) {
    console.error(`Work with slug "${slug}" not found.`, e);
    return null; // ワークが見つからない場合はnullを返す
  }
}

/**
 * 関連ワークを取得する関数
 * 
 * @param currentWork 現在のワーク
 * @param limit 取得する最大数
 * @returns 関連ワークデータの配列
 */
export async function getRelatedWorks(
  currentWork: WorkMetadata,
  limit = 3
): Promise<WorkData[]> {
  // 同じカテゴリのワークを取得
  const works = await getWorks({
    category: currentWork.category
  });
  
  // 現在のワークを除外
  const filteredWorks = works.filter(
    work => work.metadata.id !== currentWork.id
  );
  
  // 最大数を制限
  return filteredWorks.slice(0, limit);
}