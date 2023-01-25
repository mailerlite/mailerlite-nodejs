import { AxiosResponse } from "axios";
import {Links} from "../types";

export interface FormsInterface {
    get:            (type: FormTypes, params: GetFormsParams)       => Promise<AxiosResponse<ListFormsResponse>>;
    update:         (form_id: string, params: UpdateParams)         => Promise<AxiosResponse<SingleFormResponse, UpdateParams>>;
    delete:         (form_id: string)                               => Promise<AxiosResponse<null>>;
}

export type FormTypes = "popup" | "embedded" | "promotion";

export interface GetFormsParams {
    limit?: number;
    page?:  number;
    filter?: {
        name?: string;
    };
    sort?: "created_at" | "-created_at" | "name" | "-name" | "conversions_count" | "-conversions_count" | "opens_count" | "-opens_count" | "visitors" | "-visitors" | "conversion_rate" | "-conversion_rate" | "last_registration_at" | "-last_registration_at";
}

export interface ListFormsResponse {
    data:   Array<FormObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleFormResponse {
    data: FormObject;
}

export interface UpdateParams {
    name: string;
}

export interface FormObject {
    id:                   string;
    type:                 string;
    slug:                 string;
    name:                 string;
    created_at:           string;
    conversions_count:    number;
    opens_count:          number;
    conversion_rate: {
        float:            number;
        string:           string;
    };
    settings:             Array<string>;
    last_registration_at: string;
    active:               boolean;
    is_broken:            boolean;
    has_content:          boolean;
    can: {
        update:           boolean;
    };
    used_in_automations:  boolean;
    warnings:             Array<string>;
    double_optin:         string;
    screenshot_url:       string;
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
        popup:      number;
        embedded:   number;
        promotion:  number;
    }
}
