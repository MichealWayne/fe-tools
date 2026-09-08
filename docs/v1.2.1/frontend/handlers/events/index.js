import { trigger } from './triggers.js';
import * as content_1 from './actionsContent.js';
export { content_1 as content };
import * as menu_1 from './actionsMenu.js';
export { menu_1 as menu };
import * as drawers_1 from './actionsDrawers.js';
export { drawers_1 as drawers };
import * as options_1 from './actionsOptions.js';
export { options_1 as options };
export const scrollTo = (context, target) => new CustomEvent(trigger[context].scrollTo, {
    detail: { target },
});
//# sourceMappingURL=index.js.map