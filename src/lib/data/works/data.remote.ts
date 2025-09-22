import { prerender, query } from '$app/server';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import { getFeaturedProjects, getProjectBySlug, getProjects } from '.';

export const getProjectsRemote = query(getProjects)

export const getFeaturedProjectsRemote = query(v.optional(v.number()) ,async (limit: number = 3) => {
	return await getFeaturedProjects(limit)
})

export const getProjectBySlugRemote = prerender(v.string(), async (slug: string = '') => {
	if (!slug) error(404, 'URL is invalid');
	const project = await getProjectBySlug(slug)
	if (!project) error(404, 'Project not found');
	return project
})