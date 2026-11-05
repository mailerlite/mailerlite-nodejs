import { AxiosResponse } from "axios";
import { EcommerceOrderObject, EcommerceOrderParams, Links, Meta } from "../../utils/types.js";

export interface OrdersInterface {
    get:    (shop_id: string, params: GetOrdersParams)                          => Promise<AxiosResponse<ListOrdersResponse>>;
    find:   (shop_id: string, order_id: string)                                 => Promise<AxiosResponse<SingleOrderResponse>>;
    create: (shop_id: string, requestBody: CreateOrderParams)                   => Promise<AxiosResponse<SingleOrderResponse, CreateOrderParams>>;
    update: (shop_id: string, order_id: string, requestBody: UpdateOrderParams) => Promise<AxiosResponse<SingleOrderResponse, UpdateOrderParams>>;
    delete: (shop_id: string, order_id: string)                                 => Promise<AxiosResponse<SingleOrderResponse>>;
}

export interface GetOrdersParams {
    limit?: number;
    page?:  number;
    filter?: {
        status?:        'pending' | 'complete';
        customer?:      string;
        attributed?:    boolean;
        email_id?:      string;
    };
    sort?: 'id' | 'created_at' | '-id' | '-created_at';
}

export type CreateOrderParams = EcommerceOrderParams;

export interface UpdateOrderParams {
    status?:                'pending' | 'complete';
    stage?:                 'cart' | 'checkout';
    total_price?:           number;
    without_automations?:   boolean;
}

export interface ListOrdersResponse {
    data:   Array<EcommerceOrderObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleOrderResponse {
    data: EcommerceOrderObject;
}
