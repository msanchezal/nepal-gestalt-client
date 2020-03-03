/**
 * Gestalt client types
 */
import { AIMSUser, AIMSAccount } from "@al/aims";
import {
    AlHeraldAccountSubscriptionV2,
    AlHeraldIntegration,
    AlHeraldSubscribersV2 } from "@al/herald";
import { ReportSchedule } from "@al/cargo";

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

export interface AlNotificationCommonProperties {
    id: string;// AlCardstackItemProperties
    caption: string;// AlCardstackItemProperties
    createdTime ?: number;
    createdBy ?: string;
    modifiedTime ?: number;
    modifiedBy ?: string;
    accountId ?: string; // account creator
    subscribers ?: AlHeraldSubscribersV2[];
    filters ?: object| any; // filters example threat rathing
    active ?: boolean;
    lastMessageSent ?: number;
    emailSubject ?: string;
    webhookPayload ?: string;

    // the next fields are going to be populate in the app
    searchables ?: string[];
    error ?: string;
    createdByName ?: string;
    modifiedByName ?: string;
    accounts ?: string[]; // account ids involve in the filter
    accountsName ?: {name:string, isCreator:boolean}[]; // accounts involve in the filter
    recipientsName ?: {name:string, isCreator:boolean}[]; // users names involve in the notification
    recipients ?: string[]; // users ids that get the notification

}

// Indexable properties
export interface AlIncidentAlertProperties extends AlNotificationCommonProperties{

    // the next fields are going to be populate in the app
    notificationType ?: string;
    threatLevel ?: string[]; // filters example threat rathing
}


// Indexable properites
export interface AlScheduledReportProperties extends AlNotificationCommonProperties {
    workbookSubmenu ?: string; // this is to support filter by top category risk, threat
    workbookId ?: string;
    viewId ?: string;
    siteId ?: string;
    schedule ?: object| any;
    format ?: string;

    // populated in the view
    workbookName ?: string;
    viewName ?: string;
    cadenceName ?: "daily"| "weekly"| "monthly"| "every_15_minutes";
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

        if (rawData.notification_type) {
            this.properties.notificationType = rawData.notification_type;
        }
    }
}


export class AlScheduledReportDefinition {
    public id: string;
    public caption?: string;

    public properties: AlScheduledReportProperties;

    constructor(rawData: ReportSchedule) {
        // from cargo
        this.id = rawData.id;

        this.properties = {
            id: rawData.id,
            caption: '',
        };

        if (rawData.name) {
            this.caption = rawData.name;
            this.properties.caption = rawData.name;
        }

        if (rawData.definition) {

            if ("workbook_id" in rawData.definition) {
                this.properties.workbookId = rawData.definition.workbook_id;
            }
            if ("view_id" in rawData.definition) {
                this.properties.viewId = rawData.definition.view_id;
            }
            if ("site_id" in rawData.definition) {
                this.properties.siteId = rawData.definition.site_id;
            }
            if ("format" in rawData.definition) {
                this.properties.format = rawData.definition.format;
            }
            if ("filter_values" in rawData.definition) {
                this.properties.filters = rawData.definition.filter_values;
            }
        }
        if (rawData.schedule) {
            this.properties.schedule = rawData.schedule;
        }

        if (rawData.hasOwnProperty('is_active')) {
            this.properties.active = rawData.is_active;
        }

        if (rawData.created) {
            this.properties.createdBy = rawData.created.by;
            this.properties.createdTime = rawData.created.at;
        }

        if (rawData.modified) {
            this.properties.modifiedBy = rawData.modified.by;
            this.properties.modifiedTime = rawData.modified.at;
        }
    }

    public addSubscribers(item: AlScheduledReportDefinition, rawDataHerald?:AlHeraldAccountSubscriptionV2){
         // from herald
        if (rawDataHerald) {

            if (rawDataHerald.last_notification) {
                item.properties.lastMessageSent = rawDataHerald.last_notification;
            }

            if (rawDataHerald.subscribers) {
                item.properties.subscribers = rawDataHerald.subscribers;
            }

            if (rawDataHerald.options) {
                if (rawDataHerald.options.email_subject) {
                    this.properties.emailSubject = rawDataHerald.options.email_subject;
                }

                if (rawDataHerald.options.webhook_payload) {
                    this.properties.webhookPayload = rawDataHerald.options.webhook_payload;
                }
            }
        }
    }
}
