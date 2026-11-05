import { AxiosResponse } from "axios";
import {SubscriberObject, Links, Meta, CursorMeta} from "../../utils/types.js";

export interface SegmentsInterface {
    get:            (params: GetSegmentsParams)                                 => Promise<AxiosResponse<ListAllSegmentsResponse>>;
    getSubscribers: (segment_id: string, params: GetSegmentSubscribersParams)   => Promise<AxiosResponse<ListAllSubscribers>>;
    update:         (segment_id: string, params: UpdateSegmentParams)           => Promise<AxiosResponse<SingleSegmentResponse, UpdateSegmentParams>>;
    delete:         (segment_id: string)                                        => Promise<AxiosResponse<null>>;
}

export interface GetSegmentsParams {
    limit?: number;
    page?:  number;
    sort?:  "name" | "-name" | "total" | "-total" | "open_rate" | "-open_rate" | "click_rate" | "-click_rate" | "created_at" | "-created_at" | (string & {});
    with_filter?: boolean;
}

export interface GetSegmentSubscribersParams {
    filter?: {
        status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    };
    limit?: number;
    after?: number;
    cursor?: string;
}

export interface ListAllSegmentsResponse {
    data:   Array<SegmentObject>;
    links:  Links;
    meta:   Meta;
}

export interface ListAllSubscribers {
    data: Array<SubscriberObject>;
    links: Links;
    meta: {
        total: number;
        count: number;
        last:  number;
    } & CursorMeta;
}

export interface SingleSegmentResponse {
    data: SegmentObject;
}

export interface UpdateSegmentParams {
    name?:      string;
    filter?:    Array<Array<SegmentFilterRule>>;
}

export interface SegmentFilterRule {
    operator:   string;
    args:       Array<unknown>;
}

export interface SegmentObject {
    id:             string;
    name:           string;
    total:          number;
    open_rate: {
        float:      number;
        string:     string;
    };
    click_rate: {
        float:      number;
        string:     string;
    },
    created_at:     string;
    filter?:        Array<Array<SegmentFilterRule>>;
    automations_using_segment_count?: number;
}

