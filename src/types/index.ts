/**
 * Gestalt client types
 */
import { AIMSUser, AIMSAccount } from "@al/aims";
import {
    AlHeraldAccountSubscriptionV2,
    AlHeraldIntegration,
    AlHeraldSubscribersV2 } from "@al/herald";

export interface AlThreatLevel {
    value: string;
    caption: string;
}

export interface AlIncidentsAlertOptions {
    users?: AIMSUser[];
    accounts?: AIMSAccount[];
    threatLevels?: AlThreatLevel[];
    integrations?: AlHeraldIntegration[];
}

/** Alert notifications */

// Indexable properites
export interface AlIncidentAlertProperties {
    id: string;
    caption: string;
    createdTime ?: number;
    createdBy ?: string;
    modifiedTime ?: number;
    modifiedBy ?: string;
    accountId ?: string; // account creator
    subscribers ?: AlHeraldSubscribersV2[];
    filters ?: object| any; // filters example threat rathing
    lastMessageSent ?: number;
    emailSubject ?: string;
    webhookPayload?: string;
    active ?: boolean;

    // the next fields are going to be populate in the app
    createdByName ?: string;
    modifiedByName ?: string;
    accountsName ?: {name:string, isCreator:boolean}[]; // accounts involve in the filter
    accounts ?: string[]; // account ids involve in the filter
    recipientsName ?: {name:string, isCreator:boolean}[]; // users names involve in the notification
    recipients ?: string[]; // users ids that get the notification
    searchables ?: string[];
    threatLevel ?: string[]; // filters example threat rathing
    error ?: string;
}

export class AlIncidentAlertDefinition {
    public id: string;
    public caption: string;
    public properties: AlIncidentAlertProperties;

    constructor(rawData: AlHeraldAccountSubscriptionV2) {
        this.id = rawData.id;
        this.caption = rawData.name;

        this.properties = {
            id: rawData.id,
            caption: rawData.name
        };

        if (rawData.hasOwnProperty('active')) {
            this.properties.active = rawData.active;
        }

        if (rawData.created) {
            this.properties.createdBy = rawData.created.by;
            this.properties.createdTime = rawData.created.at;
        }

        if (rawData.modified) {
            this.properties.modifiedBy = rawData.modified.by;
            this.properties.modifiedTime = rawData.modified.at;
        }

        if (rawData.last_notification) {
            this.properties.lastMessageSent = rawData.last_notification;
        }

        if (rawData.options) {
            if (rawData.options.email_subject) {
                this.properties.emailSubject = rawData.options.email_subject;
            }

            if (rawData.options.webhook_payload) {
                this.properties.webhookPayload = rawData.options.webhook_payload;
            }
        }

        if (rawData.filters) {
            if (rawData.filters) {
                this.properties.filters = rawData.filters;
            }
        }

        if (rawData.subscribers) {
            this.properties.subscribers = rawData.subscribers;
        }

        if (rawData.account_id) {
            this.properties.accountId = rawData.account_id;
        }
    }
}
