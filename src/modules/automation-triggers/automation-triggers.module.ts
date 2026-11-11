import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    AutomationTriggersInterface,
    ListAutomationTriggersResponse,
    SingleAutomationTriggerResponse,
    CreateAutomationTriggerParams,
    UpdateAutomationTriggerParams,
    UpdateAutomationTriggerResponse
} from './automation-triggers.types.js';

export default class AutomationTrigger implements AutomationTriggersInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List automation triggers
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public get(automation_id: string): Promise<AxiosResponse<ListAutomationTriggersResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get an automation trigger
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @trigger_id {String} - Trigger ID
     */
    public find(automation_id: string, trigger_id: string): Promise<AxiosResponse<SingleAutomationTriggerResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers/${pathSegment(trigger_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create an automation trigger
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Trigger type and data
     */
    public create(automation_id: string, requestBody: CreateAutomationTriggerParams): Promise<AxiosResponse<SingleAutomationTriggerResponse, CreateAutomationTriggerParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update an automation trigger
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @trigger_id {String} - Trigger ID
     * @requestBody {Object} - Complete trigger data
     */
    public update(automation_id: string, trigger_id: string, requestBody: UpdateAutomationTriggerParams): Promise<AxiosResponse<UpdateAutomationTriggerResponse, UpdateAutomationTriggerParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers/${pathSegment(trigger_id)}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete an automation trigger
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @trigger_id {String} - Trigger ID
     */
    public delete(automation_id: string, trigger_id: string): Promise<AxiosResponse<null>> {
        return request(`/api/automations/${pathSegment(automation_id)}/triggers/${pathSegment(trigger_id)}`, {
            method: "DELETE"
        }, this.config);
    }
};
