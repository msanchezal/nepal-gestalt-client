import { AlGestaltClientInstance } from './al-gestalt-client';
import { AlGlobalizer } from '@al/common';

/* tslint:disable:variable-name */
export const ALCargo:AlGestaltClientInstance = AlGlobalizer.instantiate( "al.cargo", () => new AlGestaltClientInstance() );

/* tslint:enable:variable-name */

export * from './types';
export * from './al-gestalt-client';
