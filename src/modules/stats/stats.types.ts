import { AxiosResponse } from "axios";

import { GetCampaignsParams, ListCampaignsResponse, CampaignStats } from '../campaigns/campaigns.types.js'
import { SubscriberObject } from '../subscribers/subscribers.types.js'
import { FormTypes, GetFormsParams, ListFormsResponse } from "../forms/forms.types";
import { ListSubscribersResponse } from "../subscribers/subscribers.types.js";
import {
    AutomationStats, AutomationSubsParams, AutomationSubsResponse,
    GetAutomationsParams, ListAutomationsResponse
} from "../automations/automations.types";

export interface StatsInterface {
    getSentCampaigns:           (params: GetCampaignsParams)                                            => Promise<AxiosResponse<ListCampaignsResponse>>;
    getSentCampaignStats:       (campaign_id: string)                                                   => Promise<CampaignStats | AxiosResponse>;
    getSentCampaignSubscribers: (campaign_id: string, requestBody: CampaignSubscribersActivityParams)   => Promise<AxiosResponse<CampaignSubscribersActivityResponse>>;

    getFormsByType:         (type: FormTypes, params: GetFormsParams)           => Promise<AxiosResponse<ListFormsResponse>>;
    getFormsCountByType:    (type: FormTypes)                                   => Promise<number | AxiosResponse>;
    getFormSubscribers:     (form_id: string, params: FormsSubscribersParams)   => Promise<AxiosResponse<ListSubscribersResponse>>;

    getAutomations:             (params: GetAutomationsParams)                          => Promise<AxiosResponse<ListAutomationsResponse>>;
    getAutomationStats:         (automation_id: string)                                 => Promise<AutomationStats | AxiosResponse>;
    getAutomationSubscribers:   (automation_id: string, params: AutomationSubsParams)   => Promise<AxiosResponse<AutomationSubsResponse>>;
}

export interface CampaignSubscribersActivityParams {
    filter?: {
        type?:      "opened" | "unopened" | "clicked" | "unsubscribed" | "forwarded" | "hardbounced" | "softbounced" | "junk";
        search?:    string;
    },
    /**
     * @default "ready"
     */
    limit?: 10 | 25 | 50 | 100;
    /**
     * @default "id"
     */
    sort?:  "id" | "updated_at" | "clicks_count" | "opens_count";
    page?:  number;
}

export interface FormsSubscribersParams {
    /**
     * @default active
     */
    filter?: {
        status?: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    },
    /**
     * @default 25
     */
    limit?: number;
    /**
     * @default 1
     */
    page?:  number;
}

export interface CampaignSubscribersActivityResponse {
    data:   Array<ActivityObject>,
    links:  Array<object>;
    meta:   Meta
}

interface ActivityObject {
    id:             string;
    opens_count:    number;
    clicks_count:   number;
    subscriber:     SubscriberObject;
}

interface Meta {
    current_page:   number;
    from:           number;
    last_page:      number;
    links:          Array<object>;
    path:           string;
    per_page:       number;
    to:             number;
    total:          number;
    counts: {
        all:            number;
        opened:         number;
        unopened:       number;
        clicked:        number;
        unsubscribed:   number;
        forwarded:      number;
        hardbounced:    number;
        softbounced:    number;
        junk:           number;
    }
}
