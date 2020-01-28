/**
 * Gestalt client types
 */
import { AIMSUser, AIMSAccount } from "@al/client";

export interface AlThreatLevel {
    value: string;
    caption: string;
}

export interface AlIncidentsAlertOptions {
    users?: AIMSUser[];
    accounts?: AIMSAccount[];
    threatLevels?: AlThreatLevel[];
}
