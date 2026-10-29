import { AxiosResponse } from "axios";

export interface EcommerceSettingsInterface {
    get: () => Promise<AxiosResponse<EcommerceSettingsResponse>>;
}

export interface EcommerceSettingsResponse {
    data: {
        ecommerce_tracking_in_campaigns:    boolean;
        ecommerce_tracking_in_automations:  boolean;
        ecommerce_attribution_window:       number;
    };
}
