import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import { SegmentsInterface, GetSegmentsParams, ListAllSegmentsResponse, GetSegmentSubscribersParams, ListAllSubscribers, UpdateSegmentParams, SingleSegmentResponse} from "./segments.types.js";

export default class Segment implements SegmentsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List all segments
     *
     * @see https://developers.mailerlite.com/docs/segments.html#list-all-segments
     *
     * @params {Object} - List segment params
     */
    public get(params: GetSegmentsParams): Promise<AxiosResponse<ListAllSegmentsResponse>> {
        return request(`/api/segments`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Get subscribers belonging to a segment
     *
     * @see https://developers.mailerlite.com/docs/segments.html#get-subscribers-belonging-to-a-segment
     *
     * @segment_id {String} - Segment ID
     * @params {Object} - Segment params
     */
    public getSubscribers(segment_id: string, params: GetSegmentSubscribersParams): Promise<AxiosResponse<ListAllSubscribers>> {

        validateId(segment_id);

        return request(`/api/segments/${segment_id}/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Update segment
     *
     * @see https://developers.mailerlite.com/docs/segments.html#update-segment
     *
     * @segment_id {String} - Segment ID
     * @requestBody {Object} - Segment data for update
     */
    public update(segment_id: string, requestBody: UpdateSegmentParams): Promise<AxiosResponse<SingleSegmentResponse, UpdateSegmentParams>> {

        validateId(segment_id);

        return request(`/api/segments/${segment_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete segment
     *
     * @see https://developers.mailerlite.com/docs/segments.html#delete-segment
     *
     * @segment_id {String} - Form ID
     */
    public delete(segment_id: string): Promise<AxiosResponse<null>> {

        validateId(segment_id);

        return request(`/api/segments/${segment_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
