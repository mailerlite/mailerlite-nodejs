import { AxiosResponse } from "axios";
import { EcommerceProductObject, EcommerceProductParams, NullableLinks, NullableMeta } from "../../utils/types.js";

export interface ProductsInterface {
    get:          (shop_id: string, params: GetProductsParams)                                  => Promise<AxiosResponse<ListProductsResponse>>;
    find:         (shop_id: string, product_id: string)                                         => Promise<AxiosResponse<SingleProductResponse>>;
    create:       (shop_id: string, requestBody: CreateUpdateProductParams)                     => Promise<AxiosResponse<SingleProductResponse, CreateUpdateProductParams>>;
    update:       (shop_id: string, product_id: string, requestBody: CreateUpdateProductParams) => Promise<AxiosResponse<SingleProductResponse, CreateUpdateProductParams>>;
    delete:       (shop_id: string, product_id: string)                                         => Promise<AxiosResponse<SingleProductResponse>>;
    changeStatus: (shop_id: string, product_id: string, requestBody: ChangeProductStatusParams) => Promise<AxiosResponse<SingleProductResponse, ChangeProductStatusParams>>;
}

export interface GetProductsParams {
    limit?: number;
    page?:  number;
    filter?: {
        name?:                      string;
        type?:                      'one-time' | 'subscription' | 'booking';
        enabled?:                   boolean;
        category?:                  string;
        exclude_from_automations?:  boolean;
    };
    sort?: 'id' | 'name' | 'created_at' | '-id' | '-name' | '-created_at';
}

export type CreateUpdateProductParams = EcommerceProductParams;

export interface ChangeProductStatusParams {
    status: boolean;
}

export interface ListProductsResponse {
    data:   Array<EcommerceProductObject>;
    links:  NullableLinks;
    meta:   NullableMeta;
}

export interface SingleProductResponse {
    data: EcommerceProductObject;
}
