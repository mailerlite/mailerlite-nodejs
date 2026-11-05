import { AxiosResponse } from "axios";
import { EcommerceCartObject, Links, Meta } from "../../utils/types.js";

export interface CartsInterface {
    get:    (shop_id: string, params: GetCartsParams)                         => Promise<AxiosResponse<ListCartsResponse>>;
    find:   (shop_id: string, cart_id: string)                                => Promise<AxiosResponse<SingleCartResponse>>;
    update: (shop_id: string, cart_id: string, requestBody: UpdateCartParams) => Promise<AxiosResponse<SingleCartResponse, UpdateCartParams>>;
}

export interface GetCartsParams {
    limit?: number;
    page?:  number;
}

export interface UpdateCartParams {
    checkout_url?:          string;
    cart_total?:            number;
    ecommerce_customer_id?: string;
    resource_id?:           string;
}

export interface ListCartsResponse {
    data:   Array<EcommerceCartObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleCartResponse {
    data: EcommerceCartObject;
}
