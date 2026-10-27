import { localStorageKey } from '../../types/frontendTypes.js';
import { htmlString } from '../../types/types.js';
export default class ErrorHandlers {
    static template: (err: unknown) => htmlString;
    static data: (err: unknown) => unknown;
    static notFound: (message: string) => never;
    static localStorage: (key: localStorageKey) => void;
}
