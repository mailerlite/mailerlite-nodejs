import { omitFalse, pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";

import {
    AutomationsInterface, AutomationSubsParams, AutomationSubsResponse,
    GetAutomationsParams,
    ListAutomationsResponse,
    SingleAutomationResponse,
    CreateAutomationParams,
    UpdateAutomationParams,
    TestAutomationParams,
    AddSubscribersToAutomationParams,
    ReaddAutomationSubscribersParams,
    AddAutomationActivityToGroupParams,
    AutomationActiveRunsParams
} from "./automations.types.js";

export default class Automation implements AutomationsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List all automations
     *
     * @see https://developers.mailerlite.com/docs/automations.html#list-all-automations
     *
     * @params {Object} - List automations params
     */
    public get(params: GetAutomationsParams): Promise<AxiosResponse<ListAutomationsResponse>> {
        return request('/api/automations', {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html#get-an-automation
     *
     * @automation_id {String} - Automation ID
     */
    public find(automation_id: string): Promise<AxiosResponse<SingleAutomationResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get the subscriber activity for an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html#get-the-subscriber-activity-for-an-automation
     *
     * @automation_id {String} - Automation ID
     * @params {Object} - List automation subscribers params
     */
    public getAutomationSubscribers(automation_id: string, params: AutomationSubsParams): Promise<AxiosResponse<AutomationSubsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/activity`, {
            method: "GET",
            params: omitFalse(params, "with_subscribers")
        }, this.config);
    }

    /**
     * @description Create a draft automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html#create-draft-automation
     *
     * @requestBody {Object} - Automation data for create
     */
    public create(requestBody: CreateAutomationParams): Promise<AxiosResponse<SingleAutomationResponse, CreateAutomationParams>> {
        return request(`/api/automations`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Automation data for update
     */
    public update(automation_id: string, requestBody: UpdateAutomationParams): Promise<AxiosResponse<SingleAutomationResponse, UpdateAutomationParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html#delete-automation
     *
     * @automation_id {String} - Automation ID
     */
    public delete(automation_id: string): Promise<AxiosResponse<null>> {
        return request(`/api/automations/${pathSegment(automation_id)}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Copy an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public copy(automation_id: string): Promise<AxiosResponse<SingleAutomationResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/copy`, {
            method: "POST"
        }, this.config);
    }

    /**
     * @description Enable an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public enable(automation_id: string): Promise<AxiosResponse<SingleAutomationResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/enable`, {
            method: "POST"
        }, this.config);
    }

    /**
     * @description Disable an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public disable(automation_id: string): Promise<AxiosResponse<SingleAutomationResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/disable`, {
            method: "POST"
        }, this.config);
    }

    /**
     * @description Send an automation test email
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Test email recipient
     */
    public test(automation_id: string, requestBody: TestAutomationParams): Promise<AxiosResponse<null, TestAutomationParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/test`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Add subscribers to an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Subscribers to add
     */
    public addSubscribers(automation_id: string, requestBody: AddSubscribersToAutomationParams): Promise<AxiosResponse<null, AddSubscribersToAutomationParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/add-subscribers`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Re-add subscribers to an automation
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Runs to re-add and where they re-enter
     */
    public readd(automation_id: string, requestBody: ReaddAutomationSubscribersParams): Promise<AxiosResponse<null, ReaddAutomationSubscribersParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/readd`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Copy automation subscribers to groups
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Destination groups and runs filter
     */
    public addActivityToGroup(automation_id: string, requestBody: AddAutomationActivityToGroupParams): Promise<AxiosResponse<null, AddAutomationActivityToGroupParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/activity/add-to-group`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Cancel automation runs
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Runs filter
     */
    public cancelActivity(automation_id: string, requestBody: AutomationActiveRunsParams): Promise<AxiosResponse<null, AutomationActiveRunsParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/activity/cancel-automation`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Skip an automation delay
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Runs filter
     */
    public skipActivityDelay(automation_id: string, requestBody: AutomationActiveRunsParams): Promise<AxiosResponse<null, AutomationActiveRunsParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/activity/skip-delay`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }
};
