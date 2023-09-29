import { AxiosResponse } from "axios";

export interface TimezonesInterface {
    get:    ()  => Promise<AxiosResponse<ListAllTimezonesResponse>>;
}

export interface ListAllTimezonesResponse {
    data: Array<TimezoneObject>;
}

export interface TimezoneObject {
    id:                 string;
    name:               string;
    name_for_humans:    string;
    offset_name:        string;
    offset:             number;
}
