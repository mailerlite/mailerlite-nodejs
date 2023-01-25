import { validateId } from '../validation.js';
import request from '../../fetch.js'

import type { Config }  from '../types'
import { AxiosResponse } from "axios";

import {
    AutomationsInterface, AutomationSubsParams, AutomationSubsResponse,
    GetAutomationsParams,
    ListAutomationsResponse,
    SingleAutomationResponse
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

        validateId(automation_id);

        return request(`/api/automations/${automation_id}`, {
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

        validateId(automation_id);

        return request(`/api/automations/${automation_id}/activity`, {
            method: "GET",
            params: params
        }, this.config);
    }
};
