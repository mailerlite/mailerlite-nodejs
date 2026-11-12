import { AxiosResponse } from "axios";
import { EcommerceCustomerObject, EcommerceCustomerParams, NullableLinks, NullableMeta } from "../../utils/types.js";

export interface CustomersInterface {
    get:    (shop_id: string, params: GetCustomersParams)                                   => Promise<AxiosResponse<ListCustomersResponse>>;
    find:   (shop_id: string, customer_id: string)                                          => Promise<AxiosResponse<SingleCustomerResponse>>;
    create: (shop_id: string, requestBody: CreateUpdateCustomerParams)                      => Promise<AxiosResponse<SingleCustomerResponse, CreateUpdateCustomerParams>>;
    update: (shop_id: string, customer_id: string, requestBody: CreateUpdateCustomerParams) => Promise<AxiosResponse<SingleCustomerResponse, CreateUpdateCustomerParams>>;
    delete: (shop_id: string, customer_id: string)                                          => Promise<AxiosResponse<SingleCustomerResponse>>;
}

export interface GetCustomersParams {
    limit?: number;
    page?:  number;
    filter?: {
        email?: string;
    };
    sort?: 'id' | 'email' | 'created_at' | '-id' | '-email' | '-created_at';
}

export type CreateUpdateCustomerParams = EcommerceCustomerParams;

export interface ListCustomersResponse {
    data:   Array<EcommerceCustomerObject>;
    links:  NullableLinks;
    meta:   NullableMeta;
}

export interface SingleCustomerResponse {
    data: EcommerceCustomerObject;
}
