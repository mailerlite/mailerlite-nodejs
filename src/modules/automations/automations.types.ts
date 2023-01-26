import { AxiosResponse } from "axios";
import { Email } from "../campaigns/campaigns.types.js";
import {Links, Meta, Stats} from "../types.js";

export interface AutomationsInterface {
    get:                        (params: GetAutomationsParams)                          => Promise<AxiosResponse<ListAutomationsResponse>>;
    find:                       (automation_id: string)                                 => Promise<AxiosResponse<SingleAutomationResponse>>;
    getAutomationSubscribers:   (automation_id: string, params: AutomationSubsParams)   => Promise<AxiosResponse<AutomationSubsResponse>>;
}

export interface GetAutomationsParams {
    filter?: {
        status?:    boolean;
        name?:      string;
        group?:     string;
    };
    /**
     * @default 10
     */
    limit?: number;
    /**
     * @default 1
     */
    page?:  number;
}

export interface AutomationSubsParams {
    filter: {
        status:             "completed" | "active" | "canceled" | "failed";
        date_from?:         Date;
        date_to?:           Date;
        scheduled_from?:    Date;
        scheduled_to?:      Date;
        keyword?:           string;
    };
    /**
     * @default 10
     */
    limit?: number;
    /**
     * @default 1
     */
    page?:  number;
}

export interface ListAutomationsResponse {
    data:   Array<AutomationObject>;
    links:  Links;
    meta:   ListAutomationsResponseMeta;
}

export interface AutomationSubsResponse {
    data:   Array<AutomationSubObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleAutomationResponse {
    data: AutomationObject;
}

interface AutomationSubObject {
    id:                 string;
    status:             string;
    date:               string;
    reason:             string;
    reason_description: string;
    subscriber: {
        id:             string;
        email:          string;
    };
    stepRuns: Array<{
        id:             string;
        step_id:        string;
        description:    string;
        scheduled_for:  string;
    }>;
    currentStep: {
        id:             string;
        type:           string;
        parent_id:      string;
        name:           string;
        subject:        string;
        from:           string;
        from_name:      string;
        email_id:       string;
        email:          Email;
    };
    language_id:        number;
    complete:           boolean;
    created_at:         string;
    updated_at:         string;
    track_opens:        boolean;
    google_analytics:   string;
    tracking_was_disabled: boolean;
    description:        string;
}

interface AutomationObject {
    id:         string;
    name:       string;
    enabled:    boolean;
    trigger_data: {
        group_id:               string;
        exclude_group_ids:      Array<string>;
        valid:                  boolean
    };
    steps:                      Array<AutomationStep | AutomationEmailStep>;
    triggers:                   Array<AutomationTriggers>;
    complete:                   boolean;
    broken:                     boolean;
    warnings:                   Array<string>;
    emails_count:               number;
    first_email_screenshot_url: string;
    stats:                      AutomationStats;
    created_at:                 string;
    has_banned_content:         boolean;
    qualified_subscribers_count: number;
}

export interface AutomationStats extends Stats {
    completed_subscribers_count:    number;
    subscribers_in_queue_count:     number;
    bounce_rate: {
        float:  number;
        string: string;
    };
    click_to_open_rate: {
        float:  number;
        string: string;
    };
}

interface AutomationStep {
    id:             string;
    type:           string;
    parent_id:      string;
    unit:           string;
    complete:       boolean;
    created_at:     string;
    updated_at:     string;
    value:          string;
    description:    string;
}

interface AutomationEmailStep {
    id:                     string;
    type:                   string;
    parent_id:              string;
    name:                   string;
    subject:                string;
    from:                   string;
    from_name:              string;
    email_id:               string;
    email:                  Email;
    language_id:            number;
    complete:               boolean;
    created_at:             string;
    updated_at:             string;
    track_opens:            boolean;
    google_analytics:       string;
    tracking_was_disabled:  boolean;
    description:            string;
}

interface AutomationTriggers {
    id:         string;
    type:       string;
    group_id:   string;
    group: {
        id:     string;
        name:   string;
        url:    string
    };
    exclude_group_ids:  Array<string>;
    excluded_groups:    Array<string>;
    broken:             boolean;
}

interface ListAutomationsResponseMeta extends Meta {
    total_unfiltered:   number
}
