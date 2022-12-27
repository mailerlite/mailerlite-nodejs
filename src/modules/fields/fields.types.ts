import { AxiosResponse } from "axios";

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
    data: Array<FieldObject>;
    links: {
        first:  string;
        last:   string;
        prev:   string;
        next:   string;
    };
    meta: Meta;
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

interface Meta {
    current_page:   number;
    from:           number;
    last_page:      number;
    links:          Array<object>;
    path:           string;
    per_page:       number;
    to:             number;
    total:          number;
}
