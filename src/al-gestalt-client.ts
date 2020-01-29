/**
 * Gestalt API client.
 * Note: Put here gestalt endpoints without a service name.
 */
import { ALClient, AlApiClient } from '@al/client';
import { AlLocation } from '@al/common';

export class AlGestaltClientInstance {

    constructor( public client:AlApiClient = ALClient ) {
        client.service_stack = AlLocation.GestaltAPI;
    }

    /**
     * Get gestalt canary to check if gestalt is responding.
     * This gestalt API endpoint is used by datadog.
     * GET
     * /canary
     *
     *  @returns a promise
     */
    async isGestaltResponding(): Promise<any> {
        const result = await this.client.get({
            path: `/canary`,
        });
        return result as any;
    }
}
