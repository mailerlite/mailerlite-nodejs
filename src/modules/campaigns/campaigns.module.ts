import { validateId } from '../helpers.js';
import request from '../../fetch.js'

import type { Config }  from '../types.js'
import { AxiosResponse } from "axios";
import type { CampaignsInterface, GetCampaignsParams, ListCampaignsResponse, SingleCampaignResponse, CreateUpdateParams, ScheduleParams } from './campaigns.types.js';

export default class Campaign implements CampaignsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List campaigns
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#campaign-list
     *
     * @params {Object} - List campaigns params
     */
    public get(params: GetCampaignsParams): Promise<AxiosResponse<ListCampaignsResponse>> {
        return request(`/api/campaigns`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Fetch a campaign by ID
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#get-a-campaign
     *
     * @campaign_id {String} - Campaign ID
     */
    public find(campaign_id: string): Promise<AxiosResponse<SingleCampaignResponse>> {

        validateId(campaign_id);

        return request(`/api/campaigns/${campaign_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create a campaign
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#create-a-campaign
     *
     * @requestBody {Object} - Campaign data for create
     */
    public create(requestBody: CreateUpdateParams): Promise<AxiosResponse<SingleCampaignResponse, CreateUpdateParams>> {
        return request(`/api/campaigns`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a campaign
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#update-campaign
     *
     * @campaign_id {String} - Campaign ID
     * @requestBody {Object} - Campaign data for update
     */
    public update(campaign_id: string, requestBody: CreateUpdateParams): Promise<AxiosResponse<SingleCampaignResponse, CreateUpdateParams>> {

        validateId(campaign_id);

        return request(`/api/campaigns/${campaign_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Schedule a campaign
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#schedule-a-campaign
     *
     * @campaign_id {String} - Campaign ID
     * @requestBody {Object} - Campaign data for schedule
     */
    public schedule(campaign_id: string, requestBody: ScheduleParams): Promise<AxiosResponse<SingleCampaignResponse, ScheduleParams>> {

        validateId(campaign_id);

        return request(`/api/campaigns/${campaign_id}/schedule`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Cancel a ready campaign
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#cancel-a-ready-campaign
     *
     * @campaign_id {String} - Campaign ID
     */
    public cancel(campaign_id: string): Promise<AxiosResponse<SingleCampaignResponse>> {

        validateId(campaign_id);

        return request(`/api/campaigns/${campaign_id}/cancel`, {
            method: "POST"
        }, this.config);
    }

    /**
     * @description Delete a campaign
     *
     * @see https://developers.mailerlite.com/docs/campaigns.html#delete-a-campaign
     *
     * @campaign_id {String} - Campaign ID
     */
    public delete(campaign_id: string): Promise<AxiosResponse<null>> {

        validateId(campaign_id);

        return request(`/api/campaigns/${campaign_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
