import { getAllWorkSlugs } from '$lib/data/works';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
	const slugs = await getAllWorkSlugs();
	return slugs.map(slug => ({ slug: slug }));
}