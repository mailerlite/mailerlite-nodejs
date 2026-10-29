import { AxiosResponse } from "axios";
import { EcommerceCartItemObject, EcommerceCartItemParams, Links, Meta } from "../../utils/types.js";

export interface CartItemsInterface {
    get:    (shop_id: string, cart_id: string, params: GetCartItemsParams)                               => Promise<AxiosResponse<ListCartItemsResponse>>;
    find:   (shop_id: string, cart_id: string, item_id: string)                                          => Promise<AxiosResponse<SingleCartItemResponse>>;
    create: (shop_id: string, cart_id: string, requestBody: CreateUpdateCartItemParams)                  => Promise<AxiosResponse<SingleCartItemResponse, CreateUpdateCartItemParams>>;
    update: (shop_id: string, cart_id: string, item_id: string, requestBody: CreateUpdateCartItemParams) => Promise<AxiosResponse<SingleCartItemResponse, CreateUpdateCartItemParams>>;
    delete: (shop_id: string, cart_id: string, item_id: string)                                          => Promise<AxiosResponse<null>>;
}

export interface GetCartItemsParams {
    limit?: number;
    page?:  number;
}

export type CreateUpdateCartItemParams = EcommerceCartItemParams;

export interface ListCartItemsResponse {
    data:   Array<EcommerceCartItemObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleCartItemResponse {
    data: EcommerceCartItemObject;
}
