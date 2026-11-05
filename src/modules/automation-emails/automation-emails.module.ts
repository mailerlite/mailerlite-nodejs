import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    AutomationEmailsInterface,
    AutomationEmailContentResponse,
    UpdateAutomationEmailContentParams,
    SingleAutomationEmailResponse,
    ListAutomationEmailUnsubscribeReasonsResponse
} from './automation-emails.types.js';
import type { AutomationReportPeriodParams, AutomationEmailStatsResponse, AutomationEcommerceStatsResponse } from '../automation-reports/automation-reports.types.js';

export default class AutomationEmail implements AutomationEmailsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get automation email content
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @email_id {String} - Email ID
     */
    public getContent(automation_id: string, email_id: string): Promise<AxiosResponse<AutomationEmailContentResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/emails/${pathSegment(email_id)}/content`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Set automation email content
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @email_id {String} - Email ID
     * @requestBody {Object} - Email HTML
     */
    public updateContent(automation_id: string, email_id: string, requestBody: UpdateAutomationEmailContentParams): Promise<AxiosResponse<SingleAutomationEmailResponse, UpdateAutomationEmailContentParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/emails/${pathSegment(email_id)}/content`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Get automation email stats
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @email_id {String} - Email ID
     * @params {Object} - Report period
     */
    public getReportStats(automation_id: string, email_id: string, params?: AutomationReportPeriodParams): Promise<AxiosResponse<AutomationEmailStatsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/emails/${pathSegment(email_id)}/report-stats`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get automation email e-commerce stats
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @email_id {String} - Email ID
     * @params {Object} - Report period and shop
     */
    public getEcommerceOverviewStats(automation_id: string, email_id: string, params?: AutomationReportPeriodParams): Promise<AxiosResponse<AutomationEcommerceStatsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/emails/${pathSegment(email_id)}/ecommerce-overview-stats`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description List automation email unsubscribe reasons
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @email_id {String} - Email ID
     */
    public getUnsubscribeReasons(automation_id: string, email_id: string): Promise<AxiosResponse<ListAutomationEmailUnsubscribeReasonsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/emails/${pathSegment(email_id)}/unsubscribe-reasons`, {
            method: "GET"
        }, this.config);
    }
};
