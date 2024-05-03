import { AxiosResponse } from "axios";
import {Links, Meta} from "../../utils/types.js";

export interface FormsInterface {
    get:            (type: FormTypes, params: GetFormsParams)       => Promise<AxiosResponse<ListFormsResponse>>;
    update:         (form_id: string, params: UpdateFormParams)     => Promise<AxiosResponse<SingleFormResponse, UpdateFormParams>>;
    delete:         (form_id: string)                               => Promise<AxiosResponse<null>>;
}

export type FormTypes = "popup" | "embedded" | "promotion";

export interface GetFormsParams {
    limit?: number;
    page?:  number; //deprecated
    filter?: {
        name?: string;
    };
    sort?: "created_at" | "-created_at" | "name" | "-name" | "conversions_count" | "-conversions_count" | "opens_count" | "-opens_count" | "visitors" | "-visitors" | "conversion_rate" | "-conversion_rate" | "last_registration_at" | "-last_registration_at";
}

export interface ListFormsResponse {
    data:   Array<FormObject>;
    links:  Links;
    meta:   FormsMeta;
}

export interface SingleFormResponse {
    data: FormObject;
}

export interface UpdateFormParams {
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

export interface FormsMeta extends Meta {
    aggregations: {
        popup:      number;
        embedded:   number;
        promotion:  number;
    }
}
