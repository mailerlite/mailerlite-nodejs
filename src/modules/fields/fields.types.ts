import { AxiosResponse } from "axios";
import {Links, Meta} from "../types";

export interface FieldsInterface {
    get:    (params: GetParams)                         => Promise<AxiosResponse<ListAllResponse>>;
    create: (params: CreateParams)                      => Promise<AxiosResponse<SingleFieldResponse, CreateParams>>;
    update: (field_id: string, params: UpdateParams)    => Promise<AxiosResponse<SingleFieldResponse, UpdateParams>>;
    delete: (field_id: string)                          => Promise<AxiosResponse<null>>;
}

export type FilterTypes = "text" | "number" | "date";

export interface GetParams {
    limit?: number;
    page?:  number;
    filter?: {
        keyword?: string;
        type?: FilterTypes;
    };
    sort?: "name" | "-name" | "type" | "-type"
}

export interface ListAllResponse {
    data:   Array<FieldObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleFieldResponse {
    data: FieldObject;
}

export interface CreateParams {
    name: string;
    type: string;
}

export interface UpdateParams {
    name: string;
}

interface FieldObject {
    id:     string;
    name:   string;
    key:    string;
    type:   string;
}
