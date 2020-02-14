/**
 * Gestalt client types
 */
import { AIMSUser, AIMSAccount } from "@al/aims";
import { AlHeraldIntegration } from "@al/herald";


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
