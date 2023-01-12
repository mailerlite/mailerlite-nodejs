import { AxiosResponse } from "axios";

export interface LanguagesInterface {
    get:    ()  => Promise<AxiosResponse<ListAllResponse>>;
}

export interface ListAllResponse {
    data: Array<LanguageObject>;
}

interface LanguageObject {
    id:         string;
    shortcode:  string;
    iso639:     string;
    name:       string;
    direction:  string;
}
