export * from './types';
export { defineSessionable } from './defineSessionable';
export { loadWithSessionables } from './utils';

/**
 * The main purpose of this lib is to let developers work with stores in the server environment.
 * The Svelte docs don't emphasise it enough that directly exported stores bloat global server state
 * and thus are prone to data leakage (as requests from every customer will share the same instance).
 */
