import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    GetSubscribersParams,
    CreateOrUpdateSubscriberParams,
    SubscriberInterface,
    ListSubscribersResponse,
    SingleSubscriberResponse,
    CountSubscribersResponse,
    ForgetSubscriberResponse,
    UpdateSubscriberParams,
    GetSubscriberActivityLogParams,
    ListSubscriberActivityLogResponse,
    SingleSubscriberImportResponse
} from './subscribers.types.js';

export default class Subscriber implements SubscriberInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List Subscribers
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#list-all-subscribers
     *
     * @params {Object} - List Subscribers params
     */
    public get(params: GetSubscribersParams): Promise<AxiosResponse<ListSubscribersResponse>> {
        return request(`/api/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Create or update a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#create-update-subscriber
     *
     * @requestBody {Object} - Subscriber data for create or update
     */
    public createOrUpdate(requestBody: CreateOrUpdateSubscriberParams): Promise<AxiosResponse<SingleSubscriberResponse, CreateOrUpdateSubscriberParams>> {
        return request(`/api/subscribers`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#update-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     * @requestBody {Object} - Subscriber data for update
     */
    public update(subscriber_id: string, requestBody: UpdateSubscriberParams): Promise<AxiosResponse<SingleSubscriberResponse, UpdateSubscriberParams>> {
        return request(`/api/subscribers/${pathSegment(subscriber_id)}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Fetch a subscriber by ID
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     */
    public find(subscriber_id: string): Promise<AxiosResponse<SingleSubscriberResponse>> {
        return request(`/api/subscribers/${pathSegment(subscriber_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Fetch total subscribers count
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-total-subscribers-count
     */
    public getCount(): Promise<AxiosResponse<CountSubscribersResponse>> {
        const params = {
            limit: 0
        }

        return request(`/api/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Delete a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#delete-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     */
    public delete(subscriber_id: string): Promise<AxiosResponse<null>> {
        return request(`/api/subscribers/${pathSegment(subscriber_id)}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Forget a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#forget-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     */
    public forget(subscriber_id: string): Promise<AxiosResponse<ForgetSubscriberResponse>> {
        return request(`/api/subscribers/${pathSegment(subscriber_id)}/forget`, {
            method: "POST"
        }, this.config);
    }

    /**
     * @description Fetch subscriber activity
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-subscriber-activity
     *
     * @subscriber_id {String} - Subscriber ID
     * @params {Object} - Activity log params
     */
    public getActivityLog(subscriber_id: string, params?: GetSubscriberActivityLogParams): Promise<AxiosResponse<ListSubscriberActivityLogResponse>> {
        return request(`/api/subscribers/${pathSegment(subscriber_id)}/activity-log`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get single import
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#get-single-import
     *
     * @import_id {String} - Import ID
     */
    public getImport(import_id: string): Promise<AxiosResponse<SingleSubscriberImportResponse>> {
        return request(`/api/subscribers/import/${pathSegment(import_id)}`, {
            method: "GET"
        }, this.config);
    }
};
