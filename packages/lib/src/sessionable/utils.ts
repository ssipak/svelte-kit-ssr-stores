import type { ResolvedSessionables, Sessionables, LoadWithSessionables } from './types';
import type { Load } from '@sveltejs/kit';

export function resolveSessionables<SS extends Sessionables>(
	session: object,
	sessionables: SS
): ResolvedSessionables<SS> {
	const result: Record<string, unknown> = {};

	for (const [name, sessionable] of Object.entries(sessionables)) {
		result[name] = sessionable(session);
	}

	return result as ResolvedSessionables<SS>;
}

export function loadWithSessionables<SS extends Sessionables>(
	sessionables: SS,
	load: LoadWithSessionables<SS>
): Load {
	return (loadEvent) => {
		const { session } = loadEvent;
		const resolvedSessionables = resolveSessionables(session, sessionables);
		return Promise.resolve(load(resolvedSessionables, loadEvent));
	};
}
