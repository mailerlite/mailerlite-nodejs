import { AxiosResponse } from "axios";

export interface LanguagesInterface {
    get:    ()  => Promise<AxiosResponse<ListAllLanguagesResponse>>;
}

export interface ListAllLanguagesResponse {
    data: Array<LanguageObject>;
}

export interface LanguageObject {
    id:         string;
    shortcode:  string;
    iso639:     string;
    name:       string;
    direction:  string;
}
