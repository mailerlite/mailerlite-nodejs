import { AxiosResponse } from "axios";
import {Links, Meta} from "../types";

export interface SegmentsInterface {
    get:            (params: GetParams)                                 => Promise<AxiosResponse<ListAllResponse>>;
    getSubscribers: (segment_id: string, params: GetSubscribersParams)  => Promise<AxiosResponse<ListAllSubscribers>>;
    update:         (segment_id: string, params: UpdateParams)          => Promise<AxiosResponse<SingleSegmentResponse, UpdateParams>>;
    delete:         (segment_id: string)                                => Promise<AxiosResponse<null>>;
}

export interface GetParams {
    limit?: number;
    page?:  number;
}

export interface GetSubscribersParams {
    filter?: {
        status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    };
    limit?: number;
    after?: number;
}

export interface ListAllResponse {
    data:   Array<SegmentObject>;
    links:  Links;
    meta:   Meta;
}

export interface ListAllSubscribers {
    data: Array<SubscriberObject>;
    meta: {
        total: number;
        count: number;
        last:  number;
    }
}

export interface SingleSegmentResponse {
    data: SegmentObject;
}

export interface UpdateParams {
    name: string;
}

interface SegmentObject {
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
}

interface SubscriberObject {
    id:               string;
    email:            string;
    status:           string;
    source:           string;
    sent:             number;
    opens_count:      number;
    clicks_count:     number;
    open_rate:        number;
    click_rate:       number;
    ip_address:       string;
    subscribed_at:    string;
    unsubscribed_at:  string;
    created_at:       string;
    updated_at:       string;
    fields: {
        city:         string;
        company:      string;
        country:      string;
        last_name:    string;
        name:         string;
        phone:        string;
        state:        string;
        z_i_p:        string;
    };
    groups:           Array<string>;
    opted_in_at:      string;
    optin_ip:         string;
}
