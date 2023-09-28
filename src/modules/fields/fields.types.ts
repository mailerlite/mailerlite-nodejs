import { AxiosResponse } from "axios";
import {Links, Meta} from "../../utils/types.js";

export interface FieldsInterface {
    get:    (params: GetFieldsParams)                       => Promise<AxiosResponse<ListFieldsResponse>>;
    create: (params: CreateFieldParams)                     => Promise<AxiosResponse<SingleFieldResponse, CreateFieldParams>>;
    update: (field_id: string, params: UpdateFieldParams)   => Promise<AxiosResponse<SingleFieldResponse, UpdateFieldParams>>;
    delete: (field_id: string)                              => Promise<AxiosResponse<null>>;
}

export type FilterTypes = "text" | "number" | "date";

export interface GetFieldsParams {
    limit?: number;
    page?:  number;
    filter?: {
        keyword?: string;
        type?: FilterTypes;
    };
    sort?: "name" | "-name" | "type" | "-type"
}

export interface ListFieldsResponse {
    data:   Array<FieldObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleFieldResponse {
    data: FieldObject;
}

export interface CreateFieldParams {
    name: string;
    type: string;
}

export interface UpdateFieldParams {
    name: string;
}

interface FieldObject {
    id:     string;
    name:   string;
    key:    string;
    type:   string;
}
