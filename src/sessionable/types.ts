import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

export type Sessionable<T> = T & ((session: object) => T);

export type Sessionables = { [name: string]: Sessionable<unknown> };

export type ResolvedSessionables<SS> = {
	[name in keyof SS]: SS[name] extends Sessionable<unknown> ? SS[name] : never;
};

export type LoadWithSessionables<SS> = (
	resolvedSessionables: ResolvedSessionables<SS>,
	loadEvent: LoadEvent
) => LoadOutput | Promise<LoadOutput>;
