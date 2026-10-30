import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    AutomationReportsInterface,
    ListAutomationStepRunCountsResponse,
    SingleAutomationStepRunCountsResponse,
    AutomationTriggersRunCountsResponse,
    SingleAutomationTriggerRunCountsResponse,
    ListAutomationAbStepStatsResponse,
    SingleAutomationAbStepStatsResponse,
    GetAutomationActivitySubscribersParams,
    ListAutomationActivitySubscribersResponse,
    GetAutomationOrderActivityParams,
    ListAutomationOrderActivityResponse,
    AutomationReportPeriodParams,
    AutomationEmailStatsResponse,
    AutomationEcommerceTotalsResponse
} from './automation-reports.types.js';

export default class AutomationReport implements AutomationReportsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get automation step run counts
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public getStepRunCounts(automation_id: string): Promise<AxiosResponse<ListAutomationStepRunCountsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/run-counts`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get run counts for an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     */
    public findStepRunCounts(automation_id: string, step_id: string): Promise<AxiosResponse<SingleAutomationStepRunCountsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/run-counts/${pathSegment(step_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get automation trigger run counts
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public getTriggerRunCounts(automation_id: string): Promise<AxiosResponse<AutomationTriggersRunCountsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers/run-counts`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get run counts for an automation trigger
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @trigger_id {String} - Trigger ID
     */
    public findTriggerRunCounts(automation_id: string, trigger_id: string): Promise<AxiosResponse<SingleAutomationTriggerRunCountsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers/run-counts/${pathSegment(trigger_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description List automation A/B test stats
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public getAbStepsStats(automation_id: string): Promise<AxiosResponse<ListAutomationAbStepStatsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/ab-steps-stats`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get automation A/B test stats
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     */
    public findAbStepStats(automation_id: string, step_id: string): Promise<AxiosResponse<SingleAutomationAbStepStatsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/ab-steps-stats/${pathSegment(step_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description List subscribers on an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     * @params {Object} - List subscribers params
     */
    public getStepSubscribers(automation_id: string, step_id: string, params: GetAutomationActivitySubscribersParams): Promise<AxiosResponse<ListAutomationActivitySubscribersResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/activity/steps/${pathSegment(step_id)}/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description List subscribers on an automation trigger
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @trigger_id {String} - Trigger ID
     * @params {Object} - List subscribers params
     */
    public getTriggerSubscribers(automation_id: string, trigger_id: string, params: GetAutomationActivitySubscribersParams): Promise<AxiosResponse<ListAutomationActivitySubscribersResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/activity/triggers/${pathSegment(trigger_id)}/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description List automation orders
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @params {Object} - List orders params
     */
    public getOrderActivity(automation_id: string, params: GetAutomationOrderActivityParams): Promise<AxiosResponse<ListAutomationOrderActivityResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/order-activity`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get automation email totals
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @params {Object} - Report period
     */
    public getMonthlyEmailTotals(automation_id: string, params?: AutomationReportPeriodParams): Promise<AxiosResponse<AutomationEmailStatsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/monthly-totals/email`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get automation e-commerce totals
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @params {Object} - Report period and shop
     */
    public getMonthlyEcommerceTotals(automation_id: string, params?: AutomationReportPeriodParams): Promise<AxiosResponse<AutomationEcommerceTotalsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/monthly-totals/ecommerce`, {
            method: "GET",
            params: params
        }, this.config);
    }
};
