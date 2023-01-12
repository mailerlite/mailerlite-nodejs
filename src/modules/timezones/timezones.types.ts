import { AxiosResponse } from "axios";

export interface TimezonesInterface {
    get:    ()  => Promise<AxiosResponse<ListAllResponse>>;
}

export interface ListAllResponse {
    data: Array<TimezoneObject>;
}

interface TimezoneObject {
    id:                 string;
    name:               string;
    name_for_humans:    string;
    offset_name:        string;
    offset:             number;
}
