import { AxiosResponse } from "axios";
import { EcommerceStats, Links, Meta } from "../../utils/types.js";

export interface ShopsInterface {
    get:      (params: GetShopsParams)                         => Promise<AxiosResponse<ListShopsResponse>>;
    find:     (shop_id: string)                                => Promise<AxiosResponse<SingleShopResponse>>;
    create:   (requestBody: CreateShopParams)                  => Promise<AxiosResponse<SingleShopResponse, CreateShopParams>>;
    update:   (shop_id: string, requestBody: UpdateShopParams) => Promise<AxiosResponse<SingleShopResponse, UpdateShopParams>>;
    delete:   (shop_id: string)                                => Promise<AxiosResponse<null>>;
    getStats: (shop_id: string, params: GetShopStatsParams)    => Promise<AxiosResponse<ShopStatsResponse>>;
}

export interface GetShopsParams {
    limit?: number;
    page?:  number;
}

export interface GetShopStatsParams {
    start_date: string;
    end_date:   string;
}

export interface CreateShopParams {
    name:           string;
    url:            string;
    currency:       string;
    platform?:      string;
    group_id?:      string;
    enable_popups?: boolean;
    enabled?:       boolean;
    access_data?:   string;
}

export interface UpdateShopParams extends Partial<CreateShopParams> {}

export interface ListShopsResponse {
    data:   Array<ShopObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleShopResponse {
    data: ShopObject;
}

export interface ShopStatsResponse {
    data: {
        ecommerce:  EcommerceStats;
        series:     Array<Record<string, number | string>>;
    };
}

export interface ShopObject {
    id:                 string;
    name:               string;
    url:                string;
    currency:           string;
    currency_sign:      string;
    platform:           string;
    enabled:            boolean;
    enable_popups:      boolean;
    enable_resubscribe: boolean;
    group:              null | { id: string; name: string };
    created_at:         string;
    updated_at:         string;
}
