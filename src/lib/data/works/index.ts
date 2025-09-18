import type { ProjectData, ProjectFilterOptions, ProjectMetadata, ProjectSortOption } from '$lib/types/project';
import { filterProjects, parseProjectMarkdown, sortProjects } from '$lib/utils/markdown';

/**
 * すべてのプロジェクトを取得する関数
 * 
 * @param options フィルタリングとソートのオプション
 * @returns プロジェクトデータの配列
 */
export async function getProjects(
  filterOptions?: ProjectFilterOptions,
  sortOption?: ProjectSortOption
): Promise<ProjectData[]> {
  // マークダウンファイルを読み込む
  const modules = import.meta.glob('./md/*.md', { as: 'raw', eager: true });
  const projects = await Promise.all(Object.entries(modules).map(([, content]) => {
    return parseProjectMarkdown(content as string);
  }));
  
  // フィルタリングとソートを適用
  const filteredProjects = filterProjects(projects, filterOptions);
  return sortProjects(filteredProjects, sortOption);
}

/**
 * 特集プロジェクトのみを取得する関数
 * 
 * @param limit 取得する最大数
 * @returns 特集プロジェクトデータの配列
 */
export async function getFeaturedProjects(limit?: number): Promise<ProjectData[]> {
  const projects = await getProjects({ featuredOnly: true });
  return limit ? projects.slice(0, limit) : projects;
}

/**
 * スラッグからプロジェクトを取得する関数
 * 
 * @param slug プロジェクトのスラッグ（ID）
 * @returns プロジェクトデータ、見つからない場合はnull
 */
export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const projects = await getProjects();
  return projects.find(project => project.metadata.id === slug) || null;
}

/**
 * 関連プロジェクトを取得する関数
 * 
 * @param currentProject 現在のプロジェクト
 * @param limit 取得する最大数
 * @returns 関連プロジェクトデータの配列
 */
export async function getRelatedProjects(
  currentProject: ProjectMetadata,
  limit = 3
): Promise<ProjectData[]> {
  // 同じカテゴリのプロジェクトを取得
  const projects = await getProjects({
    category: currentProject.category
  });
  
  // 現在のプロジェクトを除外
  const filteredProjects = projects.filter(
    project => project.metadata.id !== currentProject.id
  );
  
  // 最大数を制限
  return filteredProjects.slice(0, limit);
}