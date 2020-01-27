/**
 * Gestalt API client
 */
import { ALClient, AlApiClient } from '@al/client';
import { AlLocation } from '@al/common';

export class AlGestaltClientInstance {

    protected serviceName:string = 'gestalt';
    protected serviceVersion:string = 'v1';

    constructor( public client:AlApiClient = ALClient ) {
        client.setGlobalParameters({ service_stack: AlLocation.GestaltAPI });
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
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `/canary`,
        });
        return result as any;
    }
}
