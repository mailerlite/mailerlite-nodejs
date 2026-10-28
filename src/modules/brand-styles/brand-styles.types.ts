import { AxiosResponse } from "axios";

export interface BrandStylesInterface {
    get:    ()  => Promise<AxiosResponse<BrandStylesResponse>>;
}

export interface BrandStylesResponse {
    data: BrandStylesObject;
}

export interface BrandStylesObject {
    /** The account's own palette; null until at least one stored value differs from the defaults. */
    brand:      BrandStyleObject | null;
    /** What the editor uses when the account has none. */
    default:    BrandStyleObject;
    /** Built-in palettes, in editor order. The list grows. */
    presets:    Array<BrandStyleObject>;
}

export interface BrandStyleObject {
    /** Stable handle: "account", "default-brand", or "preset-<name>" e.g. "preset-business-casual". Match on this. */
    identifier:         string;
    /** Display label only — can change; do not match on it. */
    name:               string;
    font_family:        string;
    primary_color:      string;
    secondary_color:    string;
    heading_color:      string;
    text_color:         string;
    border_color:       string;
    background_color:   string;
}
