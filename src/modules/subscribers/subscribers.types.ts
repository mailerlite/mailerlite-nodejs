import { AxiosResponse } from "axios";
import {Links} from "../../utils/types.js";

export interface SubscriberInterface {
    get:            (params: GetParams)             => Promise<AxiosResponse<ListSubscribersResponse>>;
    createOrUpdate: (params: CreateOrUpdateParams)  => Promise<AxiosResponse<SingleSubscriberResponse, CreateOrUpdateParams>>;
    find:           (subscriber_id: string)         => Promise<AxiosResponse<SingleSubscriberResponse>>;
    getCount:       ()                              => Promise<AxiosResponse<SubscribersCountResponse>>;
    delete:         (subscriber_id: string)         => Promise<AxiosResponse<null>>;
    forget:         (subscriber_id: string)         => Promise<AxiosResponse<SubscriberForgetResponse>>;
}

export interface GetParams {
    filter?: {
        status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk"; // because it should be looking like ?filter[status]=xxx
    };
    /**
     * @default 25
     */
    limit?: number;
    /**
     * @default 1
     */
    cursor?: string;
}

export interface CreateOrUpdateParams {
    email:              string;
    fields?:	        object;
    groups?:	        Array<string>;
    status?:	        "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    subscribed_at?:	    string;
    ip_address?:	    string;
    opted_in_at?:	    string;
    optin_ip?:	        string;
    unsubscribed_at?:	string;
}

export interface SubscriberObject {
    id:             string;
    email:          string;
    status:         string;
    source:         string;
    sent:           number;
    opens_count:    number;
    clicks_count:   number;
    open_rate:      number;
    click_rate:     number;
    ip_address:     string;
    subscribed_at:  string;
    unsubscribed_at:string;
    created_at:     string;
    updated_at:     string;
    fields: {
        city:       string;
        company:    string;
        country:    string;
        last_name:  string;
        name:       string;
        phone:      string;
        state:      string;
        z_i_p:      string;
    }
    groups:         Array<string>;
    opted_in_at:    string;
    optin_ip:       string;
}

export interface ListSubscribersResponse {
    data:   Array<SubscriberObject>;
    links:  Links;
    meta: {
        path: string;
        per_page: number;
        next_cursor: string;
        prev_cursor: string;
    };
}

export interface SingleSubscriberResponse {
    data: SubscriberObject;
}

export interface SubscribersCountResponse {
    total: number;
}

export interface SubscriberForgetResponse {
    message: string;
    data: SubscriberObject;
}
