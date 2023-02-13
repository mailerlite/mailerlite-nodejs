import { validateId } from '../helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../types.js'
import { AxiosResponse } from "axios";
import { StatsInterface, CampaignSubscribersActivityParams, CampaignSubscribersActivityResponse } from './stats.types.js';
import { GetCampaignsParams, ListCampaignsResponse, CampaignStats } from '../campaigns/campaigns.types.js'
import { FormTypes, GetFormsParams, ListFormsResponse } from "../forms/forms.types.js";
import { FormsSubscribersParams } from "./stats.types.js";
import { ListSubscribersResponse } from "../subscribers/subscribers.types.js";
import { AutomationStats, AutomationSubsParams, AutomationSubsResponse, GetAutomationsParams, ListAutomationsResponse } from "../automations/automations.types.js";

export default class Statistics implements StatsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get a list of sent campaigns
     *
     * @params {Object} - 'limit' & 'page' params
     */
    public getSentCampaigns(params: GetCampaignsParams): Promise<AxiosResponse<ListCampaignsResponse>> {
        params.filter = {
            status: "sent"
        }

        return request(`/api/campaigns`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get stats for a sent campaign
     *
     * @campaign_id {String} - Campaign ID
     */
    public async getSentCampaignStats(campaign_id: string): Promise<CampaignStats | AxiosResponse> {

        validateId(campaign_id);

        const response = await request(`/api/campaigns/${campaign_id}`, {
            method: "GET"
        }, this.config);

        if (response.data && response.data.data && response.data.data.stats) {
            return response.data.data.stats;
        } else if (response.data && response.data.data && response.data.data.status !== 'sent') {
            throw new Error("No stats available. See if ID of a sent campaign was provided.");
        } else {
            throw new Error("No stats available. See if correct ID was provided.");
        }
    }

    /**
     * @description Get subscribers of sent campaign
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#get-subscribers-activity-of-a-sent-campaign
     *
     * @campaign_id {String} - Campaign ID
     * @requestBody {Object} - Subscriber data for create or update
     */
    public async getSentCampaignSubscribers(campaign_id: string, requestBody: CampaignSubscribersActivityParams): Promise<AxiosResponse<CampaignSubscribersActivityResponse, CampaignSubscribersActivityParams>> {

        validateId(campaign_id);

        return request(`/api/campaigns/${campaign_id}/reports/subscriber-activity`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Get a list of forms by type
     *
     * @see https://developers.mailerlite.com/docs/forms.html#list-all-forms
     *
     * @type {String} - Form type
     * @params {Object} - List forms params
     */
    public getFormsByType(type: FormTypes, params: GetFormsParams): Promise<AxiosResponse<ListFormsResponse>> {
        return request(`/api/forms/${type}`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get a stats (count) of a form by type
     *
     * @form_id {String} - Form ID
     */
    public async getFormsCountByType(type: FormTypes): Promise<number | AxiosResponse> {
        const response = await request(`/api/forms/${type}`, {
            method: "GET"
        }, this.config);

        if (response.data && response.data && response.data.meta && response.data.meta.aggregations) {
            return response.data.meta.aggregations[type];
        } else {
            throw new Error("No stats available.");
        }
    }

    /**
     * @description Get subscribers of a form
     *
     * @form_id {String} - Form ID
     * @params {Object} - List forms subscribers params
     */
    public getFormSubscribers(form_id: string, params: FormsSubscribersParams): Promise<AxiosResponse<ListSubscribersResponse>> {
        return request(`/api/forms/${form_id}/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description List all automations
     *
     * @see https://developers.mailerlite.com/docs/automations.html#list-all-automations
     *
     * @params {Object} - List automations params
     */
    public getAutomations(params: GetAutomationsParams): Promise<AxiosResponse<ListAutomationsResponse>> {
        return request('/api/automations', {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get stats for a specific automation
     *
     * @automation_id {String} - Automation ID
     */
    public async getAutomationStats(automation_id: string): Promise<AutomationStats | AxiosResponse> {

        validateId(automation_id);

        const response = await request(`/api/automations/${automation_id}`, {
            method: "GET"
        }, this.config);

        if (response.data && response.data.data && response.data.data.stats) {
            return response.data.data.stats;
        } else {
            throw new Error("No stats available.");
        }
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
