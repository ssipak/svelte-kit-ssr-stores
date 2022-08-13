import type { ResolvedSessionables, Sessionable, Sessionables } from './types';
import { session } from '$app/stores';
import { get } from 'svelte/store';
import { resolveSessionables } from './utils';

const proxyHandlers = {
	get<T>(provide: (session: object) => T, prop: string | symbol) {
		const currentSession = get(session);

		// if currentSession is null or undefined throw an exception
		if (currentSession == null) {
			throw new Error('A sessionable is accessed outside the session');
		}

		return provide(currentSession)[prop as keyof T];
	}
};

export function defineSessionable<T, D extends Sessionables>(
	deps: D,
	defFn: (deps: ResolvedSessionables<D>) => T
) {
	const registry = new WeakMap<object, T>();

	return new Proxy(provide, proxyHandlers) as Sessionable<T>;

	function provide(session: object): T {
		if (registry.has(session)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return registry.get(session)!;
		}

		const store = defFn(resolveSessionables(session, deps));
		registry.set(session, store);
		return store;
	}
}
