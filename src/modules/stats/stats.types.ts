import { AxiosResponse } from "axios";

import type { GetCampaignsParams, ListCampaignsResponse, CampaignStats } from '../campaigns/campaigns.types.js'
import type { SubscriberObject } from '../subscribers/subscribers.types.js'

export interface StatsInterface {
    getSentCampaigns:           (params: GetCampaignsParams)     => Promise<AxiosResponse<ListCampaignsResponse>>;
    getSentCampaignStats:       (campaign_id: string)   => Promise<CampaignStats | AxiosResponse>;
    getSentCampaignSubscribers: (campaign_id: string, requestBody: CampaignSubscribersActivityParams) => Promise<AxiosResponse<CampaignSubscribersActivityResponse>>;
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
