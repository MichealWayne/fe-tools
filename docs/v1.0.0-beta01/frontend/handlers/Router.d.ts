import { clickEvent } from '../../types/frontendTypes.js';
import { YafNavigationLink } from '../webComponents/Navigation/index.js';
export default class Router {
    static baseUrl: string;
    static route: (link: YafNavigationLink, e: clickEvent) => void;
    static getTargetURL: (link: YafNavigationLink) => URL;
    private static getHrefWithoutHash;
    private static getHash;
}
