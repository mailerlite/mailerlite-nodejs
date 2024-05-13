import { AxiosResponse } from "axios";
import {SubscriberObject, Links} from "../../utils/types.js";

export interface SubscriberInterface {
    get:            (params: GetSubscribersParams)              => Promise<AxiosResponse<ListSubscribersResponse>>;
    createOrUpdate: (params: CreateOrUpdateSubscriberParams)    => Promise<AxiosResponse<SingleSubscriberResponse, CreateOrUpdateSubscriberParams>>;
    find:           (subscriber_id: string)                     => Promise<AxiosResponse<SingleSubscriberResponse>>;
    getCount:       ()                                          => Promise<AxiosResponse<CountSubscribersResponse>>;
    delete:         (subscriber_id: string)                     => Promise<AxiosResponse<null>>;
    forget:         (subscriber_id: string)                     => Promise<AxiosResponse<ForgetSubscriberResponse>>;
}

export interface GetSubscribersParams {
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
    page?:      number; // deprecated
    cursor?:    string;
    include?:   string;
}

export interface CreateOrUpdateSubscriberParams {
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

export interface CountSubscribersResponse {
    total: number;
}

export interface ForgetSubscriberResponse {
    message: string;
    data: SubscriberObject;
}
