import { AxiosResponse } from "axios";

export interface SubscriberInterface {
    get:            (params: GetParams) => Promise<AxiosResponse<any, any>>
    createOrUpdate: (params: CreateOrUpdateParams) => Promise<AxiosResponse<any, any>>
    find:           (subscriber_id: string) => Promise<AxiosResponse<any, any>>
    getCount:       () => Promise<AxiosResponse<any, any>>
    delete:         (subscriber_id: string) => Promise<AxiosResponse<any, any>>
}

export type GetParams = {
    filter?: {
        status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk" // because it should be looking like ?filter[status]=xxx
    };
    /**
     * @default 25
     */
    limit?: number;
    /**
     * @default 1
     */
    page?: number;
}

export type CreateOrUpdateParams = {
    email:              string
    fields?:	        object;
    groups?:	        Array<string>;
    status?:	        "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    subscribed_at?:	    string;
    ip_address?:	    string;
    opted_in_at?:	    string;
    optin_ip?:	        string;
    unsubscribed_at?:	string;
}
