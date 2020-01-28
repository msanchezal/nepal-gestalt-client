import { AlGestaltClientInstance } from './al-gestalt-client';
import { AlGestaltNotificationsClientInstance } from './al-gestalt-notifications-client';
import { AlGlobalizer } from '@al/common';

/* tslint:disable:variable-name */
export const ALGestalt:AlGestaltClientInstance = AlGlobalizer.instantiate(
    "al.gestalt", () => new AlGestaltClientInstance()
);
export const ALGestaltNotifications:AlGestaltNotificationsClientInstance = AlGlobalizer.instantiate(
    "al.gestalt.notifications", () => new AlGestaltNotificationsClientInstance()
);

/* tslint:enable:variable-name */

export * from './types';
export * from './al-gestalt-client';
export * from './al-gestalt-notifications-client';
