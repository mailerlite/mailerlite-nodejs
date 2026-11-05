import { AxiosResponse } from "axios";
import { Email } from "../campaigns/campaigns.types.js";
import { AutomationReportPeriodParams, AutomationEmailStatsResponse, AutomationEcommerceStatsResponse } from "../automation-reports/automation-reports.types.js";

export interface AutomationEmailsInterface {
    getContent:                 (automation_id: string, email_id: string)                                       => Promise<AxiosResponse<AutomationEmailContentResponse>>;
    updateContent:              (automation_id: string, email_id: string, params: UpdateAutomationEmailContentParams) => Promise<AxiosResponse<SingleAutomationEmailResponse, UpdateAutomationEmailContentParams>>;
    getReportStats:             (automation_id: string, email_id: string, params?: AutomationReportPeriodParams) => Promise<AxiosResponse<AutomationEmailStatsResponse>>;
    getEcommerceOverviewStats:  (automation_id: string, email_id: string, params?: AutomationReportPeriodParams) => Promise<AxiosResponse<AutomationEcommerceStatsResponse>>;
    getUnsubscribeReasons:      (automation_id: string, email_id: string)                                       => Promise<AxiosResponse<ListAutomationEmailUnsubscribeReasonsResponse>>;
}

export interface UpdateAutomationEmailContentParams {
    html: string;
}

export interface AutomationEmailContentResponse {
    data: {
        html: string;
    };
}

export interface SingleAutomationEmailResponse {
    data: Email;
}

export interface AutomationEmailUnsubscribeReasonObject {
    label:      string;
    count:      number;
    percentage: string;
}

export interface ListAutomationEmailUnsubscribeReasonsResponse {
    data: Array<AutomationEmailUnsubscribeReasonObject>;
}
