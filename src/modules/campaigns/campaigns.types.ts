import { AxiosResponse } from "axios";

export interface CampaignsInterface {
    get:            (params: GetCampaignsParams)                                 => Promise<AxiosResponse<ListCampaignsResponse>>;
    find:           (campaign_id: string)                               => Promise<AxiosResponse<SingleCampaignResponse>>;
    create:         (params: CreateUpdateParams)                        => Promise<AxiosResponse<SingleCampaignResponse, CreateUpdateParams>>;
    update:         (campaign_id: string, params: CreateUpdateParams)   => Promise<AxiosResponse<SingleCampaignResponse, CreateUpdateParams>>;
    schedule:       (campaign_id: string, params: ScheduleParams)       => Promise<AxiosResponse<SingleCampaignResponse, ScheduleParams>>;
    cancel:         (campaign_id: string)                               => Promise<AxiosResponse<SingleCampaignResponse>>;
    delete:         (campaign_id: string)                               => Promise<AxiosResponse<null>>;
}

export interface GetCampaignsParams {
    filter?: {
        /**
         * @default "ready"
         */
        status?: "sent" | "draft" | "ready";
        /**
         * @default return all types
         */
        type?: "regular" | "ab" | "resend" | "rss";
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

export interface ListCampaignsResponse {
    data: Array<CampaignObject>;
    meta: Meta;
}

export interface SingleCampaignResponse {
    data: CampaignObject;
}

export interface CreateUpdateParams {
    name:	                string;
    language_id?:	        number;
    type:	                "regular" | "ab" | "resend";
    emails:	Array<{
        subject:	        string;
        from_name:	        string;
        from:	            string;
        content?:	        string;
    }>
    groups?:	            Array<string>;
    segments?:	            Array<string>;
    ab_settings?: {
        test_type?:	        "subject" | "sender";
        select_winner_by?:	"o" | "c";
        after_time_amount?:	number;
        after_time_unit?:	"h" | "d";
        test_split?:	    number;
        b_value?: {
            subject?:	    string;
            from_name?:	    string;
            from?:	        string;
        }
    }
    resend_settings?: {
        test_type?:	        "subject";
        select_winner_by?:	"o" | "c";
        b_value?: {
            subject?:	    string;
        }
    }
}

export interface ScheduleParams {
    delivery?:	         "instant" | "scheduled" | "timezone_based";
    schedule?: {
        date?:           string;
        hours?:          string;
        minutes?:        string;
        timezone_id?:    number;
    }
    resend?: {
        delivery?:	    "day" | "scheduled";
        date?:	        string;
        hours?:	        string;
        minutes?:	    string;
        timezone_id?:	number;
    }
}

interface CampaignObject {
    id:             string;
    account_id:     string;
    name:           string;
    type:           string;
    status:         string;
    missing_data:   Array<string>;
    settings: {
        track_opens:            string;
        use_google_analytics:   string;
        ecommerce_tracking:     string;
    };
    filter: [
        [
            {
                operator:   string;
                args:       [string, Array<string>];
            }
        ]
    ];
    filter_for_humans:      [Array<string>];
    delivery_schedule:      string;
    language_id:            string;
    created_at:             string;
    updated_at:             string;
    scheduled_for:          string;
    queued_at:              string;
    started_at:             string;
    finished_at:            string;
    stopped_at:             string;
    default_email_id:       string;
    emails:                 Array<Email>;
    used_in_automations:    boolean;
    type_for_humans:        string;
    stats: CampaignStats;
    is_stopped:                     boolean;
    has_winner:                     boolean;
    winner_version_for_human:       string;
    winner_sending_time_for_humans: string;
    winner_selected_manually_at:    string;
    uses_ecommerce:                 boolean;
    uses_survey:                    boolean;
    can_be_scheduled:               boolean;
    warnings:                       Array<string>;
    initial_created_at:             string;
    is_currently_sending_out:       boolean;
}

interface Email {
    id:               string;
    account_id:       string;
    emailable_id:     string;
    emailable_type:   string;
    type:             string;
    from:             string;
    from_name:        string;
    name:             string;
    subject:          string;
    plain_text:       string;
    screenshot_url:   string;
    preview_url:      string;
    created_at:       string;
    updated_at:       string;
    is_designed:      boolean;
    language_id:      string;
    is_winner:        boolean;
    stats: {
        sent:                 number;
        opens_count:          number;
        unique_opens_count:   number;
        open_rate: {
            float:            number;
            string:           string;
        };
        clicks_count:         number;
        unique_clicks_count:  number;
        click_rate: {
            float:            number;
            string:           string;
        };
        unsubscribes_count:   number;
        unsubscribe_rate: {
            float:            number;
            string:           string;
        };
        spam_count:           number;
        spam_rate: {
            float:            number;
            string:           string;
        };
        hard_bounces_count:   number;
        hard_bounce_rate: {
            float:            number;
            string:           string;
        };
        soft_bounces_count:   number;
        soft_bounce_rate: {
            float:            number;
            string:           string;
        };
        forwards_count:       number;
    };
    send_after:               string;
    track_opens:              boolean;
}

export interface CampaignStats {
    sent:               number;
    opens_count:        number;
    unique_opens_count: number;
    open_rate: {
        float:          number;
        string:         string;
    };
    clicks_count:       number;
    unique_clicks_count:number;
    click_rate: {
        float:          number;
        string:         string;
    };
    unsubscribes_count: number;
    unsubscribe_rate: {
        float:          number;
        string:         string;
    };
    spam_count:         number;
    spam_rate: {
        float:          number;
        string:         string;
    };
    hard_bounces_count: number;
    hard_bounce_rate: {
        float:          number;
        string:         string;
    };
    soft_bounces_count: number;
    soft_bounce_rate: {
        float:          number;
        string:         string;
    };
    forwards_count:     number;
    click_to_open_rate: {
        float:          number;
        string:         string;
    }
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
    aggregations: {
        total:      number;
        draft:      number;
        ready:      number;
        sent:       number;
    }
}
