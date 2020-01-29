/**
 * Gestalt API client
 */
import { ALClient, AlApiClient } from '@al/client';
import { AlLocation, AlCardstackCharacteristics } from '@al/common';
import { AlIncidentsAlertOptions } from './types';

export class AlGestaltNotificationsClientInstance {

    protected serviceName:string = 'notifications';
    protected serviceVersion:string = 'v1';

    constructor( public client:AlApiClient = ALClient ) {
        client.service_stack = AlLocation.GestaltAPI;
    }

    /**
     * Updates user's subscription in a given account, feature and subkey
     * GET
     * /notifications/v1/:account_id/options/incident
     * "https://gestalt-api.product.dev.alertlogic.com/notifications/v1/2/options/incident"
     *
     * @param accountId AIMS Account ID
     * @returns a promise with the subscriptions
     */
    async getIncidentsAlertOptions(accountId: string): Promise<AlIncidentsAlertOptions> {
        const result = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `${accountId}/options/incident`
        });
        return result as AlIncidentsAlertOptions;
    }

    /**
     * get characteristics for an entity and an account
     * GET
     * /notifications/v1/:account_id/characteristics/incident
     * "https://gestalt-api.product.dev.alertlogic.com/notifications/v1/2/characteristics/incident"
     *
     * @param accountId AIMS Account ID
     * @param entity incident
     * @returns a promise with the subscriptions
     */
    async getNotificationsCharacteristics(accountId: string, entity:string): Promise<AlCardstackCharacteristics> {
        const result = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `${accountId}/characteristics/${entity}`
        });
        return result as AlCardstackCharacteristics;
    }

}
