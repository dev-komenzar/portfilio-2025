import { getBlogs } from '$lib/data/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const blogs = await getBlogs({ publishedOnly: true }, 'newest');

  return {
    blogs
  };
};
