import { AxiosResponse } from "axios";
import { Links, Meta, Rate, SubscriberReference } from "../../utils/types.js";
import type { AutomationAbPath } from "../automation-steps/automation-steps.types.js";
import { Email } from "../campaigns/campaigns.types.js";

export interface AutomationReportsInterface {
    getStepRunCounts:           (automation_id: string)                                                         => Promise<AxiosResponse<ListAutomationStepRunCountsResponse>>;
    findStepRunCounts:          (automation_id: string, step_id: string)                                        => Promise<AxiosResponse<SingleAutomationStepRunCountsResponse>>;
    getTriggerRunCounts:        (automation_id: string)                                                         => Promise<AxiosResponse<AutomationTriggersRunCountsResponse>>;
    findTriggerRunCounts:       (automation_id: string, trigger_id: string)                                     => Promise<AxiosResponse<SingleAutomationTriggerRunCountsResponse>>;
    getAbStepsStats:            (automation_id: string)                                                         => Promise<AxiosResponse<ListAutomationAbStepStatsResponse>>;
    findAbStepStats:            (automation_id: string, step_id: string)                                        => Promise<AxiosResponse<SingleAutomationAbStepStatsResponse>>;
    getStepSubscribers:         (automation_id: string, step_id: string, params: GetAutomationActivitySubscribersParams)    => Promise<AxiosResponse<ListAutomationActivitySubscribersResponse>>;
    getTriggerSubscribers:      (automation_id: string, trigger_id: string, params: GetAutomationActivitySubscribersParams) => Promise<AxiosResponse<ListAutomationActivitySubscribersResponse>>;
    getOrderActivity:           (automation_id: string, params: GetAutomationOrderActivityParams)               => Promise<AxiosResponse<ListAutomationOrderActivityResponse>>;
    getMonthlyEmailTotals:      (automation_id: string, params?: AutomationReportPeriodParams)                  => Promise<AxiosResponse<AutomationEmailStatsResponse>>;
    getMonthlyEcommerceTotals:  (automation_id: string, params?: AutomationReportPeriodParams)                  => Promise<AxiosResponse<AutomationEcommerceTotalsResponse>>;
}

export interface AutomationReportPeriodParams {
    start_date?:    string;
    end_date?:      string;
    shop_id?:       string;
}

export interface AutomationStepRunCountsObject {
    step_id:                string;
    completed_step_runs:    number;
    in_queue_step_runs:     number;
}

export interface ListAutomationStepRunCountsResponse {
    data: Array<AutomationStepRunCountsObject>;
}

export interface SingleAutomationStepRunCountsResponse {
    data: AutomationStepRunCountsObject;
}

export interface AutomationTriggerRunCountsObject {
    completed_runs: number;
    queued_runs:    number;
}

export interface AutomationTriggersRunCountsResponse {
    data: {
        triggers:       Array<AutomationTriggerRunCountsObject & { id: string }>;
        manual_runs: {
            completed_runs:     number;
            in_progress_runs:   number;
        };
    };
}

export interface SingleAutomationTriggerRunCountsResponse {
    data: AutomationTriggerRunCountsObject;
}

export interface AutomationAbStepPathStats {
    subscribers:        number;
    sent:               number;
    opens:              number;
    clicks:             number;
    open_rate:          Rate;
    click_rate:         Rate;
    click_to_open_rate: Rate;
}

export interface AutomationAbStepStatsObject {
    step_id:            string;
    name:               string;
    ab_test_winner:     AutomationAbPath | null;
    parent_id:          string | null;
    can_select_winner:  boolean;
    a_path_step_id:     string | null;
    b_path_step_id:     string | null;
    c_path_step_id:     string | null;
    split_percentages:  Array<{
        path:   string;
        label:  string;
        value:  number;
    }>;
    stats:              Record<string, AutomationAbStepPathStats>;
}

export interface ListAutomationAbStepStatsResponse {
    data: Array<AutomationAbStepStatsObject>;
}

export interface SingleAutomationAbStepStatsResponse {
    data: AutomationAbStepStatsObject;
}

export interface GetAutomationActivitySubscribersParams {
    status: "completed" | "queued";
    filter?: {
        date_from?: string;
        date_to?:   string;
        search?:    string;
        id?:        string;
    };
    limit?: number;
    page?:  number;
    sort?:  "date" | "-date" | "email" | "-email";
}

export interface AutomationActivitySubscriberObject {
    id:         string;
    date:       string;
    subscriber: SubscriberReference;
}

export interface ListAutomationActivitySubscribersResponse {
    data:   Array<AutomationActivitySubscriberObject>;
    links:  Links;
    meta:   Meta;
}

export interface GetAutomationOrderActivityParams {
    time_frame:         "week" | "month" | "two_months" | "three_months" | "six_months" | "year" | "last_year" | "all_time" | "custom";
    time_frame_start?:  string;
    time_frame_end?:    string;
    ecommerce_shop_id?: string;
    limit?:             number;
    page?:              number;
}

export interface AutomationOrderActivityObject {
    subscriber: SubscriberReference;
    total:      number;
    updated_at: string;
    order:      string | null;
    email?:     Email;
}

export interface ListAutomationOrderActivityResponse {
    data:   Array<AutomationOrderActivityObject>;
    links:  Links;
    meta:   Meta;
}

export interface AutomationEmailStatsResponse {
    data: {
        engagement: {
            sent:                       number;
            opens_count:                number;
            clicks_count:               number;
            total_opens_count:          number;
            total_clicks_count:         number;
            open_rate:                  Rate | null;
            click_rate:                 Rate | null;
            click_to_open_rate:         Rate | null;
            forwards_count:             number;
            forward_rate:               Rate;
            social_interactions_count:  number;
            social_interaction_rate:    Rate;
        };
        deliverability: {
            sent:               number;
            delivered_count:    number;
            delivered_rate:     Rate | null;
            hard_bounces_count: number;
            hard_bounce_rate:   Rate | null;
            soft_bounces_count: number;
            soft_bounce_rate:   Rate | null;
            spam_count:         number;
            spam_rate:          Rate | null;
            unsubscribes_count: number;
            unsubscribe_rate:   Rate | null;
        };
    };
}

export interface AutomationEcommerceStatsObject {
    orders_count:           number;
    revenue:                number;
    average_order_value:    number | string;
    conversion_rate?:       string | null;
}

export interface AutomationEcommerceStatsResponse {
    data: {
        ecommerce: AutomationEcommerceStatsObject;
    };
}

export interface AutomationEcommerceTotalsResponse {
    data: {
        ecommerce:              AutomationEcommerceStatsObject;
        best_performing_email:  Record<string, unknown> | null;
    };
}
